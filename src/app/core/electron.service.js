export default class ElectronService {
  

    static ipcRenderer = window.require("electron").ipcRenderer;
    static remote = window.require("electron").remote;
    static shell = window.require("electron").shell;
    static clipboard = window.require("electron").clipboard;
    static dialog = window.require("electron").remote.dialog;
    static mainWindow = window.require('electron').remote.BrowserWindow.getAllWindows()[0];
  
        /*this.settings = window
          .require("electron")
          .remote.require("electron-settings"); */
  
    static fs = window.require("fs");
    static path = window.require("path");
    static os = window.require("os");

    static isElectron() {
      return !!(window && window.process && window.process.type);
    }
  
    static showNotification(message) {
      if (this.settings.get("app.notification") && !this.mainWindow.isFocused()) {
        const Notification = this.remote.Notification;
        const notification = new Notification(message);
        notification.show();
      }
    }
  }
  