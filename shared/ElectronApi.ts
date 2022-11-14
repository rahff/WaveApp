

export interface FileSystemBridge {

    dispatch: (commandName: string, payload: any)=> Promise<any>
    
}

export interface ElectronApi {
    fileSystemBridge: FileSystemBridge
}
