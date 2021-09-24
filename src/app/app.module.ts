import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './features/leaflet-simple-demo/components/leaflet-map.component';
import { LeafletSimpleDemoComponent } from './features/leaflet-simple-demo/leaflet-simple-demo.component';
import { ReservationListComponent } from './features/reservation/components/reservation-list.component';
import { ReservationMapComponent } from './features/reservation/components/reservation-map.component';
import { ReservationModalComponent } from './features/reservation/components/reservation-modal.component';
import { SearchPipe } from './features/reservation/pipes/search.pipe';
import { ReservationComponent } from './features/reservation/reservation.component';
@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    ReservationMapComponent,
    SearchPipe,
    ReservationModalComponent,
    ReservationComponent,
    ReservationListComponent,
    LeafletSimpleDemoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatTabsModule,
    MatRippleModule,
    MatListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
