import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
const endpoint = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {

  constructor(private http: HttpClient) { }
  evaluateProject(project: any, expression?: string): Observable<HttpResponse<any>> {
    let option = "";
    
    if (expression)
      option += "?expression=" + encodeURIComponent(expression);
    return this.http.put(endpoint + "aggregator/evaluate" + option, project, { observe: 'response' });
  }
}
