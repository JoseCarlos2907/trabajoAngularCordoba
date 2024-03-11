import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlaceModel } from '../models/place.model'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlacesService } from '../services/places.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-add-edit-place',
  templateUrl: './add-edit-place.component.html',
  styleUrls: ['./add-edit-place.component.css']
})
export class AddEditPlaceComponent implements OnInit {

  addEditForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _placesService: PlacesService,
    private _sharedService: SharedService,
    private _dialogRef: MatDialogRef<AddEditPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaceModel) 
    {
    this.addEditForm = this._fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      smallParagraph: ['', [Validators.required]],
      allParagraphs: ['', [Validators.required]],
      rating: [[]],
      image0: [this.data == null? '' : this.data.images[0], [Validators.required]],
      image1: [this.data == null? '' : this.data.images[1], [Validators.required]],
      image2: [this.data == null? '' : this.data.images[2], [Validators.required]],
      image3: [this.data == null? '' : this.data.images[3], [Validators.required]],
      image4: [this.data == null? '' : this.data.images[4], [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.addEditForm.patchValue(this.data);
  }

  submitAddEditForm()
  {
    if(this.addEditForm.valid)
    {
      let placeData: PlaceModel = new PlaceModel(  
        this.addEditForm.value.id,
        this.addEditForm.value.name,
        this.addEditForm.value.smallParagraph,
        this.addEditForm.value.allParagraphs,
        this.addEditForm.value.rating,
        [this.addEditForm.value.image0, this.addEditForm.value.image1 ,this.addEditForm.value.image2, this.addEditForm.value.image3, this.addEditForm.value.image4],
      );
      

      if(this.data && this.data.id !== undefined)
      {
        this._placesService.editPlace(this.data.id, placeData).subscribe({
          next: (val: any) => {
            this._sharedService.openSnackBar("Lugar modificado");
            this._dialogRef.close(true);
          },
          error: console.log
        });
      } else {
        this._placesService.addPlace(placeData).subscribe({
          next: (val: any) => {
            this._sharedService.openSnackBar("Lugar añadido");
            this._dialogRef.close(true);
          },
          error: console.log
        });
      } 
    }
  }  
}