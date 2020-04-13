import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Project } from '../model/model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {

  project: Project;
  control: FormGroup;

  constructor(private service: ProjectService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.control = formBuilder.group({
      name: '',
      id: '',
      configuration: formBuilder.group({
        functionList: formBuilder.array([]),
        classList: formBuilder.array([]),
        analysedPackage: ''
      }), 
      jsonPayload: {},
      className: ''
    }
    )
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProject(params.get('id')))
    ).subscribe(project => {
      this.project = project;
      this.control.patchValue(project);
      console.log(project);
    }
    )
  }
  value(){
    console.log(this.control.value);
  }
}
