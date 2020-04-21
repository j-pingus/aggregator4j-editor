import { Component, OnInit, Input } from '@angular/core';
import { JarService } from '../jar.service';
import { FormGroup } from '@angular/forms';
import { FormMultiplier } from '../form-multiplier';

@Component({
  selector: 'class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.css']
})
export class ClassEditorComponent{
  @Input()
  public jarName:String;
  @Input()
  public control:FormGroup=new FormGroup({});
  @Input()
  public classes:String []=[];
  @Input()
  public filterValue:String='';
  
  fields:String[];
  constructor(private service:JarService) { 
    this.fields=[];
  }
  setClassName(className:String){
    this.getFields(className);
  }
  getCollectList():FormMultiplier{
    return this.control.get('collectList') as FormMultiplier;
  }
  getExecuteList():FormMultiplier{
    return this.control.get('executeList') as FormMultiplier;
  }
  getVariableList():FormMultiplier{
    return this.control.get('variableList') as FormMultiplier;
  }
  getFields(className: String) {
    this.fields = [];
    console.log("Load fields:"+this.jarName+" - "+className); 
    if (this.jarName && className && this.jarName.endsWith('.jar') && className !== '')
      this.service.getFields(this.jarName,className).subscribe((data) => {
        console.log(data);
        this.fields = data;
      });
  }

}
