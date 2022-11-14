import { FileManager } from '../fileSystem/FileManager';
import { SaveUserPhotoCommand } from '../../src/infra/commands/user/SaveUserPhotoCommand';
import { Base64File } from '../../shared/Base64File';
import { fakeUser } from '../interfaces/IUser';
import { getDataImg, isFileExist, isPublicKey, fakeContact } from './utils/fileSystem.test.utils';
import { fileModel } from '../environment/environments';

const pathToFileRefs = "./fakeData/ref";


describe('FileManager', ()=> {
    const fileManagerTest = new FileManager(fileModel);

    describe("Save user photo while registration", ()=> {
        let imgData: string;
        let imagetTest: Base64File;
        let comand: SaveUserPhotoCommand;
        beforeEach(()=>{
            imgData = getDataImg('tester.png', "base64", pathToFileRefs);
            imagetTest = {filename: "user.png", data: imgData};
            comand = new SaveUserPhotoCommand(imagetTest);
        })
        it('should create a user.png file', async ()=>{
            console.log('\nshould create a user.png file\n');
            await fileManagerTest.saveUserPhoto(null, comand.getPayload());
            const isExist = isFileExist('user.png', fileModel.userRendererDirectory);
            expect(isExist).toBeTrue();
        })
        it('should write binary data of user photo in his file', async ()=>{
            console.log('\nshould write binary data of user photo in his file\n');
            const result = await fileManagerTest.saveUserPhoto(null, comand.getPayload());
            const savedImg = getDataImg("user.png", "base64", fileModel.userRendererDirectory);
            expect(result).toBeTrue();
            expect(savedImg.slice(-20)).toEqual(imgData.slice(-20));
        })
    })

    describe('User info file registration', ()=>{

        it('should create a file user-infos.txt which also contains his pub key', async ()=>{
            console.log('\nshould create a file user-infos.txt which also contains his pub key\n');
            const result = await fileManagerTest.createUserInfos(null, fakeUser);
            expect(result).toBeTrue();
    
            const isExist = isFileExist(`user-info.txt`, fileModel.userRendererDirectory);
            expect(isExist).toBeTrue();
    
            const userJsonPart = getDataImg("user-info.txt", "utf-8", fileModel.userRendererDirectory).split("\n********************")[0];
            expect(JSON.parse(userJsonPart)).toEqual(fakeUser);
    
            const pubKeyPart = getDataImg("user-info.txt", "utf-8", fileModel.userRendererDirectory).split("\n********************")[1];
            const isPubKey = isPublicKey(pubKeyPart);
            expect(isPubKey).toBeTrue();   
        });

        it('should create a file for private key', async ()=>{
            console.log('\nshould create a file for private key\n');
            await fileManagerTest.createUserInfos(null, fakeUser);
            const isExist = isFileExist('prv-key.pem', fileModel.userMainDirectory);
            expect(isExist).toBeTrue();
        });
    })

    describe('Contact-infos file registration', ()=> {

        const base64Data = getDataImg("tester.txt", "base64", pathToFileRefs);
        const imgRef: string = getDataImg('tester.png', "base64", pathToFileRefs);
        
        it('should create a contact-info file', async ()=>{
            console.log('\nshould create a contact-info file\n');
            await fileManagerTest.saveContactInfo(null, {filename: "tester.txt", data: base64Data});
            const isCreated = isFileExist("tester.txt", fileModel.contactsMainDirectory);
            expect(isCreated).toBeTrue();
        })
        it('should write data in file', async ()=> {
            console.log('\nshould write data in file\n');
            await fileManagerTest.saveContactInfo(null, {filename: "tester.txt", data: base64Data});
            const userJsonPart = getDataImg("tester.txt", "utf-8", fileModel.contactsMainDirectory).split("\n********************")[0];
        
            expect(userJsonPart).toEqual(JSON.stringify(fakeContact));
            const pubKeyPart = getDataImg("tester.txt", "utf-8", fileModel.contactsMainDirectory).split("\n********************")[1];
            expect(isPublicKey(pubKeyPart)).toBeTrue();
        })
        it('should create a png file in renderer contact directory', async ()=> {
            console.log('\nshould create a png file in renderer contact directory\n');
            await fileManagerTest.saveContactInfo(null, {filename: "tester.txt", data: base64Data});
            const isCreated = isFileExist("tester.png", fileModel.contactsImgDirectory);
            expect(isCreated).toBeTrue();
        })
        it('should write image in contact img file', async ()=> {
            console.log('\nshould write image in contact img file\n');
            const addedContact = await fileManagerTest.saveContactInfo(null, {filename: "tester.txt", data: base64Data});
            const imgData: string = getDataImg('tester.png', "base64", fileModel.contactsImgDirectory);
           
            expect(imgData.slice(-20)).toEqual(imgRef.slice(-20));
            expect(addedContact).toEqual(fakeContact);
        })
    })
})