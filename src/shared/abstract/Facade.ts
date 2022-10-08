import { Observable } from "rxjs";
import { Command } from "../actions/Action";
import { Dispatcher } from "./Dispatcher";
import { StateSelector } from "./StateSelector";



export abstract class Facade<T extends StateSelector> {

    constructor(protected dispatcher: Dispatcher<T>){}

    public dispatch(command: Command): void {
        this.dispatcher.dispatch(command)
    }

    public getException(): Observable<{message: string} | null> {
        return this.dispatcher.stateSelector.getException();
    }
} 


