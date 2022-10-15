import { EffectCreator } from "../ports/driver/EffectCreator";
import { CalendarState } from "../interfaces/states/CalendarState";
import { StateContainer } from "./StateContainer";
import { CalendarStateReducer } from "../reducers/CalendarStateReducer";
import { StateSelector } from "src/shared/abstract/StateSelector";
import { calendarStateMapper } from "../mappers/states/CalendarStateMapper";

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