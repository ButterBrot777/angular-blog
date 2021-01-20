import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// create type with only 3 values
export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: string
  text: string
}

@Injectable()
export class AlertService {
  // init stream data type subject
  public alert$ = new Subject<Alert>();

  // dispatch for alert new object which shows a message
  success(text: string) {
    // send data {type: 'success', text}
    return this.alert$.next({type: 'success', text});
  }
  warning(text: string) {
    return this.alert$.next({type: 'warning', text});
  }
  danger(text: string) {
    return this.alert$.next({type: 'danger', text});
  }
}