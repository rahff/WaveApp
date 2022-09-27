export class User {

    constructor(private name: string, private firstname: string, private email: string){}

    getName(): string {
        return this.name;
    }
    
}