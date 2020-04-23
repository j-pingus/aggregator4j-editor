import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponent {
  @Input()
  json: FormControl;
  value: String;
  validJson: boolean;
  invalidJsonMessage: any;
  constructor() {
    //this.json.registerOnChange(this.ngOnChanges)
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.json) {
      let temp = change.json.currentValue as FormControl;
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
    let newValue = event.target.value;
    try {
      // parse it to json
      let data = JSON.parse(newValue);
      this.validJson = true;
      this.json.setValue(JSON.stringify(data));

    } catch (ex) {
      this.validJson = false;
      this.invalidJsonMessage = ex.message;
    }
  }
}
