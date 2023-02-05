import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest(): Observable<any> {
    const res = this.httpClient.get(`${this.REST_API_SERVER}/locations`);
    return res;
  }
}
