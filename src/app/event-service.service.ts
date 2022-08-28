import { Injectable } from '@angular/core';
import { Observable, Observer, Subscriber } from 'rxjs';
import { InotifAlert } from './notification/notification';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  observer: Observer<InotifAlert>;
  observable = new Observable<InotifAlert>(
    (observer: Subscriber<InotifAlert>) => {
      this.observer = observer;
    }
  );

  constructor() {}

  displayAlert(alertBody: string, alertType: string) {
    this.observer.next({ body: alertBody, type: alertType, show: true });
  }
}
