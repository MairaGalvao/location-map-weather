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

  <!-- <app-map [locations] ="locations"></app-map> -->
  <!-- <app-attractions>  </app-attractions> -->

<!-- <app-attractions>  </app-attractions> -->

<div class="container">
<form class="form" #attractionsForm="ngForm" (ngSubmit)="onAttractionCreate(attractionsForm.value)">


            <input id="name" class="input" placeholder="name" type="text" name="name" ngModel (keyup.enter)="onKeyName($event)">



 <input type="text"  placeholder="Longitude" class="input" name="lon" ngModel (keyup.enter)="onKeyLongitude($event)">


 <input type="text" class="input" placeholder="Latitude" name="lat" ngModel (keyup.enter)="onKeyLatitude($event)">

            <input type="submit" class="add" value="Add Attraction" />
            </form>
        <div class="tasks">
        <h3>All attractions</h3>
 <div id="users">
 <div>


   Name: <div id='eachAttraction'>
    <h6>{{NameUser}}</h6>
   <div class="delete-all">Delete</div>
   </div>
</div>
Longitute: <div id='eachAttraction'>
    <h6>{{longitude}}</h6>
   <div class="delete-all">Delete</div>
   </div>
</div>


Latitude: <div id='eachAttraction'>
    <h6>{{latitude}}</h6>
   <div class="delete-all">Delete</div>
   </div>
</div>


</div>


 `
})

export class AppComponent implements OnInit {
  locations: Subject<any> = new Subject();
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





