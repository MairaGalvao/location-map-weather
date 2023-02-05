import { Input, OnInit, Component } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})



export class MapComponent implements OnInit {
  map: any;

  _locations: any

  // private REST_API_POST = "http://localhost:5000/post-locations";



  @Input()
  set locations(newLocations: any){
    this._locations = newLocations
  }
  get locations(): any {
    return this._locations
  }

  eventsSubscription: Subscription | undefined;


 constructor (private dataService: DataService)  {  }


 // atractions: Array<{ name: string, lat: number, lon : number}> = [];



  // addUserLocation(name:string, lon:number, lat:number): Observable<any> {
  //   const res = this.http.post(this.REST_API_POST, name, lon, lat);
  //   return res
  // }
  // addUserLocation(name:string, lat:number, lon:number): any {
  //   const headers = { 'content-type': 'application/json'}
  //   const body=JSON.stringify({name, lat, lon});
  //   console.log(body)
  //   this.dataService.sendGetRequest()
  //   // return this.httpClient.post("http://localhost:5000/post-locations", body, {'headers':headers})
  // }




  ngOnInit() {
    this.map = L.map("map").setView([46.879966, -121.726909], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

    }).addTo(this.map);

    this.eventsSubscription = this._locations.subscribe((data: any) => {
      console.log("event recieved", data)
      this.locations = data

      for (var i = 0; i < this._locations.length; i++) {
        let marker = L.marker([this._locations[i].lat, this._locations[i].lon])
          .bindPopup(this._locations[i].name + '</br>' + this._locations[i].temp)
          .addTo(this.map);
      }
      console.log("added markers to the map")
    })

  }
}




