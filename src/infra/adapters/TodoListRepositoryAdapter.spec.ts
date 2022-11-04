import { TestBed } from "@angular/core/testing";
import { ITodoItem } from "../models/ITodoItem";
import { DatabaseModule } from "../modules/database.module";
import { TodoListRepositoryAdapter } from "./TodoListRepositoryAdapter";


describe('TodoListRepositoryAdapter', ()=>{
    let repository: TodoListRepositoryAdapter;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                DatabaseModule
            ]
        })
        repository = TestBed.inject(TodoListRepositoryAdapter);
    })

    it('should be created', ()=>{
        expect(repository).toBeTruthy();
    })

    it('should save an new todo item', async ()=>{
        const savedItem = await saveItem()
        expect(savedItem.id).toEqual(savedItem.id);
    });
    
    it('should get item list', async ()=>{
        const savedItem = await saveItem();
        const itemList = await repository.getTodoList();
        expect(itemList).toContain(savedItem);
    });

    it('should delete an item', async ()=> { 
        const savedItem = await saveItem();
        const deletedId = await repository.deleteItem(savedItem.id);
        expect(deletedId).toEqual(savedItem.id);
    });

    it('should modify an item', async ()=> {
        const savedItem = await saveItem();
        const modifiedItem = await repository.modifyTodoItem({id: savedItem.id, description: 'tester le test', status: true});
        expect(modifiedItem.id).toEqual(savedItem.id);
        expect(modifiedItem.status).toBeTrue();
    })

    it('should verify existance of item by description', async ()=> {
        const savedItem = await saveItem();
        const isExist = await repository.isTodoAlreadyExistByDescription(savedItem.description);
        expect(isExist).toBeTrue();
        const isNotExist = await repository.isTodoAlreadyExistByDescription("notExistingItemDescription");
        expect(isNotExist).toBeFalse();
    });

    it('should verify existance of item by id', async ()=> {  
        const savedItem = await saveItem();
        const isExist = await repository.isTodoAlreadyExistById(savedItem.id);
        expect(isExist).toBeTrue();
        const isNotExist = await repository.isTodoAlreadyExistById("notExistingItemId");
        expect(isNotExist).toBeFalse();
    })

    const saveItem = async (): Promise<ITodoItem> => {
        const todoItem: ITodoItem = { description: "test", id: "", status: false};
        return await repository.saveItem(todoItem);
    }
})
