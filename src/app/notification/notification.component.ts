import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InotifAlert } from './notification';
import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('showAlert', [
      transition(':enter', [
        style({ opacity: 0, right: '-350px' }),
        animate('300ms', style({ opacity: 1, right: '50px' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, right: '-350px' })),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  @Input() event!: InotifAlert;
  @Output() eventToDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.close(this.event);
    }, 4000);
  }

  close(event: InotifAlert) {
    event.show = false;
  }

  animationDone(event: AnimationEvent) {
    if (event.toState) {
      this.eventToDelete.emit();
    }
  }
}
