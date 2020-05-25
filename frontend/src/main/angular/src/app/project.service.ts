import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {Project} from './model/model';

const endpoint = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    const body = res;
    return body || [];
  }

  getProjects(): Observable<any> {
    return this.http.get(endpoint + 'projects').pipe(
      map(this.extractData));
  }

  newProject(): Observable<any> {
    return this.http.get(endpoint + 'projects/new').pipe(
      map(this.extractData)
    );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(
      endpoint + 'project/' + id);
  }

  saveProject(project: any): Observable<HttpResponse<any>> {
    return this.http.put(endpoint + 'projects', project, {observe: 'response'});
  }

  deleteProject(id: string) {
    return this.http.delete(endpoint + 'project/' + id, undefined);
  }

  getConfig(id: string, type: string): Observable<string> {
    const headers = new HttpHeaders();

    console.log(type);
    return this.http.get(endpoint + 'project/' + id + "/config"
      , {headers: headers.append("Accept", type)
    , responseType:'text'});
  }

  importProject(file: File): Observable<HttpEvent<Project>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', endpoint + 'projects/import', data, {
      reportProgress: true
    });
    return this.http.request(newRequest);
  }
}
