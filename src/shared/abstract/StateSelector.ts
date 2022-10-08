import { BehaviorSubject, map, Observable } from "rxjs";
import { BaseState } from "src/core/interfaces/states/BaseState";



export abstract class StateSelector {

    protected state$!: BehaviorSubject<any>

    constructor(){
        
    }

    public update(state: BaseState): void {
        this.state$.next(state);
    }

    public getException(): Observable<{message: string} | null> {
        return this.state$.asObservable()
        .pipe(map((state: BaseState) => state.onException))
      }

}