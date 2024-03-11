import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsBodyComponent } from './cards-body/cards-body.component';
import { PlaceDetailsBodyComponent } from './place-details-body/place-details-body.component';
import { SignUpBodyComponent } from './sign-up-body/sign-up-body.component';
import { LoginBodyComponent } from './login-body/login-body.component';
import { PlacesManagementBodyComponent } from './places-management-body/places-management-body.component';

const routes: Routes = [
  {path:'main', component: CardsBodyComponent},
  {path:'sign-up', component: SignUpBodyComponent},
  {path:'login', component: LoginBodyComponent},
  {path:'manage-places', component: PlacesManagementBodyComponent},
  {path:'places/:id', component: PlaceDetailsBodyComponent},
  {path:'', redirectTo: 'main', pathMatch:'full'},
  {path:'**', redirectTo: 'main', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
