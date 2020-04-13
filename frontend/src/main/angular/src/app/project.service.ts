import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Project } from './model/model'
const endpoint = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || [];
  }
  
  getProjects(): Observable<any> {
    return this.http.get(endpoint + 'projects').pipe(
      map(this.extractData));
  }
  newProject(): Observable<any>{
    return this.http.get(endpoint+'projects/new').pipe(
      map(this.extractData)
    );
  }
  getProject  (id:String): Observable<Project> {
    return this.http.get<Project>(
      endpoint+'project/'+id);
  }}
