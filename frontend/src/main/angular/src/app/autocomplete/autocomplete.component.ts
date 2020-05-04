import {Component, SimpleChanges, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-a4j-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnChanges{
  @Input()
  control: FormControl;
  @Output()
  valueChanged = new EventEmitter<string>();
  @Input()
  values: string[] = [];
  @Input()
  placeholder = '';
  @Input()
  style = 'width:250px';
  @Input()
  prefix = '';
  filteredOptions: Observable<string[]>;

  ngOnChanges(change: SimpleChanges) {
    if (change.control) {
      const temp = change.control.currentValue as FormControl;
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
  changedText(text: string) {
    this.valueChanged.emit(text);
    this.filteredOptions = of(this._filter(text));
  }
  afterngOnChanges(change: SimpleChanges) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.values
      .filter(option => option.toLowerCase().includes(filterValue))
      .map(option => {
        console.log(this.prefix);
        if (option.startsWith(this.prefix)) {
          return option.substr(this.prefix.length);
        }
        return option;
      });
  }

}
