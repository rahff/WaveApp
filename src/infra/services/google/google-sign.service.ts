import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/infra/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignService {

  constructor(private http: HttpClient) { }

  public getGoogleCredential(): Observable<IUser> {
    return of({id: "2545454541", username: "Rahff", email: "raphaelandrey99@gmail.com", password: "Mot2$asse", isAuth: true, token: "googleToken"})
  }
}
