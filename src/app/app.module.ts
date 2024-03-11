import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';
import { CardsBodyComponent } from './cards-body/cards-body.component';
import { LoginBodyComponent } from './login-body/login-body.component';
import { PlaceDetailsBodyComponent } from './place-details-body/place-details-body.component';
import { PlacesManagementBodyComponent } from './places-management-body/places-management-body.component';
import { SignUpBodyComponent } from './sign-up-body/sign-up-body.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDeletePlaceComponent } from './confirm-delete-place/confirm-delete-place.component';
import { FooterComponent } from './footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddEditPlaceComponent,
    CardsBodyComponent,
    LoginBodyComponent,
    PlaceDetailsBodyComponent,
    PlacesManagementBodyComponent,
    SignUpBodyComponent,
    ConfirmDeletePlaceComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue:{}},
    {provide: MatDialogRef, useValue:{}},
    // {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true},
    CookieService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

