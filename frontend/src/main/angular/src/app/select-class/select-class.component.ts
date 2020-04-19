import { Component,  Input, SimpleChanges } from '@angular/core';
import { JarService } from '../jar.service';
import { SelectStringComponent } from '../select-string.component';

@Component({
  selector: 'select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.css']
})
export class SelectClassComponent extends SelectStringComponent {
  @Input()
  jarName: String;
  @Input()
  packageName: String;

  constructor(private service: JarService) {super()}

  afterngOnChanges(change: SimpleChanges) {
    if (change.jarName) {
      let temp = change.jarName.currentValue as String;
      this.getClasses(temp, this.packageName);
    }
    if (change.packageName) {
      let temp = change.packageName.currentValue as String;
      console.log("package " + temp);
      this.getClasses(this.jarName, temp);
    }
  }
  getClasses(jarName: String, packageName: String) {
    this.values = [];
    if (jarName && packageName && jarName.endsWith('.jar'))
      this.service.getClasses(jarName,packageName).subscribe((data) => {
        console.log(data);
        this.values = data;
      });
  }

}
