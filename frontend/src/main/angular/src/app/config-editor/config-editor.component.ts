import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'a4j-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.css']
})
export class ConfigEditorComponent implements OnInit {
  @Input()
  config:FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.config);
  }

}
