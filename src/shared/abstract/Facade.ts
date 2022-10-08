import { Observable } from "rxjs";
import { UserDispatcherService } from "src/infra/services/user/user-dispatcher.service";
import { UserSelectorService } from "src/infra/services/user/user-selector.service";
import { Command } from "../command/Command";
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


