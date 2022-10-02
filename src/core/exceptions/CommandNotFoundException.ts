export class CommandNotFoundException extends Error {
    constructor(){
        super("Command not found")
    }
}