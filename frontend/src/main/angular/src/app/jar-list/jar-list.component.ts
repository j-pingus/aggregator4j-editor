import { Component, OnInit } from '@angular/core';
import { JarServiceService } from '../jar-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-jar-list',
  templateUrl: './jar-list.component.html',
  styleUrls: ['./jar-list.component.css']
})
export class JarListComponent implements OnInit {
  jars: any = [];
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  constructor(public jarService: JarServiceService, private route: ActivatedRoute, private router: Router) {
    console.log('Jar list component created');
  }

  ngOnInit(): void {
    this.getJars();
  }
  getJars() {
    this.jars = [];
    this.jarService.getJars().subscribe((data: {}) => {
      console.log(data);
      this.jars = data;
    });
  }
  delete(jar) { }
  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  public upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.jarService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert('File Successfully Uploaded');
        this.getJars();
      }
      this.selectedFiles = undefined;
    }
    );
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
