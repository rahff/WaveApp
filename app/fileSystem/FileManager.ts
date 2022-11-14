import * as fs from "fs";
import { resolve } from 'path';
import { Base64File } from "../../shared/Base64File";
import { IUser } from "../interfaces/IUser";
import { IContactItem } from "../interfaces/IContactItem";
import { generateKeyPairSync, KeyObject } from 'crypto';
import { FileModel, fileModel } from '../environment/environments';



export class FileManager {

    constructor(private fileModel: FileModel){}

    public async saveUserPhoto(_: any, file: Base64File): Promise<boolean> {
        try {
            const data = file.data.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(data, "base64");
            fs.writeFileSync(resolve(this.fileModel.userRendererDirectory, file.filename), buffer);
                return true;
            } catch (error: any) {
                return false;
            }
    }

    public async createUserInfos(_: any, user: IUser): Promise<boolean> {
        try {
            const dataUserPhoto: string = this.getBase64DataFromFile(this.fileModel.userRendererDirectory, "user.png");
            user.photo = dataUserPhoto;
            const userJson = JSON.stringify(user) + "\n********************\n";
            const pubKeyString: string = "PUBLIC KEY\n" + await this.generateKeyPair();
            const buffer = Buffer.from(userJson, "utf-8");
            const pubKeyBuffer = Buffer.from(pubKeyString, "utf-8");
            fs.writeFileSync(resolve(`${this.fileModel.userRendererDirectory}/user-info.txt`), buffer);
            fs.appendFileSync(resolve(`${this.fileModel.userRendererDirectory}/user-info.txt`), pubKeyBuffer);
            return true;
        } catch (error) {
            return false;
        }
    }

    private getBase64DataFromFile(baseDirectory: string, filename: string): string {
        const file = fs.readFileSync(resolve(baseDirectory, filename));
        return file.toString("base64");
    }

    private async generateKeyPair(): Promise<string> {
        try {
            const { publicKey, privateKey } = generateKeyPairSync("rsa", {modulusLength: 2048});
            await this.createPrivateKey(privateKey);
            return publicKey.export({format: "der", type: "pkcs1"}).toString('hex');
        } catch (error) {
            throw error;
        }
    }

    private async createPrivateKey(privateKey: KeyObject): Promise<void> {
        const buffer = privateKey.export({format: "der", type: "pkcs1"}).toString('hex');
        fs.writeFileSync(resolve(`${this.fileModel.userMainDirectory}/prv-key.pem`), buffer);
    }

    public async saveContactInfo(_: any, contactInfoFile: Base64File): Promise<IContactItem> {
        let stringData = this.getStringDataFromBase64File(contactInfoFile.data);
        const {contactJson, contactKey } = this.getPartsOfContactFile(stringData)
        this.writeContactImg(contactJson.photo, contactJson.id);
        return this.writeContactFile(contactJson, contactKey)
        
    }

    private writeContactFile(contact: IContactItem, pubKey: string): IContactItem {
        try {
            contact.photo = `${contact.id}.png`;
            const stringData = JSON.stringify(contact) + "\n********************\n"+pubKey;
            const data = Buffer.from(stringData, "utf-8")
            fs.writeFileSync(resolve(this.fileModel.contactsMainDirectory, contact.username+".txt"), data)
            return contact;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private getStringDataFromBase64File(data: string): string {
        const sanitizedData = data.replace(/^data:text\/\w+;base64,/, "");
        const buffer: Buffer = Buffer.from(sanitizedData, "base64");
        const strData = buffer.toString("utf-8");
        
        return strData;
    }

    private writeContactImg(base64Data: string, filename: string): void {
        try {
            const sanitizedData = base64Data.replace(/^data:text\/\w+;base64,/, "");
            const imgContactBuffer = Buffer.from(sanitizedData, "base64")
            fs.writeFileSync(resolve(this.fileModel.contactsImgDirectory, filename+".png"), imgContactBuffer);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private getPartsOfContactFile(data: string): {contactJson: IContactItem, contactKey: string} {
        try {
            const contactJson = JSON.parse(data.split("\n********************")[0].trim());
            const contactKey = data.split("\n********************")[1];
            return {contactJson, contactKey};
        } catch (error: any) {
            throw new Error("eee"+ error.message);
        }
    }
    
}

export const fileManager = new FileManager(fileModel);