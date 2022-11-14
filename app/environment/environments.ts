class Environment {
    constructor(private mode: "TEST" | "PRODUCTION" | "DEVELOPMENT"){}

    public getFileModel(): FileModel {
        switch (this.mode) {            
            case "TEST":
                return {
                    userRendererDirectory: "./fakeData/assets/user",
                    userMainDirectory: "./fakeData/.user",
                    contactsImgDirectory: "./fakeData/assets/contacts",
                    contactsMainDirectory: "./fakeData/.contacts"
                };
            case "PRODUCTION":
                return {
                    userRendererDirectory: "",
                    userMainDirectory: "",
                    contactsImgDirectory: "",
                    contactsMainDirectory: ""
                };
        
            default: 
            return {
                userRendererDirectory: "./src/assets/user",
                userMainDirectory: "./app/.user",
                contactsImgDirectory: "./src/assets/contacts",
                contactsMainDirectory: "./app/.contacts"
            };
        }
    }
}

export interface FileModel {
    userRendererDirectory: string;
    userMainDirectory: string;
    contactsMainDirectory: string;
    contactsImgDirectory: string;
}

enum MODE {
    "PRODUCTION",
    "DEVELOPMENT",
    "TEST"
}

const mode: any = process.env.NODE_ENV

export const fileModel = new Environment(mode).getFileModel();



