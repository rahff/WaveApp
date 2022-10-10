import { BehaviorSubject, map, Observable } from "rxjs";
import { IBaseState } from "./IBaseState";



export abstract class StateSelector {

    protected state$!: BehaviorSubject<any>

    constructor(){
        
    }

    public update(state: IBaseState): void {
        this.state$.next(state);
    }

    public getException(): Observable<{message: string} | null> {
        return this.state$.asObservable()
        .pipe(map((state: IBaseState) => state.onException))
      }

}