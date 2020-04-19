import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter } from '@angular/core';
import { JarService } from '../jar.service';
import { SelectStringComponent } from '../select-string.component';
@Component({
  selector: 'select-jar',
  templateUrl: './select-jar.component.html',
  styleUrls: ['./select-jar.component.css']
})
export class ListClassesComponent extends SelectStringComponent implements OnInit {
  afterngOnChanges(change: SimpleChanges) {
    //empty
  }

  constructor(private service: JarService) {
     super();
   }

  ngOnInit(): void {
    this.getJars();
  }
  getJars() {
    this.values = [];
    this.service.getJars().subscribe((data) => {
      this.values = data;
    });
  }

}
