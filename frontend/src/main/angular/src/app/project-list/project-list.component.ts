import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any = [];
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private service:ProjectService, private router:Router, private snackBar:MatSnackBar) { }

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
    this.service.deleteProject(project.id).subscribe(data => {
      console.log(data);
      this.getProjects();
    },
    error => {
      if(error instanceof HttpErrorResponse){
        this.snackBar.open(error.error.message,"Error",{duration:5000});
      }else{
        console.error(error);
      }
    });
  }
  public upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.service.importProject(this.currentFileUpload)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.snackBar.open(this.currentFileUpload.name+" uploaded",null,{duration:2800});
        //alert('File Successfully Uploaded');
        //console.log(event.body);
        this.router.navigateByUrl('project/'+event.body.id);
      }
      this.selectedFiles = undefined;
    },
    error => {
      if(error instanceof HttpErrorResponse){
        this.snackBar.open(error.error,"Error",{duration:5000});
      }else{
        console.error(error);
      }
    }
    );
  }
  selectFile(event) {
    this.selectedFiles = event;
  }
}
