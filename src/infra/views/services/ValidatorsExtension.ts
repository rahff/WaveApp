import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class ValidatorsExtension extends Validators {

    constructor(){
        super()
    }

    public static dateTime(control: AbstractControl): ValidationErrors | null {
        const dateTime = /[0-2]?[0-9]{1}:0?[0-5]{1}[0-9]{1}/;
        return dateTime.test(control.value) ? ValidatorsExtension.isValidTime(control.value) : {invalidTime: true}
    }

    private static isValidTime(value: string): ValidationErrors | null {
        const date = new Date("Oct 12 2022" + " " + value);
        if(!date.getTime()) return {invalidTime: true};
        return null
    }

    public static date(control: AbstractControl): ValidationErrors | null {
        const dateRegex = /2{1}0{1}[0-9]{1}[0-9]{1}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}/
        return dateRegex.test(control.value) ? ValidatorsExtension.isValidDate(control.value) : { invalidDate: true};
    }

    private static isValidDate(value: string): ValidationErrors | null {
        const date = new Date(value);
        if(!date.getDate()) return { invalidDate: true};
        return null;
    }
}