import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],

  template: `
    <app-navbar></app-navbar>

    <div class="container">
      <h3 id="title">Attractions manager</h3>

      <form
        novalidate
        class="form"
        #attractionsForm="ngForm"
        (ngSubmit)="onAttractionCreate(attractionsForm.value)"
      >
        <input
          id="name"
          class="input"
          placeholder="Location"
          type="text"
          name="name"
          ngModel
          (keyup.enter)="onKeyName($event)"
        />

        <input
          type="text"
          placeholder="Longitude"
          class="input"
          name="lon"
          ngModel
          (keyup.enter)="onKeyLongitude($event)"
        />

        <input
          type="text"
          class="input"
          placeholder="Latitude"
          name="lat"
          ngModel
          (keyup.enter)="onKeyLatitude($event)"
        />

        <input type="submit" class="add" value="Add Attraction" />
      </form>
      <div class="tasks">
        <h3 id="title-user">All attractions</h3>

        <table id="customers">
          <tr className="table-attractions">
            <th>Location</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Delete</th>
          </tr>

          <tr *ngFor="let obj of locationData">
            <td>{{ obj.attractionUser }}</td>
            <td>{{ obj.lon }}</td>
            <td>{{ obj.lat }}</td>
            <td>
              <button id='delete' (click)="deleteAttraction(eachAttraction)">
                <i class="fas fa-trash-alt delete">Delete</i>
              </button>
            </td>
            <!-- <td><button class="btn btn-success">Delete</button></td> -->
          </tr>
        </table>
      </div>

      <app-map [locations]="locations"></app-map>
    </div>
  `,
})
export class AppComponent implements OnInit {
  locations: Subject<any> = new Subject();
  locationData: any;
  attractionUser = '';
  longitude = '';
  latitude = '';

  checked = false;
  eachAttraction: any;

  constructor(
    private dataService: DataService,
    public http: HttpClient,
    private _sanitizer: DomSanitizer
  ) {}

  sendDataByObservable(data: any) {
    this.locations.next(data);
  }

  onAttractionCreate(attractions: { name: string; lon: number; lat: number }) {
    this.http
      .post('http://localhost:5000/locations', attractions)
      .subscribe((data) => {
        return data;
      });
  }

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      this.sendDataByObservable(data);
      this.locationData = data;
    });
  }
  //functionaly WIP deleting an attraction
  deleteAttraction(eachAttraction: any) {
    console.log(eachAttraction, ',my attraction to be deleted...');
  }
  onKeyName(event: any) {
    this.attractionUser += event.target.value;
  }

  onKeyLatitude(event: any) {
    this.latitude += event.target.value;
  }

  onKeyLongitude(event: any) {
    this.longitude += event.target.value;
  }
}
