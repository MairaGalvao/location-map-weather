import { Input, OnInit, Component } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  map: any;

  _locations: any
  @Input()
  set locations(newLocations: any){
    this._locations = newLocations
  }
  get locations(): any {
    return this._locations
  }

  eventsSubscription: Subscription | undefined;

  constructor ()  {  }

  // atractions: Array<{ name: string, lat: number, lon : number}> = [];

  ngOnInit() {
    this.map = L.map("map").setView([46.879966, -121.726909], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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




