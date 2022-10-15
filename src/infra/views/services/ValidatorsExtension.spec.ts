import { FormControl } from "@angular/forms";
import { ValidatorsExtension } from "./ValidatorsExtension"

describe('ValidatorsExtension', ()=>{

    let validator: ValidatorsExtension;

    beforeEach(()=>{
        validator = new ValidatorsExtension();
    })


    it('should verify if the vaule is a time (hh:mm)', ()=> {
        const formControl = new FormControl('', [ValidatorsExtension.required, ValidatorsExtension.dateTime]);
        expect(formControl.valid).toBeFalse();
        formControl.setValue('19:00');
        expect(formControl.valid).toBeTrue();
        formControl.setValue('29:00');
        expect(formControl.valid).toBeFalse();
        formControl.setValue('1:00');
        expect(formControl.valid).toBeTrue();
    })

    it('should verify if the value is a date (jj/mm/aaaa)', ()=>{
        const formControl = new FormControl('', [ValidatorsExtension.required, ValidatorsExtension.date]);
        formControl.setValue('2022-10-22');
        expect(formControl.valid).toBeTrue();
        formControl.setValue('2022-23-25');
        expect(formControl.valid).toBeFalse();
        formControl.setValue('2022-12-35');
        expect(formControl.valid).toBeFalse();
    })
})