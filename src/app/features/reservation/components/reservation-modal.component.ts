import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Site, Time } from '../../../model/site';
import { Apiservices } from '../services/api.service';

@Component({
  selector: 'fb-reservation-modal',
  template: `
    <div>
      <h2 mat-dialog-title>Book an appointment in "{{ data.name }}"</h2>

      <mat-dialog-content class="mat-typography" style="min-height: 450px">
        <!--Date picker-->
        <mat-tab-group [(selectedIndex)]="tabIndex">
          <mat-tab label="Description">
            <img
              [src]="data.picture"
              style="max-width: 100%; max-height: 100%"
            />
            <p>{{ description }}</p>
            <div style="display: flex; flex-direction: row">
              <star-rating
                *ngIf="rating$ | async as rating"
                [value]="rating"
                [totalstars]="5"
                [checkedcolor]="'red'"
                [uncheckedcolor]="'gray'"
                [size]="'24px'"
                [readonly]="true"
              ></star-rating>
              <span style="padding: 0 0 0 10px">{{ ratingCount }}</span>
            </div>
          </mat-tab>

          <mat-tab [disabled]="availableDates.length === 0" label="Date">
            <mat-calendar
              [selected]="selectedDate"
              [dateFilter]="filterByAvailableDates"
              (selectedChange)="chooseDateHandler($event)"
            ></mat-calendar>
          </mat-tab>

          <!--Time Picker-->
          <mat-tab label="Time" [disabled]="!selectedDate">
            <mat-list>
              <!--List of available times-->
              <mat-list-item
                mat-ripple
                *ngFor="let time of availableTimes"
                [mat-dialog-close]="closeModal(time)"
              >
                <mat-icon>timer</mat-icon> {{ time }}
                <mat-divider></mat-divider>
              </mat-list-item>
            </mat-list>
          </mat-tab>
        </mat-tab-group>
      </mat-dialog-content>
    </div>
  `,
})
export class ReservationModalComponent implements OnInit {
  tabIndex: number = 0; // 0: tab date | 1: tab time
  selectedDate: Date | null = null; // calendar selected day
  availableDates: Date[] = []; // available dates for a site
  availableTimes: Time[] = []; // aviilable times for a date
  description = '';
  rating$ = new BehaviorSubject(0);
  ratingCount = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Site,
    private readonly apiService: Apiservices
  ) {
    // available dates for the opened site
    this.availableDates = (data.availableDates || []).map((seat) => {
      return new Date(seat.date);
    });
  }

  ngOnInit(): void {
    this.apiService.getVenue(this.data.id).subscribe((venue) => {
      this.description = venue.description;
      this.rating$.next(venue.ratings.average);
      this.ratingCount = venue.ratings.count;
    });
  }

  /**
   * Display available dates
   */
  filterByAvailableDates = (d: Date | null): boolean => {
    return !!this.availableDates.find((x) => x.getTime() === d?.getTime());
  };

  /**
   * Invoked when user selects a day from date picker
   */
  chooseDateHandler(selectedDate: Date | null) {
    // go to Time Tab
    this.tabIndex = 2;
    // save the selected date
    this.selectedDate = selectedDate;
    // set available times for selected day
    this.availableTimes =
      this.data.availableDates.find((seat) => {
        return (
          this.selectedDate &&
          new Date(seat.date).getTime() ===
            new Date(this.selectedDate).getTime()
        );
      })?.availableTimes || [];
  }

  /**
   * Invoked when user selects a time
   * NOTE: this operation confirms the reservation
   */
  closeModal(time: Time) {
    return {
      selectedDate: this.selectedDate,
      selectedTime: time,
      site: this.data,
    };
  }
}
