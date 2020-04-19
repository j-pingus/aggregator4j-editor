import { Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export abstract class SelectStringComponent {
    @Input()
    control: FormControl;
    @Output()
    valueChanged = new EventEmitter<String>();
    @Input()
    values: String[] = [];

    filteredOptions: Observable<String[]>;

    ngOnChanges(change: SimpleChanges) {
        console.log("ngOnChanges");
        console.log(change);
        if (change.control) {
            console.log("package : control")
            let temp = change.control.currentValue as FormControl;
            if (temp) {
                this.filteredOptions = temp.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => {
                            this.valueChanged.emit(value);
                            return this._filter(value);
                        })
                    );
            }
        }
        this.afterngOnChanges(change);
    }
    abstract afterngOnChanges(change: SimpleChanges);

    private _filter(value: string): String[] {
        const filterValue = value.toLowerCase();
        return this.values.filter(option => option.toLowerCase().includes(filterValue));
    }
}