import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModule } from "src/infra/modules/user.module";
import { Facade } from "src/shared/abstract/Facade";
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

    public getIsAuth(): Observable<boolean> {
        return this.dispatcher.stateSelector.getIsAuth();
    }

}