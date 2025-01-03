import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  // Basic SweetAlert
  showAlert(message: string, title: string = 'Notification') {
    Swal.fire(title, message, 'info');
  }

  // Success SweetAlert
  showSuccess(message: string, title: string = 'Success') {
    Swal.fire(title, message, 'success');
  }

  // Error SweetAlert
  showError(message: string, title: string = 'Error') {
    Swal.fire(title, message, 'error');
  }

  // Warning SweetAlert
  showWarning(message: string, title: string = 'Warning') {
    Swal.fire(title, message, 'warning');
  }

  // Custom SweetAlert (with buttons)
  showCustom(message: string, title: string = 'Custom Alert', confirmButtonText: string = 'OK') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      confirmButtonText: confirmButtonText
    });
  }
}
