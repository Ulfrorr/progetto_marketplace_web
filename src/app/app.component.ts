import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Apiservices } from './features/reservation/services/api.service';

@Component({
  selector: 'fb-root',
  template: `
    <!--Simple Demo: leaflet component-->
    <!--<fb-leaflet-simple-demo></fb-leaflet-simple-demo>-->

    <!--Reservation Demo-->
    <fb-reservation></fb-reservation>

    {{ venues$|async|json}}
  `,

})
export class AppComponent implements OnInit {
  venues$ = new BehaviorSubject<any[]>([]);

  constructor(private readonly Apiservices: Apiservices) { }

  ngOnInit(): void {
    this.Apiservices.getVenues().subscribe((venuesFromapi) => {
      return this.venues$.next(venuesFromapi);
    });
  }
}
