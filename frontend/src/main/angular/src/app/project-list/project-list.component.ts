import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any = [];

  constructor(private service:ProjectService, private router:Router) { }

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.projects = [];
    this.service.getProjects().subscribe((data: {}) => {
      console.log(data);
      this.projects = data;
    });
  }
  edit(project){
    console.log("edit");
    this.router.navigateByUrl('project/'+project.id);
  }
  newProject(){
    this.service.newProject().subscribe((project) => {
      this.router.navigateByUrl('project/'+project.id);
    });
  }
  delete(project){
    this.service.deleteProject(project.id);
  }
}
