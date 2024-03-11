import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html',
  styleUrls: ['./login-body.component.css']
})
export class LoginBodyComponent{

  loginForm: FormGroup;
  email: string = "";
  password: string = "";

  constructor(private _fb: FormBuilder, private _loginService: LoginService, private _cookieService: CookieService, private _route: Router, private _sharedService: SharedService) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser(){
    if(this.loginForm.value.email == "" || this.loginForm.value.password == ""){
      console.log("Debe rellenar ambos campos para poder iniciar sesión");
      this._sharedService.openSnackBar("Debe rellenar ambos campos para poder iniciar sesión");
    }else{
      let loginEmail: string = this.loginForm.value.email;
      let loginPassword: string = this.loginForm.value.password;
  
      let route: string = "/main"
  
      this._loginService.loginUser(loginEmail, loginPassword).subscribe({
        next: (result: { role: string, token: string } | {}) => {
          if ('role' in result && 'token' in result) {
            
            this._cookieService.set('token', result.token);
  
             if (result.role === 'admin')
             route = '/manage-places';
            
             this._route.navigate([route]);
          } else {
            console.log('Los datos introducidos son incorrectos o no existen');
            this._sharedService.openSnackBar("Los datos introducidos son incorrectos o no existen");
          }
        },
        error: console.log
      });
    }
  }
}
