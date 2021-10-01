import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Apiservices {
  static getVenues() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}
  getVenues() {
    return this.httpClient.get<
      {
        id: string;
        name: string;
        position: { coordinates: { lat: Number; lng: Number } };
        pictures: string[];
        temporary_suspended: boolean;
      }[]
    >('https://api.nibol.co/v2/app/venues');
  }

  getVenue(id: string) {
    return this.httpClient.get<{
      id: string;
      name: string;
      position: { coordinates: { lat: Number; lng: Number } };
      pictures: string[];
      temporary_suspended: boolean;
      description: string;
      ratings: { average: number; count: number };
    }>(`https://api.nibol.co/v2/app/venues/${id}`);
  }
}
