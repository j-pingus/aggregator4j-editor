import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormMultiplier } from '../form-multiplier';
import { JarService } from '../jar.service';
@Component({
  selector: 'app-a4j-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.css']
})
export class ConfigEditorComponent implements OnChanges{
  @Input()
  config: FormGroup = new FormGroup({});
  @Input()
  public jarName: string;
  public packageName: string;
  public classFilter = new FormControl('');
  public valueFilter = new FormControl('');
  public classes: string[] = [];
  public packages: string[] = [];
  public filterClass = '';
  constructor(private fb: FormBuilder, private service: JarService) {
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.jarName) {
      this.loadClasses(change.jarName.currentValue, this.packageName);
      this.loadPackages(change.jarName.currentValue);
    }
  }
  setFilter(event) {
    console.log(event);
  }
  public getFunctionList(): FormMultiplier {
    return this.config.get('functionList') as FormMultiplier;
  }
  public getClassList(): FormMultiplier {
    return this.config.get('classList') as FormMultiplier;
  }
  setPackage(name: string) {
    this.packageName = name;
    this.loadClasses(this.jarName, this.packageName);
  }
  loadClasses(jarName: string, packageName: string) {
    this.classes = [];
    if (jarName && packageName !== undefined && jarName.endsWith('.jar')) {
      this.service.getClasses(jarName, packageName).subscribe((data) => {
        console.log(data);
        this.classes = data;
      });
    }
  }
  loadPackages(jarName: string) {
    this.packages = [];
    if (jarName && jarName.endsWith('.jar')) {
      this.service.getPackages(jarName).subscribe((data) => {
        console.log(data);
        this.packages = data;
      });
    }
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
    const control = group.get(field) as FormControl;
    if (control) {
      return control.value;
    }
  }
}
