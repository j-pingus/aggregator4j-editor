import { Component, OnInit, Input } from '@angular/core';
import { JarService } from '../jar.service';
import { FormGroup } from '@angular/forms';
import { FormMultiplier } from '../form-multiplier';

@Component({
  selector: 'app-a4j-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.css']
})
export class ClassEditorComponent{
  @Input()
  public jarName: string;
  @Input()
  public control: FormGroup = new FormGroup({});
  @Input()
  public classes: string [] = [];
  @Input()
  public filterValue = '';

  fields: string[];
  constructor(private service: JarService) {
    this.fields = [];
  }
  setClassName(className: string){
    this.getFields(className);
  }
  getCollectList(): FormMultiplier{
    return this.control.get('collectList') as FormMultiplier;
  }
  getExecuteList(): FormMultiplier{
    return this.control.get('executeList') as FormMultiplier;
  }
  getVariableList(): FormMultiplier{
    return this.control.get('variableList') as FormMultiplier;
  }
  getFields(className: string) {
    this.fields = [];
    if (this.jarName && className && this.jarName.endsWith('.jar') && className !== '') {
      this.service.getFields(this.jarName, className).subscribe((data) => {
        this.fields = data;
      });
    }
  }

}
