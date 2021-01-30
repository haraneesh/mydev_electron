import xlsx from 'node-xlsx';
import ElectronService from '../../../src/app/core/electron.service';

let poReport = [];

const path = ElectronService.path;
const fs = ElectronService.fs;

const PRODUCTCOLNAMES = {
  ASIN:"ASIN",
  PO:"PO",
  TITLE:"Title",
  OPCASE:"OP CASE",
}

const processPORow = ({row, poReport, productColPositions}) => {

const rowObj = {
  ASIN: row[productColPositions[PRODUCTCOLNAMES.ASIN]],
  PO: row[productColPositions[PRODUCTCOLNAMES.PO]],
  TITLE: row[productColPositions[PRODUCTCOLNAMES.TITLE]],
  OPCASE: row[productColPositions[PRODUCTCOLNAMES.OPCASE]],
}

 poReport[rowObj.ASIN] = rowObj;
 return poReport; 

};


const getProductColPositions = (titleRow) => {

  let productColPositions = {
    ASIN:-1,
    PO:-1,
    TITLE:-1,
    OPCASE:-1,
  }

  productColPositions[PRODUCTCOLNAMES.ASIN] = titleRow.indexOf(PRODUCTCOLNAMES.ASIN);
  productColPositions[PRODUCTCOLNAMES.PO] = titleRow.indexOf(PRODUCTCOLNAMES.PO);
  productColPositions[PRODUCTCOLNAMES.TITLE] = titleRow.indexOf(PRODUCTCOLNAMES.TITLE);
  productColPositions[PRODUCTCOLNAMES.OPCASE] = titleRow.indexOf(PRODUCTCOLNAMES.OPCASE);

  return productColPositions;

}

const processPOs = (rowItems, outputPath) => {
  
  const itemsLength = rowItems.length;
  const win = ElectronService.mainWindow.webContents;
  const productColPositions = getProductColPositions(rowItems[0]);


  for (let i = 1; i < itemsLength; i++) {
    poReport = processPORow({row: rowItems[i], poReport, productColPositions });

      try{
        win.send('main-message', {
          type: 'progress',
          data: i,
          });
      }catch(err) {
          erroneousItems.push(err.itemInfo);

          ElectronService.mainWebWindow.send('main-message', {
            type: 'process-error',
            data: err
          });
    }
  }
 return processPOs;
}