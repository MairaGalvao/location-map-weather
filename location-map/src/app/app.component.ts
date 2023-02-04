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
  <label>Name</label>
  <input type="text" name="name" ngModel>

  <label>Desc</label>
  <input type="text" name="lon" ngModel>

  <label>Price</label>
  <input type="text" name="lat" ngModel>

  <input type="submit" value="add attraction">

  </form>
  </div>

  <div>
  <h3>All attractions</h3>
  <table id="products">
  <tr>
  <th>Name</th>
  <th>Loc..</th>
  </tr>
  </table>
  </div>

  `
})
export class AppComponent implements OnInit {
  locations: Subject<any> = new Subject();

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


}


