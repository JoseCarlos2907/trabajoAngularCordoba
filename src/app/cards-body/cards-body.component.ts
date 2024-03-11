import { Component, OnInit } from '@angular/core';
import { PlaceModel } from '../models/place.model';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-cards-body',
  templateUrl: './cards-body.component.html',
  styleUrls: ['./cards-body.component.css']
})
export class CardsBodyComponent implements OnInit{

  places: any[] = [];
  
  constructor(private _placesService: PlacesService){ }

  ngOnInit(): void {
      this._placesService.getPlaces().subscribe(places => {
        next: this.places = places;

        error:console.log;
      });
  }

  getRatingAverage(place: PlaceModel){
    let ratings = place.rating.map((rating)=>parseInt(rating));
    let add = ratings.reduce((total, aux) => total + (aux), 0);
    add /= ratings.length;
    return add.toFixed(2);
  }
}
