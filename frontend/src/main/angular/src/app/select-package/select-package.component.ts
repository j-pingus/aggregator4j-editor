import { Component,  Input, SimpleChanges} from '@angular/core';
import { JarService } from '../jar.service';
import { SelectStringComponent } from '../select-string.component';

@Component({
  selector: 'select-package',
  templateUrl: './select-package.component.html',
  styleUrls: ['./select-package.component.css']
})
export class SelectPackageComponent extends SelectStringComponent{
  @Input()
  jarName: String;

  constructor(private service: JarService) {
    super();
  }

  afterngOnChanges(change: SimpleChanges) {
    if (change.jarName) {
      let temp = change.jarName.currentValue as String;
      console.log("package " + temp);
      this.getPackages(temp);
    }
  }

  getPackages(jarName: String) {
    this.values = [];
    if (jarName && jarName.endsWith('.jar'))
      this.service.getPackages(jarName).subscribe((data) => {
        console.log(data);
        this.values = data;
      });
  }


}
