export interface Site {
  id: string;
  name: string;
  coords: Coords;
  availableDates: Seat[];
  picture: string;
}

export interface Seat {
  date: string; // "12/1/2020",
  availableTimes: Time[];
}
export type Coords = [number, number];
export type Time = [string, string];
