export interface FileSystemAdapter {
    saveFile: (payload: {filename: string, content: string}) => void;
}

export interface ElectronApi {
    fileSystemBridge: FileSystemAdapter
}
