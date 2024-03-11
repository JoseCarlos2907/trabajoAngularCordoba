import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  loggedUserEmail: string = "";
  loggedUserFirstName: string = "";
  isAdmin: boolean = false;

  constructor(private _cookieService: CookieService, private _route: Router, private _sharedService: SharedService) { }

  ngOnInit(): void {
    this.getLoggedEmail();
  }

  getLoggedEmail(): boolean{
    let token: string = this._cookieService.get("token");

    if(!token){
      return false;
    }else{
      let tokenPayLoad = JSON.parse(atob(token.split('.')[1]));
      this.loggedUserEmail = tokenPayLoad.email;
      this.loggedUserFirstName = tokenPayLoad.firstName;

      if(tokenPayLoad.role === "admin"){
        this.isAdmin = true;
        
        return true;
      }else if(tokenPayLoad.role === "usuario"){
        this.isAdmin = false;
        
        return true;
      }
    }
    return false;
  }

  logout(){
    this._cookieService.delete("token");
    this._route.navigate(["/main"]);
    this._sharedService.openSnackBar("La sesión se ha cerrado correctamente.");
  }
}
