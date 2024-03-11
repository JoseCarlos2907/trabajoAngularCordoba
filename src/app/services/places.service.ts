import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceModel } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private _http: HttpClient ) { }

  private UrlBD = 'http://localhost:3000/places';

  getPlaces(): Observable<PlaceModel[]>{
    return this._http.get<PlaceModel[]>(this.UrlBD);
  }

  getPlace(id: string): Observable<PlaceModel[]>{
    return this._http.get<PlaceModel[]>(`${this.UrlBD}/${id}`);
  }

  deletePlace(id: string){
    return this._http.delete(`${this.UrlBD}/${id}`);
  }

  editPlace(id: string, data: PlaceModel): Observable<PlaceModel>{
    return this._http.put<PlaceModel>(`${this.UrlBD}/${id}`,data);
  }

  addPlace(data: PlaceModel): Observable<PlaceModel>{
    return this._http.post<PlaceModel>(`${this.UrlBD}`,data);
  }
}
