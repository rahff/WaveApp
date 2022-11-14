import { _Event } from "../../../shared/actions/Action";



export class SetPhotoSavedEvent extends _Event {
    constructor(payload: boolean){
        super('photoSavedEvent', payload);
    }
}