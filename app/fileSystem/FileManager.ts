import { FileSystemAdapter } from "../../shared/ElectronApi";
import * as fs from "fs";

class FileManager implements FileSystemAdapter {

    public saveFile(payload: { filename: string, content: string }){
        fs.writeFileSync(payload.filename, payload.content);
        console.log("file saved", payload.filename);
        
    };
}

export const fileManager = new FileManager();