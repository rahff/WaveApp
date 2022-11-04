import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public errorAlert(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: true,
    })
  }

  public confirmationAlert(message?: string, confirmButtonText?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Are you sure?',
      text: message || "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText || 'Yes, delete it!'
    })
  }

  public successAlert(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
    
  }
}
