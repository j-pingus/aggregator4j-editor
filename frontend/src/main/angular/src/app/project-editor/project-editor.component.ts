import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css']
})
export class ProjectEditorComponent implements OnInit {

  project:any;
  id:string;
  constructor(private service:ProjectService,private route:ActivatedRoute) { 
   }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProject(params.get('id')))
    ).subscribe(project=>{
      this.project=project;
      console.log(project);
    }
    )
  }

}
