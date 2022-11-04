
import { StateSelector } from "../../../shared/abstract/StateSelector";
import { CalendarState } from "../../interfaces/states/CalendarState";
import { calendarStateMapper } from "../../mappers/states/CalendarStateMapper";
import { EffectCreator } from "../../ports/driver/EffectCreator";
import { CalendarStateReducer } from "../../reducers/CalendarStateReducer";
import { StateContainer } from "../stateContainer/StateContainer";


export class CalendarStateContainer extends StateContainer {

    protected override state: CalendarState = { events: [], onException: null, onSuccessSave: false };
    protected override reducer: CalendarStateReducer = new CalendarStateReducer();
    constructor(effect: EffectCreator, selector: StateSelector) {
        super(effect, selector);
    }

    public override getState(): CalendarState {
        return this.state;
    }

    protected notify(): void {
        this.selector.update(calendarStateMapper(this.state));
    }
}