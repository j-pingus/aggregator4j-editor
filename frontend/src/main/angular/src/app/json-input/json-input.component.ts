import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponent implements OnChanges{
  @Input()
  json: FormControl;
  @Input()
  placeholder: 'json model';

  value: string;
  validJson: boolean;
  invalidJsonMessage: any;
  constructor() {
    // this.json.registerOnChange(this.ngOnChanges)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.json) {
      const temp = changes.json.currentValue as FormControl;
      temp.registerOnChange((change) => this.controlChange(change));
    }
  }
  controlChange(change) {
    try {
      console.log(change);
      this.value = JSON.stringify(JSON.parse(change), undefined, '\t');
    } catch (error) {
      console.error(error);
    }
  }
  // change events from the textarea
  onChange(event) {
    // get value from text area
    const newValue = event.target.value;
    try {
      // parse it to json
      const data = JSON.parse(newValue);
      this.validJson = true;
      this.json.setValue(JSON.stringify(data));

    } catch (ex) {
      this.validJson = false;
      this.invalidJsonMessage = ex.message;
    }
  }
}
