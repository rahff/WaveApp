import { IContactItem } from "src/infra/models/IContactIem";



export class ContactItem {

    constructor(private name: string, private email: string, private tel: string | null, private id: string){
        this.checkEmailValidity(this.email);
        if(this.tel) this.checkTelvalidity(this.tel);
    }

    private checkEmailValidity(email: string): void {
        const isValid = !!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if(!isValid) throw new Error("invalid email");
    }

    private checkTelvalidity(tel: string): void {
        const isValid = !!tel.match(/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/);
        if(!isValid) throw new Error("invalid tel");
    }


    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTel(): string | null{
        return this.tel;
    }

    public asDto(): IContactItem {
        return {
            name: this.name,
            email: this.email,
            tel: this.tel,
            id: this.id
        }
    }
}