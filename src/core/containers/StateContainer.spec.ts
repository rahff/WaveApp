import { BehaviorSubject } from "rxjs";
import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { UserEffect } from "../effects/UserEffect";
import { BaseState } from "../interfaces/states/BaseState";
import { UserStateContainer } from "./UserStateContainer";



class FakeSlector extends StateSelector {

    protected override state$ = new BehaviorSubject<BaseState>({onException: null});
    constructor(){
        super();
    }
}

describe("StateContainer", ()=> {
    let stateContainer: UserStateContainer;
    let selector: FakeSlector;

    beforeEach(()=>{
        selector = new FakeSlector();
        stateContainer = new UserStateContainer(new UserEffect(new UserFakeRepository()), selector);
    })

    it('should have state selector', ()=> {
        expect(stateContainer.getSelector()).toBeInstanceOf(StateSelector)
    })

})