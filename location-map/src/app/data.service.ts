import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(): Observable<any>{
    console.log("getting locations")
    const res = this.httpClient.get(`${this.REST_API_SERVER}/locations`);
    return res

  }




  public sendPostRequest(location:any): any {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(location);
    console.log(body)
    this.httpClient.post(this.REST_API_SERVER + 'people', body,{'headers':headers})
  }
}
