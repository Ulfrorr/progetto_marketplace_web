import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { Coords, Site } from '../../../model/site';

const mapTheme = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark';

const IconWhite = L.icon({
  iconUrl: './assets/marker_white.png',
  iconSize: [34, 44],
  iconAnchor: [17, 42],
});

const IconRed = L.icon({
  iconUrl: './assets/marker_red.png',
  iconSize: [34, 44],
  iconAnchor: [17, 42],
});

@Component({
  selector: 'fb-reservation-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div #host style="width: 100%; height: 100%"></div> `,
})
export class ReservationMapComponent implements OnChanges {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLInputElement>;
  @Input() sites: Site[] | null = null;
  @Input() currentSite: Coords | undefined;
  @Output() markerClick = new EventEmitter<Site>();
  leafletMap!: L.Map;

  /**
   * When sites are
   */
  ngOnChanges(changes: SimpleChanges): void {
    // First time ==> init map
    if (changes.sites && changes.sites.isFirstChange()) {
      this.initMap();
    }

    // when currentSite changes
    if (changes.currentSite?.currentValue) {
      // Pan To current Site
      this.leafletMap.setView(changes.currentSite.currentValue, 11);
    } else {
      // view all markers when no site is selected
      this.fitBounds();
    }
  }

  /**
   * Init Leaflet Map
   */
  initMap(): void {
    this.leafletMap = L.map(this.host.nativeElement);
    L.tileLayer(mapTheme + '/{z}/{x}/{y}{r}.png').addTo(this.leafletMap);
    this.drawMarkers();
  }

  /**
   * Draw all markers on map
   */
  drawMarkers(): void {
    this.sites?.forEach((site) => {
      L.marker(site.coords, {
        icon: site.availableDates.length ? IconRed : IconWhite,
      })
        .bindTooltip(
          `${site.name}:
           ${
             site.availableDates.length
               ? site.availableDates.length + ' No Temporary Suspended'
               : 'Temporary Suspended'
           }`
        )
        .on('click', () => {
          this.markerClick.emit(site);
        })
        .addTo(this.leafletMap);
    });
  }

  /**
   * Fit map to display all markers
   */
  fitBounds(): void {
    const coords = this.sites?.map((m) => m.coords);
    if (coords && coords.length > 0) {
      this.leafletMap.fitBounds(coords, {
        padding: [10, 10],
      });
    }
    this.drawMarkers();
  }
}
