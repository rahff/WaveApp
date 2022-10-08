import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => uuidv4();
export const generateEmail = (): string => "test"+ uuidv4() + "@gmail.com";
const randomNumber = (): string =>{ 
    const rand = Math.floor(Math.random() * 99);
     if(rand < 10) return "0"+rand.toString();
     return rand.toString()
 };
export const generateTel = (): string => {
    let numero = "07";
    for (let i = 0; i < 4; i++) {
        numero += randomNumber().toString();
    }
    return numero;
}