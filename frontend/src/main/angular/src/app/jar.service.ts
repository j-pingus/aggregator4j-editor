import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
const endpoint = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class JarService {
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || [];
  }
  getJars(): Observable<string[]> {
    return this.http.get<string[]>(endpoint + 'jars').pipe();
  }
  getPackages(jarName: string): Observable<string[]> {
    return this.http.get<string[]>(endpoint + 'jars/' + jarName + '/packages').pipe();
  }
  getClasses(jarName: string, packageFilter?: string): Observable<string[]> {
    const option: string = packageFilter ? '?packageFilter=' + packageFilter : '';
    return this.http.get<string[]>(endpoint + 'jars/' + jarName + '/classes' + option).pipe();
  }
  getFields(jarName: string, className: string): Observable<string[]> {
    return this.http.get<string[]>(endpoint + 'jars/' + jarName + '/' + className + '/fields').pipe();
  }
  deleteJar(jar): Observable<any> {
    return this.http.delete(endpoint + 'jars/' + jar).pipe(map((this.extractData)));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', endpoint + 'jars', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
