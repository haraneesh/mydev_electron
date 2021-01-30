const fs = require("fs");
import ElectronService from '../../src/app/core/electron.service';
import { processFiles } from '../app/utils/processFiles';

export default {
    createNewFile (content) {
       const dialog = ElectronService.dialog;
        dialog
          .showSaveDialog(ElectronService.mainWindow, {
            title: "Create New File",
            properties: ["showOverwriteConfirmation"],
            filters: [
              {
                name: "CSV Files",
                extensions: ["csv"],
              },
            ],
          })
          .then(({ canceled, filePath }) => {
            if (canceled) return;
      
            fs.writeFile(filePath, content, err => {
              if (err) return;
            });
          });
      },
      openFile(d) {
        const dialog = ElectronService.dialog;
        const file = dialog.showOpenDialogSync(ElectronService.mainWindow, {
          properties: ["openFile"],
          filters: [{ name: "Excel Files", extensions: ["xlsx", "xls"] }],
        });
      
        if (file) {
           /*
          fs.readFile(file[0], "utf8", (err, data) => {
            if (err) return; 
          */

           processFiles(file[0]);
            /*
            ElectronService.mainWindow.webContents.send("fileopened", {
              path: file[0],
            }); */
          }
      },
      getFile(){
        const dialog = ElectronService.dialog;
        const file = dialog.showOpenDialogSync(ElectronService.mainWindow, {
          properties: ["openFile"],
          filters: [{ name: "Excel Files", extensions: ["xlsx", "xls"] }],
        });
      
        if (file && file.length > 0) {
           return file[0];
          }
      }
}