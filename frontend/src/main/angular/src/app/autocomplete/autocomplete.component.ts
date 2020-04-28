import { Component, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  @Input()
  control: FormControl;
  @Output()
  valueChanged = new EventEmitter<String>();
  @Input()
  values: String[] = [];
  @Input()
  placeholder: String = '';
  @Input()
  style: String = 'width:250px';
  @Input()
  prefix: string = '';
  filteredOptions: Observable<String[]>;

  ngOnChanges(change: SimpleChanges) {
    if (change.control) {
      let temp = change.control.currentValue as FormControl;
      if (change.control.isFirstChange()) {
        if (temp.value && temp.value !== '') {
          this.valueChanged.emit(temp.value);
        }
      }
    }
    if (change.values) {
      this.filteredOptions = of(change.values.currentValue);
    }
    this.afterngOnChanges(change);
  }
  changedText(text: String) {
    this.valueChanged.emit(text);
    this.filteredOptions = of(this._filter(text));
  }
  afterngOnChanges(change: SimpleChanges) { }

  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.values
      .filter(option => option.toLowerCase().includes(filterValue))
      .map(option => {
        console.log(this.prefix);
        if (option.startsWith(this.prefix))
          return option.substr(this.prefix.length);
        return option;
      });
  }

}
