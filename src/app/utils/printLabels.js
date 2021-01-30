import xlsx from 'node-xlsx';
import ElectronService from '../core/electron.service';

const createOutput = ({posHash, priceListHash}) => {

    const data = [];
    const errorData = [];
    data.push(['ASIN','Product Name', 'Full Title', 'Title', 'Unit', 'MRP']);
    Object.keys(posHash).map((asin)=>{
        const poRow = posHash[asin];
        const priceListRow = priceListHash[asin];
        for (let i = 0; i < poRow.OPCASE; i++){
            try{
                const splitArray = poRow.TITLE.split(',');
                const unit = splitArray.length > 1 ? splitArray.pop() : '1 piece';
                data.push([
                    asin, 
                    priceListHash[asin].PRDNAME, 
                    poRow.TITLE, 
                    splitArray.join(','), 
                    unit, 
                    priceListHash[asin].COSTPRICE
                ]);
            } catch (e) {
                errorData.push({
                    poProductRow:posHash[asin], 
                    message: e.message
                });
            }
        }
    })
    return {data, errorData};
}

const printLabels = ({posHash, priceListHash, outputPath}) => {

    const fs = ElectronService.fs;
    let path = require('path');
   
    const outPut = createOutput({posHash, priceListHash});
    var buffer = xlsx.build([{ name: "sheet1", data: outPut.data }]);

    const outputFile = path.join(
        path.dirname(outputPath),
        `Print-Labels-${new Date().toISOString().replace(/\T.+/, '')}.xlsx`);

    fs.writeFile(outputFile, buffer,{}, ()=>{
        const win = ElectronService.mainWindow.webContents;
        win.send('main-message', {
            type: 'COMPLETED',
            payload: outPut,
          });
    } )

}

export default printLabels;