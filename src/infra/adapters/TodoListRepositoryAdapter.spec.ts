import { TestBed } from "@angular/core/testing";
import { TodoItem } from "src/core/entities/TodoItem";
import { DatabaseModule } from "../modules/database.module";
import { generateId } from "../utils/generateId";
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
        const generatedId = generateId();
        const savedItem = await saveItem(generatedId)
        expect(savedItem.id).toEqual(generatedId);
    });
    
    it('should get item list', async ()=>{
        const generatedId = generateId();  
        const savedItem = await saveItem(generatedId);
        const itemList = await repository.getTodoList();
        expect(itemList).toContain(savedItem);
    });

    it('should delete an item', async ()=> {
        const generatedId = generateId();  
        const savedItem = await saveItem(generatedId);
        const deletedId = await repository.deleteItem(savedItem.id);
        expect(deletedId).toEqual(savedItem.id);
    });

    it('should modify an item', async ()=> {
        const generatedId = generateId();  
        const savedItem = await saveItem(generatedId);
        const modifiedItem = await repository.modifyTodoItem({id: generatedId, description: 'tester le test', status: true});
        expect(modifiedItem.id).toEqual(savedItem.id);
        expect(modifiedItem.status).toBeTrue();
    })

    it('should verify existance of item by description', async ()=> {
        const generatedId = generateId();  
        const savedItem = await saveItem(generatedId);
        const isExist = await repository.isTodoAlreadyExistByDescription(savedItem.description);
        expect(isExist).toBeTrue();
        const isNotExist = await repository.isTodoAlreadyExistByDescription("notExistingItemDescription");
        expect(isNotExist).toBeFalse();
    });

    it('should verify existance of item by id', async ()=> {
        const generatedId = generateId();  
        const savedItem = await saveItem(generatedId);
        const isExist = await repository.isTodoAlreadyExistById(savedItem.id);
        expect(isExist).toBeTrue();
        const isNotExist = await repository.isTodoAlreadyExistById("notExistingItemId");
        expect(isNotExist).toBeFalse();
    })

    const saveItem = async (generatedId: string): Promise<TodoItem> => {
        const todoItem: TodoItem = { description: "test", id: generatedId, status: false};
        return await repository.saveItem(todoItem);
    }
})
