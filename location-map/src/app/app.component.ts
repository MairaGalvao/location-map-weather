import { Component, OnInit, } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  template: `

  <app-map [locations] ="locations"></app-map>`
})
export class AppComponent implements OnInit {
  locations: Subject<any> = new Subject();

  constructor (private dataService: DataService)
{}

sendDataByObservable(data: any) {
  console.log("sending data", data)
  this.locations.next(data)
}


//  locations = new Observable((observer) => {
//   this.dataService.sendGetRequest().subscribe((data: any)=>{
//     console.log(data);
//     observer.next(data)
//   })
//   return {
//     unsubscribe() {
//     }
//   };
// });


ngOnInit() {
  this.dataService.sendGetRequest().subscribe((data: any)=>{
    // this.locations.set(data)
    this.sendDataByObservable(data)
   })
  }


}



  // this.dataService.sendGetRequest().subscribe((data: any)=>{
  //   console.log(data);
  // })}}
  // onSave(){
  //   const title = this.http.get<any[]>("/");
  //   console.log(title)


  // }

