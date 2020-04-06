import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
const endpoint = 'http://localhost:8080/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class JarServiceService {
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || [];
  }
  getJars(): Observable<any> {
    return this.http.get(endpoint + 'jars').pipe(
      map(this.extractData));
  }
  deleteJar(jar): Observable<any>{
    return this.http.delete(endpoint+'jars/'+jar).pipe(map((this.extractData)));
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
