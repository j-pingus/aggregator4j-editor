import { Component,  Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormMultiplier } from '../form-multiplier';
import { JarService } from '../jar.service';
@Component({
  selector: 'a4j-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.css']
})
export class ConfigEditorComponent  {
  @Input()
  config: FormGroup=new FormGroup({});
  @Input()
  public jarName: String;
  public packageName: String;
  public classFilter = new FormControl('');
  public valueFilter = new FormControl('');
  public classes:String []=[];
  public filterClass: String = '';
  constructor(private fb: FormBuilder,private service: JarService) {
  }
  ngOnChanges(change: SimpleChanges) {
    if(change.jarName){
      this.loadClasses(change.jarName.currentValue,this.packageName);
    }
  }
  setFilter(event){
    console.log(event);
  }
  public getFunctionList():FormMultiplier{
    return this.config.get('functionList') as FormMultiplier;
  }
  public getClassList():FormMultiplier{
    return this.config.get('classList') as FormMultiplier;
  }
  setPackage(name: String) {
    this.packageName = name;
    this.loadClasses(this.jarName,this.packageName);
  }
  loadClasses(jarName: String, packageName: String) {
    this.classes = [];
    if (jarName && packageName && jarName.endsWith('.jar'))
      this.service.getClasses(jarName,packageName).subscribe((data) => {
        console.log(data);
        this.classes = data;
      });
  }
addFunction() {
    this.getFunctionList().addNew();
  }
  removeFunction(i: number) {
    this.getFunctionList().removeAt(i);
  }
  addClass() {
    this.getClassList().addNew();
  }
  removeClass(i: number) {
    this.getClassList().removeAt(i);
  }
  getValue(group: FormGroup, field: string) {
    let control = group.get(field) as FormControl;
    if (control)
      return control.value;
  }
}
