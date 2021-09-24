import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Apiservices {
  constructor(private httpClient: HttpClient) { }
  getVenues() {
    return this.httpClient.get<[]>('https://api-staging.nibol.co/v2/app/venues', { params: { mode: 'shared' } }
    )
  }
}
