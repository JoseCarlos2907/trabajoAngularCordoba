import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPlaceComponent } from '../add-edit-place/add-edit-place.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { PlacesService } from '../services/places.service';
import { PlaceModel } from '../models/place.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmDeletePlaceComponent } from '../confirm-delete-place/confirm-delete-place.component';

@Component({
  selector: 'app-places-management-body',
  templateUrl: './places-management-body.component.html',
  styleUrls: ['./places-management-body.component.css']
})
export class PlacesManagementBodyComponent implements OnInit{
  displayedColumns: string[] = ['name','modify','delete'];
  dataSource!: MatTableDataSource<PlaceModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _placesService: PlacesService, private _route: Router, private _cookieService: CookieService){}

  ngOnInit(): void {
    this.getPlacesList();

    let token = this._cookieService.get("token");
    let tokenPayLoad = JSON.parse(atob(token.split('.')[1]));
    let role = tokenPayLoad.role;

    if(role != "admin"){
      this._route.navigate(["main"]);
    }
  } 

  // Abre la ventana para editar un nuevo usuario
  openAddEditPlaceDialog(data?: PlaceModel){
    let dialogRef;

    if(data)
      dialogRef = this._dialog.open(AddEditPlaceComponent, {data});  // Edita el usuario
    else
      dialogRef = this._dialog.open(AddEditPlaceComponent);    // Registra el usuario


    dialogRef.afterClosed().subscribe({   
      next: (val) => {                        // Si recibe true cuando se cierra, se actualiza la lista
        if (val)
          this.getPlacesList();    
      }
    });
  }


  // Muestra el listado de usuarios que hay en el gimnasio
  getPlacesList() {
    this._placesService.getPlaces().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  // Elimina un usuario
  deletePlace(id: string){
    const dialogRef = this._dialog.open(ConfirmDeletePlaceComponent, {
      width: '400px',
      height: '120px',
      data: { mensaje: '¿Deseas eliminar este lugar?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._placesService.deletePlace(id).subscribe({
          next: (val: any) => {
            this.getPlacesList();
            console.log("Lugar eliminado");
          },
          error: console.log
        });
        
      }else {
        console.log("Lugar NO eliminado");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
