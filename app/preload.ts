import {contextBridge, ipcRenderer } from "electron";
import { Command } from "../src/shared/actions/Action";


contextBridge.exposeInMainWorld("electronApi", {
    fileSystemBridge: {
        dispatch: (command: Command) => ipcRenderer.invoke(command.getName(), command.getPayload())
    }
})