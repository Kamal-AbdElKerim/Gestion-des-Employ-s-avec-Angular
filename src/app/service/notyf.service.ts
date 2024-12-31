import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
  providedIn: 'root',
})
export class NotyfService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 3000,
      position: { x: 'right', y: 'top' },
      ripple: true,  // Optional: adds a ripple effect to the notification
      dismissible: true,

    });
  }

  success(message: string) {
    this.notyf.success({
      message: message,
      className: 'notyf-wide'

    });
  }

  error(message: string) {
    this.notyf.error({
      message: message,
      className: 'notyf-wide'
    });
  }


}
