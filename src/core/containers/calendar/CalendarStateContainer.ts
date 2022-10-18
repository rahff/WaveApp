import { CalendarState } from "src/core/interfaces/states/CalendarState";
import { calendarStateMapper } from "src/core/mappers/states/CalendarStateMapper";
import { EffectCreator } from "src/core/ports/driver/EffectCreator";
import { CalendarStateReducer } from "src/core/reducers/CalendarStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { StateContainer } from "../stateContainer/StateContainer";


export class CalendarStateContainer extends StateContainer {

    protected override state: CalendarState = { events: [], onException: null, onSuccessSave: false };
    protected override reducer: CalendarStateReducer = new CalendarStateReducer();
    constructor(effect: EffectCreator, selector: StateSelector) {
        super(effect, selector);
        this.notify()
    }

    public override getState(): CalendarState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(calendarStateMapper(this.state));
    }
}