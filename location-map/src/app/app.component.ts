import { Component, OnInit, } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import {MatButton} from '@angular/material';


@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  template: `

  <!-- <app-attractions>  </app-attractions> -->

<!-- <app-attractions>  </app-attractions> -->

<div class="container">
<h3 id='title'>Attractions manager</h3>

<form novalidate class="form" #attractionsForm="ngForm" (ngSubmit)="onAttractionCreate(attractionsForm.value)">





            <input id="name" class="input" placeholder="Location" type="text" name="name" ngModel (keyup.enter)="onKeyName($event)">



 <input type="text"  placeholder="Longitude" class="input" name="lon" ngModel (keyup.enter)="onKeyLongitude($event)">


 <input type="text" class="input" placeholder="Latitude" name="lat" ngModel (keyup.enter)="onKeyLatitude($event)">

            <input type="submit" class="add" value="Add Attraction" />
            </form>
        <div class="tasks">
        <h3 id='title-user'>All attractions</h3>

        <table id="customers" >
  <tr className='table-attractions'>
    <th>Location</th>
    <th>Longitude</th>
    <th>Latitude</th>
    <th>Delete</th>

  </tr>


  <tr *ngFor="let obj of locationData">

    <td>{{obj.name}} </td>
    <td>{{obj.lon}}</td>
    <td>{{obj.lat}}</td>    <td ><button>Delete</button></td>

  </tr>

</table>


</div>

<app-map [locations] ="locations"></app-map>

 `
})

export class AppComponent implements OnInit {
  locations: Subject<any> = new Subject();
  locationData: any
  NameUser = '';
  longitude = '';
  latitude = '';

  checked = false;


  constructor (private dataService: DataService,
    public http: HttpClient, private _sanitizer: DomSanitizer
  )

{}






sendDataByObservable(data: any) {
  console.log("sending data", data)
  this.locations.next(data)
}

onAttractionCreate(attractions:{name:string, lon:number, lat:number}){
  console.log(attractions, 'my atrac')
  this.http.post('http://localhost:5000/post-locations', attractions)
  .subscribe((data) =>{
    console.log(data)
    return data
  })
  //observable will only send the data if there is a subscriber...in that case, thats why
  //subrscribe is being called straight away

}


ngOnInit() {
  this.dataService.sendGetRequest().subscribe((data: any)=>{
    this.sendDataByObservable(data)
    this.locationData = data
    //todo!!!!
   })
  }


  onKeyName(event: any) { // without type info
    this.NameUser += event.target.value ;
  }

  onKeyLatitude(event: any) { // without type info
    this.latitude += event.target.value ;
  }

  onKeyLongitude(event: any) { // without type info
    this.longitude += event.target.value ;
  }

}





