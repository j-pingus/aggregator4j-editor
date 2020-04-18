import { Component, OnInit } from '@angular/core';
import { JarService } from '../jar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-jar-list',
  templateUrl: './jar-list.component.html',
  styleUrls: ['./jar-list.component.css']
})
export class JarListComponent implements OnInit {
  jars: String[] = [];
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  constructor(public jarService: JarService, private route: ActivatedRoute, private router: Router, private snackBar:MatSnackBar) {
    console.log('Jar list component created');
  }

  ngOnInit(): void {
    this.getJars();
  }
  getJars() {
    this.jars = [];
    this.jarService.getJars().subscribe((data) => {
      console.log(data);
      this.jars = data;
    });
  }
  delete(jar) { 
    this.jarService.deleteJar(jar).subscribe(data=>{
      this.snackBar.open(data.message,null,{duration:1300});
      this.getJars();
    });
  }
  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  public upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.jarService.pushFileToStorage(this.currentFileUpload)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.snackBar.open(this.currentFileUpload.name+" uploaded",null,{duration:2800});
        //alert('File Successfully Uploaded');
        this.getJars();
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
    this.selectedFiles = event.target.files;
  }
}
