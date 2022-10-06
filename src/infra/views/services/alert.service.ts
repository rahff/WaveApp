import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


  public errorAlert(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: message,
      icon: "error",
      timer: 2500
    })
  }
}
