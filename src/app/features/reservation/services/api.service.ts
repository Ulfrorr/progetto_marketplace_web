import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Apiservices {
  static getVenues() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }
  getVenues() {
    return this.httpClient.get<{
      id: string;
      name: string;
      position: { coordinates: { lat: Number; lng: Number } }
      availableDates: string;
    }[]>('https://api.nibol.co/v2/app/venues', {
      params: {},
    })
  }
}
