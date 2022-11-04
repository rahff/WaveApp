import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facade } from "../../../shared/abstract/Facade";
import { UserModule } from "../../modules/user.module";

import { UserDispatcherService } from "./user-dispatcher.service";
import { UserSelectorService } from "./user-selector.service";



@Injectable({
    providedIn: UserModule
})
export class UserFacade extends Facade<UserSelectorService> {
    
    constructor(dispatcher: UserDispatcherService){
        super(dispatcher);
    }

    public getUser() {
        return this.dispatcher.stateSelector.getUser();
    }

    public getIsAuth(): Observable<boolean | undefined> {
        return this.dispatcher.stateSelector.getIsAuth();
    }

    public getIsNewUser(): Observable<boolean | null> {
        return this.dispatcher.stateSelector.getIsNewUser();
    }

}