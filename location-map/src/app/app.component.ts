import { Component, OnInit, } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  template: `

  <!-- <app-map [locations] ="locations"></app-map> -->
  <!-- <app-attractions>  </app-attractions> -->

<!-- <app-attractions>  </app-attractions> -->

<div>
  <div>
  <h1>attractions form!</h1>
  </div>

  <form #attractionsForm="ngForm" (ngSubmit)="onAttractionCreate(attractionsForm.value)">
  <label >Name</label>
  <input id="name" type="text" name="name" ngModel (keyup)="onKeyName($event)">

  <label>Longitude</label>
  <input type="text" name="lon" ngModel (keyup)="onKeyLongitude($event)">

  <label>Latitude</label>
  <input type="text" name="lat" ngModel (keyup)="onKeyLatitude($event)">


  <input type="submit" value="add attraction">

  </form>
  </div>

  <div>
  <h3>All attractions</h3>
  <table id="users">
  <tr>
    Name: <th>{{NameUser}}</th>

  </tr>
  <tr>
    Longitude: <th>{{longitude}}</th>

  </tr>
  <tr>
    Latitude: <th>{{latitude}}</th>

  </tr>
  </table>
  </div>

  `
})

export class AppComponent implements OnInit {
  locations: Subject<any> = new Subject();
  NameUser = '';
  longitude = '';
  latitude = '';


  constructor (private dataService: DataService,
    public http: HttpClient, private _sanitizer: DomSanitizer
  )

{}







sendDataByObservable(data: any) {
  console.log("sending data", data)
  this.locations.next(data)
}

onAttractionCreate(attractions:{name:string, lon:number, lat:number}){
  console.log(attractions)
  this.http.post('http://localhost:5000/post-locations', attractions)
  .subscribe((data) =>{
    console.log(data)
  })
  //observable will only send the data if there is a subscriber...in that case, thats why
  //subrscribe is being called straight away

}


ngOnInit() {
  this.dataService.sendGetRequest().subscribe((data: any)=>{
    this.sendDataByObservable(data)
   })
  }


  onKeyName(event: any) { // without type info
    this.NameUser += event.target.value ;
  }

  onKeyLongitude(event: any) { // without type info
    this.longitude += event.target.value ;
  }

  onKeyLatitude(event: any) { // without type info
    this.latitude += event.target.value ;
  }

}





