import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../services/places.service';
import { PlaceModel } from '../models/place.model';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingsService } from '../services/ratings.service';
import { RatingsModel } from '../models/ratings.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-place-details-body',
  templateUrl: './place-details-body.component.html',
  styleUrls: ['./place-details-body.component.css']
})
export class PlaceDetailsBodyComponent implements OnInit{
  ratings = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5"
  ]

  id:any;
  place: any;
  selectedImage: string = "";
  
  allRatings: Array<RatingsModel> = []
  commentsOfUser: Array<RatingsModel> = [];
  loggedUserID: string = "";
  loggedIn: boolean = false;

  commentForm: FormGroup;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _placeService: PlacesService,
    private _ratingService: RatingsService,
    private _cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public data: RatingsModel, 
    private _fb: FormBuilder) { 
    this.commentForm = this._fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.id = this._route.snapshot.paramMap.get("id");
    this._placeService.getPlace(this.id).subscribe(place => {
      next: {
        this.place = place;
        this.selectedImage = this.place.images[0];
      }

      error: console.log;
    });

    this._ratingService.getAllRatingsByPlace(this.id).subscribe(rating => {
      next: {
        this.allRatings = rating;
      }

      error: console.log;
    });


    let token = this._cookieService.get("token");
    let tokenPayLoad = JSON.parse(atob(token.split('.')[1]));
    let role = tokenPayLoad.role;
    this.loggedUserID = tokenPayLoad.id;

    if(!token){
      this.loggedIn = false;
    }else if(role == "admin"){
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }

    this._ratingService.getRatingByPlaceAndUserId(this.id, this.loggedUserID).subscribe(comment => {
      next: {
        this.commentsOfUser = comment;
      }

      error: console.log
    });
  }

  changeMainImage(pos: number){
    this.selectedImage = this.place.images[pos]; 
  }

  getRatingAverage(){
    let ratings = this.allRatings.map((rating)=>rating.rating);
    let add = ratings.reduce((total, aux) => total + parseInt(aux), 0);
    add /= ratings.length;
    return add.toFixed(2);
  }

  submitCommentForm(){
    if(this.commentForm.valid){
      
      let ratingData: RatingsModel = new RatingsModel(
        this.commentForm.value.id,
        this.loggedUserID,
        this.id,
        this.commentForm.value.rating,
        this.commentForm.value.comment,
      );
      
        this.place.rating.push(this.commentForm.value.rating)
        this._placeService.editPlace(this.place.id,this.place).subscribe({
          next:console.log,
          
          error:console.log
        });

        this._ratingService.addRating(ratingData).subscribe({
          next:console.log,
          
          error:console.log
        });
    }
  }
}
