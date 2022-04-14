import { app,ipcMain } from 'electron'
import { DB } from './db'

export function getDataPath(){
    return app.getPath('userData')
}
ipcMain.handle("getDataPath", (event) => {
    return getDataPath();
});

export function initExtra(){
    const storePath = getDataPath();
    DB.initDB(storePath);
}