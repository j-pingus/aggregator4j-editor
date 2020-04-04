import { Component, OnInit } from '@angular/core';
import {JarServiceService} from '../jar-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-jar-list',
  templateUrl: './jar-list.component.html',
  styleUrls: ['./jar-list.component.css']
})
export class JarListComponent implements OnInit {
  jars:any=[];
  constructor(public jarService:JarServiceService, private route: ActivatedRoute, private router: Router) { 
    console.log('Jar list component created');
  }

  ngOnInit(): void {
    this.getJars();
  }
  getJars(){
    this.jars=[];
    this.jarService.getJars().subscribe((data: {}) => {
      console.log(data);
      this.jars = data;
    });
  }
  delete(jar){}
}
