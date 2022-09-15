import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Auth } from '@angular/fire/auth';


import { UserService } from 'src/app/services/user.service';

import { stringLength } from '@firebase/util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email:string;
  public password:string;
  public passwordConfirm:string;
  public textValidPassword:string;
  

  constructor(
    private userService: UserService
  ) { 
    this.email = '';
    this.password = '';
    this.passwordConfirm = '';
    this.textValidPassword = 'Ingrese';
  }

  ngOnInit(): void {}

  register()
  {
    let rValidatePassword = this.ValidatePassword();
    console.log(rValidatePassword);
    if(rValidatePassword != '') { this.textValidPassword = rValidatePassword; alert(rValidatePassword); return; }

    console.log('hola');

    this.textValidPassword = '';

    const arg = {email: this.email, password: this.password};
    this.userService.register(arg)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

  private ValidatePassword():string{
    let lengthPassword = stringLength(this.password);
    let lengthConfirmPassword = stringLength(this.passwordConfirm);
    
    if(!lengthPassword) { return 'Ingrese contraseña'; }
    if(lengthPassword < 6) { return 'La contraseña debe contener al menos 6 caracteres'; }
    
    if(!lengthConfirmPassword) { return 'Ingrese confirmacion de contraseña'; }
    console.log(this.password)
    console.log(this.passwordConfirm)
    console.log(this.password != this.passwordConfirm)
    if(this.password != this.passwordConfirm) { return 'Las contraseñas no coinciden'; }

    return '';
  }


}
