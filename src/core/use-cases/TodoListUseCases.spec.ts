import { TodoListFakeRepository } from "src/infra/mocks/TodoListFakeRepository";
import { TodoListUseCases } from "./TodoListUseCases"


export const item1 = {
    id: "632",
    description: "test1",
    status: false
}

describe('TodoListUseCases', ()=> {
    let policies: TodoListUseCases;

    beforeEach(()=>{
        policies = new TodoListUseCases(new TodoListFakeRepository());
    })

    it('should verify that no description duplication', async ()=> {
        const commandResult = await policies.applySaveItem(item1);
        expect(commandResult.getPayload()).toEqual("this.todo already exist")
    });

    it('should verify that item does exist before try to delete it', async ()=> {
        const commandResult = await policies.applyDeleteItem("noExistingId");
        expect(commandResult.getPayload()).toEqual("this todo does not exist")
    })

    it('should verify that payload have an id before try to modify it and check if it exist in this case', async ()=> {
        const commandResult = await policies.applyModifyTodoItem({...item1, id: "", description: "other description"});
        expect(commandResult.getPayload()).toEqual("cannot modify without identifier");
        const commandResult2 = await policies.applyModifyTodoItem({...item1, id: "noExistingId", description: "other description"});
        expect(commandResult2.getPayload()).toEqual("this todo does not exist");
    })
})