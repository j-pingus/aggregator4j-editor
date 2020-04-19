import { Component, Input } from '@angular/core';
import { JarService } from '../jar.service';
import { SelectStringComponent } from '../select-string.component';

@Component({
  selector: 'select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent extends SelectStringComponent {

  constructor(private service:JarService) { super()}
  
  afterngOnChanges(change: import("@angular/core").SimpleChanges) {
    //Nothing
  }

}
