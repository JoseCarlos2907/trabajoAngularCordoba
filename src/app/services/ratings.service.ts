import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingsModel } from '../models/ratings.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  urlBD: string = "http://localhost:3000/ratings";

  constructor(private _http: HttpClient) { }

  getAllRatingsByPlace(placeId: string): Observable<RatingsModel[]>{
    return this._http.get<RatingsModel[]>(`${this.urlBD}?idPlace=${placeId}`);
  }

  getRatingByPlaceAndUserId(placeId: string, userId: string): Observable<RatingsModel[]>{
    return this._http.get<RatingsModel[]>(`${this.urlBD}?idPlace=${placeId}&idUser=${userId}`);
  }

  addRating(rating: RatingsModel){
    return this._http.post(`${this.urlBD}`, rating);
  }
}
