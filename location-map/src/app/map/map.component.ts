import { Input, OnInit, Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';
import { DataService } from '../data.service';



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

  constructor (private dataService: DataService)
  {
    // this.locations = []
  }

  // atractions: Array<{ name: string, lat: number, lon : number}> = [];

  // updateAttractions(newAtractions: Array<{ name: string, lat: number, lon : number}>){
  //   this.atractions = newAtractions
  //   console.log("newAtt", newAtractions)
  // }

  // ngOnChanges() {
  //   this.locations.subscribe({

  //     // deal with asynchronous Observable result
  //     next(attractions: { name: string; lat: number; lon: number; }[]) {
  //       console.log("subcsribed!")

  //       console.log(attractions)
  //       if (attractions === undefined || this.map === undefined) {
  //         console.log("exit")
  //         return
  //       }
  //       for (var i = 0; i < attractions.length; i++) {
  //         let marker = L.marker([attractions[i].lat, attractions[i].lon])
  //           .bindPopup(attractions[i].name)
  //           .addTo(this.map);
  //       }

  // }})

  // }

  ngOnInit() {
    this.map = L.map("map").setView([46.879966, -121.726909], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.locations.subscribe()

    for (var i = 0; i < this._locations.length; i++) {
      let marker = L.marker([this._locations[i].lat, this._locations[i].lon])
        .bindPopup(this._locations[i].name)
        .addTo(this.map);
    }

  }
}




