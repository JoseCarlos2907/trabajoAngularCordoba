import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { RatingsModel } from '../models/ratings.model';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-sign-up-body',
  templateUrl: './sign-up-body.component.html',
  styleUrls: ['./sign-up-body.component.css']
})
export class SignUpBodyComponent {
  
  comunities: string[] = [
    "Andalucía",
    "Aragón",
    "Asturias",
    "Baleares",
    "Canarias",
    "Cantabria",
    "Castilla-La Mancha",
    "Castilla y León",
    "Cataluña",
    "Comunidad Valenciana",
    "Extremadura",
    "Galicia",
    "La Rioja",
    "Madrid",
    "Murcia",
    "Navarra",
    "País Vasco",
    "Otro"
  ];
  

  signUpForm: FormGroup;
  checkEmailUsers: Array<UserModel> = [];

  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService,
    private _sharedService: SharedService,
    private _loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
    ){
    this.signUpForm = this._fb.group({
      role:['usuario', [Validators.required]],
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      birthdayDate: [null],
      email:['', [Validators.required, Validators.email]],
      phoneNumber:['', [Validators.required]],
      gender:[null],
      password:['', [Validators.required]],
      password2:['',[Validators.required]],
      comunity:[null]
    });
  }

  checkPasswords(){
    return this.signUpForm.value.password === this.signUpForm.value.password2;
  }

  async sendSignUpForm(){
    const formBirthday = this.signUpForm.value.birthdayDate;
    let formattedBirthday: Date | null = null;

    if (formBirthday!=null) {
      let nextDay = new Date(formBirthday);
      nextDay.setDate(formBirthday.getDate() + 1);
      formattedBirthday = nextDay.toISOString().slice(0, 10) as unknown as Date;
    }

    if(this.signUpForm.valid && this.checkPasswords()){
      const userData: UserModel = new UserModel(
        this.signUpForm.value.id,
        this.signUpForm.value.role,
        this.signUpForm.value.firstName,
        this.signUpForm.value.lastName,
        formattedBirthday,
        this.signUpForm.value.email,
        this.signUpForm.value.phoneNumber,
        this.signUpForm.value.gender,
        this.signUpForm.value.comunity,
        this.signUpForm.value.password,
        "CambiarPorTokenCorrespondiente"
      );

      this._loginService.checkEmail(userData.email).subscribe(user => {
        next: {
          this.checkEmailUsers = user;
        }

        error:console.log;
      });

      let existsEmail = this.checkEmailUsers.length > 0 ? false: true;

        if(existsEmail){
            this._sharedService.openSnackBar("Ya existe un usuario con ese email");
        }else{
          this._userService.addUser(userData).subscribe({
            next:console.log,
            
            error:console.log
          });
        }
    }else{
      this._sharedService.openSnackBar("Las contraseñas no coinciden");
    }
  }
}
