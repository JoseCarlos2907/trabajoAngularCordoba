import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_API = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }  

  loginUser(email: string, password: string): Observable<{ role: string, token: string } | {}> {
    return this._http.get<UserModel[]>(`${this.URL_API}/users`).pipe(
      map(data => {
        let validUser = data.find((user: UserModel) => user.email === email && JSON.parse(atob(user.token.split('.')[1])).password === password);

        return validUser ? { role: validUser.role, token: validUser.token } : {};
      })
    );
  }

  checkEmail(email: string): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${this.URL_API}/users?email=${email}`);
  }
}
