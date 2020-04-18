import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { A4jFunction, A4jClass } from '../model/model';
import { FormMultiplier } from '../form-multiplier';
@Component({
  selector: 'a4j-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.css']
})
export class ConfigEditorComponent implements OnInit {
  @Input()
  config: FormGroup;
  @Input()
  public jarName:String;
  public packageName:String;

  functions: FormMultiplier;
  classes: FormMultiplier;
  public filterClass:String='';
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.functions = this.config.get('functionList') as FormMultiplier;
    this.classes = this.config.get('classList') as FormMultiplier;
  }
  setPackage(name:String){
    this.packageName=name;
  }
  addFunction() {
    this.functions.addNew();
  }
  removeFunction(i: number) {
    this.functions.removeAt(i);
  }
  addClass() {
    this.classes.addNew();
  }
  removeClass(i: number) {
    this.classes.removeAt(i);
  }
  getValue(group: FormGroup, field: string) {
    let control=group.get(field) as FormControl;
    if (control)
      return control.value;
  }
}
