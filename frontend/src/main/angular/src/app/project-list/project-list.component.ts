import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any = [];

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.projects = [];
    this.projectService.getProjects().subscribe((data: {}) => {
      console.log(data);
      this.projects = data;
    });
  }
  edit(project){
    console.log("edit");
    console.log(project);
  }
  delete(project){
    console.log("delete");
    console.log(project);
  }
}
