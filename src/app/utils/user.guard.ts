import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {

  constructor(private _cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      let token = this._cookieService.get('token');

      if (!token) {
        this.router.navigate(['/login'])    
        return false;
      } else
      {
        let tokenPayload = JSON.parse(atob(token.split('.')[1]));
        let role = tokenPayload.role;
        if (role) {
          if ( role !== "admin" && route.routeConfig?.path === 'manage-places')
            return false;
          else
            return true;
        }
        return false;
      }  
  }
}
