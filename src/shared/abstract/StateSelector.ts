import { BehaviorSubject, map, Observable } from "rxjs";
import { StateContainer } from "src/core/containers/StateContainer";
import { BaseState } from "src/core/interfaces/states/BaseState";



export abstract class StateSelector {
    id!: string;
    protected state$!: BehaviorSubject<any>

    constructor(protected stateContainer: StateContainer){
        this.stateContainer.attach(this);
    }

    public update(): void {
        this.state$.next(this.stateContainer.getState());
    }

    public getOnException(): Observable<{message: string} | null> {
        return this.state$.asObservable()
        .pipe(map((state: BaseState) => state.onException))
      }

}