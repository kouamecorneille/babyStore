import { Event } from '@angular/router';

export interface ScrollPositionRestore {
  event: Event;
  positions: { [K: number]: number };
  trigger: 'imperative' | 'popstate';
  idToRestore: number;
}
