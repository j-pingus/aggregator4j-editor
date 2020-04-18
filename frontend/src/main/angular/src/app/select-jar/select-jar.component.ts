import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { JarService } from '../jar.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'select-jar',
  templateUrl: './select-jar.component.html',
  styleUrls: ['./select-jar.component.css']
})
export class ListClassesComponent implements OnInit {

  @Output()
  jarNameChanged = new EventEmitter<String>();

  @Input()
  control: FormControl

  filteredOptions: Observable<String[]>;

  jars: String[] = [];

  constructor(private service: JarService) { }

  ngOnInit(): void {
    this.getJars();
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.control) {
      let temp = change.control.currentValue as FormControl;
      if (temp) {
        this.filteredOptions = temp.valueChanges
          .pipe(
            startWith(''),
            map(value => {
              this.jarNameChanged.emit(value);
              return this._filter(value);
            })
          );
      }
    }
  }
  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this.jars.filter(option => option.toLowerCase().includes(filterValue));
  }
  getJars() {
    this.jars = [];
    this.service.getJars().subscribe((data) => {
      this.jars = data;
    });
  }

}
