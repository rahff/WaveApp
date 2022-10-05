import { EffectCreator } from "../interfaces/EffectCreator";
import { CalendarState } from "../interfaces/states/CalendarState";
import { StateContainer } from "./StateContainer";
import { CalendarStateReducer } from "../reducers/CalendarStateReducer";

export class CalendarStateContainer extends StateContainer {

    protected override state: CalendarState = { events: [], onException: null };
    protected override reducer: CalendarStateReducer = new CalendarStateReducer();
    constructor(effect: EffectCreator) {
        super(effect);
    }

    public override getState(): CalendarState {
        return this.state;
    }
}