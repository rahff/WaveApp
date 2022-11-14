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

  public async confirmImgAlert(title: string, srcImage?: string): Promise<SweetAlertResult> {
    let html: string = "<div class='p-1'></div>";
    if(srcImage){
      html = `<div class="container-fluid"><img style="width: 100%" src=${srcImage}></div>`;
    }
    return Swal.fire({
      title: `<strong>${title}</strong>`,
      icon: 'info',
      html: html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }
}
