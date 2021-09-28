import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Coords, Site, Time } from '../../../model/site';
import { ReservationModalComponent } from '../components/reservation-modal.component';
import { Apiservices } from './api.service';


@Injectable({ providedIn: 'root' })
export class ReservationService {
  sites$ = new BehaviorSubject<Site[]>([]);
  currentSite$ = new BehaviorSubject<Site | null>(null);

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private apiservices: Apiservices) { }

  /**
   * Load all Sites (locations)
   */
  getSites(): void {
    this.apiservices
      .getVenues()
      .pipe(
        map((venuesFromBackend) => {
          return venuesFromBackend.map((venuesFromBackend) => ({
            id: Date.now(),
            name: venuesFromBackend.name,
            coords: [
              venuesFromBackend.position.coordinates.lat,
              venuesFromBackend.position.coordinates.lng,
            ] as Coords,
            availableDates: [],
          }))
        })
      )
      .subscribe((venuesFromBackend: any) => {
        this.sites$.next(venuesFromBackend);
      });
  }
  /**
   * Select a site
   * It opens a modal when a site is selected.
   * @param site
   */
  setSelectedSiteHandler(site: Site | null) {
    this.currentSite$.next(site);

    if (site && site.availableDates.length) {
      this.openReservationModal(site);
    }
  }

  /**
   * Open the reservation modal after clicking markers
   */
  openReservationModal(site: Site | null): void {
    const dialogRef = this.dialog.open(
      ReservationModalComponent,
      { data: site }
    );

    // Display snackbar after the selection
    dialogRef.afterClosed()
      .pipe(filter(selection => !!selection))
      .subscribe((selection: { selectedDate: Date, selectedTime: Time, site: Site }) => {
        this.save(selection);
      });
  }

  /**
   * Save the reservation
   * @param selection
   */
  save(selection: { selectedDate: Date, selectedTime: Time, site: Site }) {
    this._snackBar.open(
      `⭐️ ${selection.selectedDate.toDateString()} - ${selection.selectedTime}`, selection.site.name,
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'snack'
      }
    );
  }

}

