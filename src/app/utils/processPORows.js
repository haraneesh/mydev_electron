import ElectronService from '../../../src/app/core/electron.service';

const PRODUCTCOLNAMES = {
  ASIN:"ASIN",
  PO:"PO",
  TITLE:"Title",
  OPCASE:"OP CASE",
}

const getProductColPositions = (titleRow) => {

  let productColPositions = {};

  const tRow = titleRow.map(s => s.trim())

  productColPositions[PRODUCTCOLNAMES.ASIN] = tRow.indexOf(PRODUCTCOLNAMES.ASIN);
  productColPositions[PRODUCTCOLNAMES.PO] = tRow.indexOf(PRODUCTCOLNAMES.PO);
  productColPositions[PRODUCTCOLNAMES.TITLE] = tRow.indexOf(PRODUCTCOLNAMES.TITLE);
  productColPositions[PRODUCTCOLNAMES.OPCASE] = tRow.indexOf(PRODUCTCOLNAMES.OPCASE);

  return productColPositions;

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
    
}

const processPOs = (rowItems) => {
  
  const itemsLength = rowItems.length;
  const productColPositions = getProductColPositions(rowItems[0]);
  let poReport = [];


  for (let i = 1; i < itemsLength; i++) {
    poReport = processPORow({row: rowItems[i], poReport, productColPositions });
  }
 return poReport;
}

export default processPOs;