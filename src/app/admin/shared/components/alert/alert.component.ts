import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  // delay after them hide the message or alert
  @Input() delay = 5000;

  // create alertSubscription variable to unsubscribe and to avoid memory leaks
  aSub: Subscription;

  public text: string;
  public type = 'success';

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // subscribe on Subject<Alert>
    this.aSub = this.alertService.alert$.subscribe((alert) => {
      console.log('alert: ', alert)
      this.type = alert.type;
      this.text = alert.text;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
