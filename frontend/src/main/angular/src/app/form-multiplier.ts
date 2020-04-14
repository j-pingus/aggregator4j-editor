import { AbstractControlOptions, AsyncValidatorFn, FormArray, FormGroup, ValidatorFn } from '@angular/forms';
export class FormMultiplier extends FormArray {
    private createNewControl: Function;
    constructor(createControl: Function,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, 
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super([],validatorOrOpts,asyncValidator);
        this.createNewControl = createControl;
    } 
    public addNew(){
        this.push(this.createNewControl.call(undefined))
    }
    patchValue(value: any[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        let count = value.length - this.length;
        while (count < 0) {
            this.removeAt(this.length - 1);
            count++;
        }
        while (count > 0) {
            this.addNew();
            count--;
        }
        super.patchValue(value, options);
    }

}
