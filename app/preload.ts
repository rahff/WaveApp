import {contextBridge, ipcRenderer } from "electron";



contextBridge.exposeInMainWorld("electronApi", {
    fileSystemBridge: {
        dispatch: (commandName: string, payload: any) => {
            return ipcRenderer.invoke(commandName, payload);
        }
    }
})