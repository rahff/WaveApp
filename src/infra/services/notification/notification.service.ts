import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ICalendarNotification } from 'src/infra/models/ICalendarNotification';




@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  public saveNotification(notification: ICalendarNotification): void {

  }
}
