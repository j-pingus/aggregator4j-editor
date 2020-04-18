import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { JarService } from '../jar.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.css']
})
export class SelectClassComponent implements OnInit {
  @Input()
  jarName: String;
  @Input()
  packageName: String;
  @Input()
  control: FormControl;
  @Output()
  classChanged = new EventEmitter<String>();

  filteredOptions: Observable<String[]>;

  classes: String[] = [];

  constructor(private service: JarService) { }

  ngOnInit(): void {
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.jarName) {
      let temp = change.jarName.currentValue as String;
      this.getClasses(temp, this.packageName);
    }
    if (change.packageName) {
      let temp = change.packageName.currentValue as String;
      console.log("package " + temp);
      this.getClasses(this.jarName, temp);
    }
    if (change.control) {
      console.log("package : control")
      let temp = change.control.currentValue as FormControl;
      if (temp) {
        this.filteredOptions = temp.valueChanges
          .pipe(
            startWith(''),
            map(value => {
              this.classChanged.emit(value);
              return this._filter(value);
            })
          );
      }
    }
  }
  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this.classes.filter(option => option.toLowerCase().includes(filterValue));
  }
  getClasses(jarName: String, packageName: String) {
    this.classes = [];
    if (jarName && packageName && jarName.endsWith('.jar'))
      this.service.getClasses(jarName,packageName).subscribe((data) => {
        console.log(data);
        this.classes = data;
      });
  }

}
