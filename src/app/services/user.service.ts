import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "http://localhost:3000/users";

  constructor(private _http: HttpClient) { }

  addUser(user: UserModel): Observable<UserModel> {
    return this._http.post<UserModel>(`${this.URL}`, user);
  }

  getUsersList(): Observable<UserModel[]>{
    return this._http.get<UserModel[]>(`${this.URL}`);
  }

  editUser(id:number, user: UserModel): Observable<UserModel>{
    return this._http.put<UserModel>(`${this.URL}/${id}`, user);
  }

  deleteUser(id: any): Observable<any>{
    return this._http.delete(`${this.URL}/${id}`);
  }
}
