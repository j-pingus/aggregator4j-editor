import { Component,  Input, SimpleChanges } from '@angular/core';
import { JarService } from '../jar.service';
import { SelectStringComponent } from '../select-string.component';

@Component({
  selector: 'select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.css']
})
export class SelectClassComponent extends SelectStringComponent {
  afterngOnChanges(change: SimpleChanges) {
    //nothing
  }

  constructor() {super()}

}
