import { Input, OnInit, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: any;

  _locations: any;

  @Input()
  set locations(newLocations: any) {
    this._locations = newLocations;
  }
  get locations(): any {
    return this._locations;
  }

  eventsSubscription: Subscription | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.map = L.map('map').setView([46.879966, -121.726909], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map
    );

    this.eventsSubscription = this._locations.subscribe((data: any) => {
      this.locations = data;

      for (var i = 0; i < this._locations.length; i++) {
        let marker = L.marker([this._locations[i].lat, this._locations[i].lon])
          .bindPopup(
            '</br>Attraction: ' +
              this._locations[i].name +
              '</br>Temperature: ' +
              this._locations[i].temp +
              '</br>Humidity: ' +
              this._locations[i].humid +
              '</br>City: ' +
              this._locations[i].city +
              '</br>[Lat, Lon]: [ ' +
              this._locations[i].lat +
              ', ' +
              this._locations[i].lon +
              ' ] '
          )
          .addTo(this.map);
      }
    });
  }
}
