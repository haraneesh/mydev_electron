
import xlsx from 'node-xlsx';
import ElectronService from '../../../src/app/core/electron.service';

const path = ElectronService.path;
const fs = ElectronService.fs;


  const PRICELISTNAMES = {
    PRDNAME:"Product Name",
    PRICEKG:"Price per KG",
    ASIN:"ASIN",
    TITLE:"TITLE",
    COSTPRICE:"Cost Price",
  }
  
  const getPriceListColumnNumbers = (titleRow) => {
  
    let priceListColPositions = {};

    const tRow = titleRow.map(s => s.trim());
    
    priceListColPositions[PRICELISTNAMES.PRDNAME] = tRow.indexOf(PRICELISTNAMES.PRDNAME);
    priceListColPositions[PRICELISTNAMES.PRICEKG] = tRow.indexOf(PRICELISTNAMES.PRICEKG);
    priceListColPositions[PRICELISTNAMES.ASIN] = tRow.indexOf(PRICELISTNAMES.ASIN);
    priceListColPositions[PRICELISTNAMES.TITLE] = tRow.indexOf(PRICELISTNAMES.TITLE);
    priceListColPositions[PRICELISTNAMES.COSTPRICE] = tRow.indexOf(PRICELISTNAMES.COSTPRICE);
  
    return priceListColPositions;
  
  }

  const processProductListRow = ({row, priceList, priceListColPositions}) => {

    const rowObj = {
        PRDNAME: row[priceListColPositions[PRICELISTNAMES.PRDNAME]],
        PRICEKG: row[priceListColPositions[PRICELISTNAMES.PRICEKG]],
        ASIN: row[priceListColPositions[PRICELISTNAMES.ASIN]],
        TITLE: row[priceListColPositions[PRICELISTNAMES.TITLE]],
        COSTPRICE: row[priceListColPositions[PRICELISTNAMES.COSTPRICE]],
    }
    
    priceList[rowObj.ASIN] = rowObj;
     return priceList; 
    
    };

const processProductListItems = (rowItems) => {
  
  const itemsLength = rowItems.length;
  let priceList = [];
  const priceListColPositions = getPriceListColumnNumbers(rowItems[1]);


  for (let i = 2; i < itemsLength; i++) {
    priceList = processProductListRow({row: rowItems[i], priceList, priceListColPositions });
  }

  return priceList;
}

export default processProductListItems;
