import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { JarService } from '../jar.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'select-package',
  templateUrl: './select-package.component.html',
  styleUrls: ['./select-package.component.css']
})
export class SelectPackageComponent implements OnInit {

  @Input()
  control: FormControl;
  @Input()
  jarName: String;
  @Output()
  packageChanged = new EventEmitter<String>();
  filteredOptions: Observable<String[]>;

  packages: String[] = [];

  ngOnChanges(change: SimpleChanges) {
    if (change.control) {
      console.log("package : control")
      let temp = change.control.currentValue as FormControl;
      if (temp) {
        this.filteredOptions = temp.valueChanges
          .pipe(
            startWith(''),
            map(value => {
              this.packageChanged.emit(value);
              return this._filter(value);
            })
          );
      }
    }
    if (change.jarName) {
      let temp = change.jarName.currentValue as String;
      console.log("package " + temp);
      this.getPackages(temp);
    }
  }
  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this.packages.filter(option => option.toLowerCase().includes(filterValue));
  }
  getPackages(jarName: String) {
    this.packages = [];
    if (jarName && jarName.endsWith('.jar'))
      this.service.getPackages(jarName).subscribe((data) => {
        console.log(data);
        this.packages = data;
      });
  }

  constructor(private service: JarService) { }

  ngOnInit(): void {
  }

}
