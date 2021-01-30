
import xlsx from 'node-xlsx';
import processPOs from './processPORows';
import processProductListItems from './productListItems';
import printLabels from './printLabels.js';
import ElectronService from '../core/electron.service';

const fs = ElectronService.fs;

const getExcelDataRows = (file) => {
  const workSheetsFromFile = xlsx.parse(ElectronService.fs.readFileSync(file));
  const dataRows = workSheetsFromFile.flatMap(page => page.data).filter(item => item.length);
  return dataRows;
}

export const processFiles = ({posFilePath, priceListFilePath}) => {

  
  const win = ElectronService.mainWindow.webContents;

  const poDataRows = getExcelDataRows(posFilePath);
  const priceListDataRows = getExcelDataRows(priceListFilePath);

  if (priceListDataRows.length > 0 && priceListDataRows.length > 0) {
    win.send('main-message', {
      type: 'process-started',
      data: 'Started'
    });

   const posHash = processPOs(poDataRows);
   const priceListHash = processProductListItems(priceListDataRows);

   printLabels({
     posHash,
     priceListHash,
     outputPath: posFilePath,
   });

  } else {
    win.send('main-message', {
      type: 'file-error',
      data: 'No item to process'
    });
  }

};