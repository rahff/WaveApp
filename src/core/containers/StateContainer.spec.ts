import { UserFakeRepository } from "src/infra/mocks/UserFakeRepository";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { UserEffect } from "../effects/UserEffect";
import { StateContainer } from "./StateContainer"
import { UserStateContainer } from "./UserStateContainer";



class FakeSlector extends StateSelector {

    constructor(stateContainer: StateContainer){
        super(stateContainer)
        this.id = "FakeSlector";
    }
}

describe("StateContainer", ()=> {
    let stateContainer: StateContainer;
    let selector: FakeSlector;

    beforeEach(()=>{
        stateContainer = new UserStateContainer(new UserEffect(new UserFakeRepository()));
        selector = new FakeSlector(stateContainer);
        stateContainer.attach(selector);
    })

    it('should attach selector only once', ()=> {
        stateContainer.attach(selector);
        stateContainer.attach(selector);
        expect(stateContainer.getSelectors().length).toBe(1);
    })

    it("should detach a selector", ()=>{
        stateContainer.detach(selector);
        expect(stateContainer.getSelectors().length).toBe(0);
    })
})