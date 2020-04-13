import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Function, Class } from '../model/model';
@Component({
  selector: 'a4j-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.css']
})
export class ConfigEditorComponent implements OnInit {
  @Input()
  config:FormGroup;
  functions:FormArray;
  classes:FormArray;
  constructor(private fb:FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.config);
    this.functions=this.config.get('functionList') as FormArray;
    this.classes=this.config.get('classList') as FormArray;
    console.log(this.functions);
  }
  addFunction(){
    this.functions.push(
      this.fb.group(new Function())
    );
  }
  removeFunction(i:number){
    this.functions.removeAt(i);
  }
  addClass(){
    this.classes.push(
      this.fb.group(new Class())
    );
  }
  removeClass(i:number){
    this.classes.removeAt(i);
  }
}
