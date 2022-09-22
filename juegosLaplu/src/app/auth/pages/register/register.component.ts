import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { stringLength } from '@firebase/util';
import { Usuario } from 'src/app/shared/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email!:string;
  public password!:string;
  public passwordConfirm!:string;
  public msjError: string = '';
  
  public formulario: FormGroup;

  constructor(
    private authSvc: AuthService,
    public router: Router
  ) { 
    this.formulario = new FormGroup({
      email : new FormControl(),
      password : new FormControl(),
      passwordConfirm : new FormControl(),
      // displayName : new FormControl()
    })
  }

  ngOnInit(): void {}

  async onSubmit()
  {
    console.log(this.formulario.value);

    if(this.formulario.value.email == null) { this.msjError = 'Ingrese correo electrónico.'; return } else { this.setearMsjError(); }

    this.msjError = this.ValidatePassword(this.formulario.value.password, this.formulario.value.passwordConfirm);
    if(this.msjError != '') { return; }

    const user = {
      email : this.formulario.value.email,
      password : this.formulario.value.password,
      // displayName : this.formulario.value.displayName
    }

    const arg = {email: user.email, password: user.password};

    const res = await this.authSvc.register(arg);

    if(this.authSvc.msjError != "")
      this.msjError = this.authSvc.msjError;
    else
    {
      this.setearMsjError();
      this.router.navigate(['home']); 
    }
  }

  private setearMsjError(){ this.msjError = ''; }



  private ValidatePassword(password:string, passwordConfirm:string):string{
    if(password == null) { return 'Ingrese contraseña.'; }
    if(passwordConfirm == null) { return 'Ingrese confirmación de contraseña.'; }

    let lengthPassword = stringLength(password);
    let lengthConfirmPassword = stringLength(passwordConfirm);
    
    if(lengthPassword < 6) { return 'La contraseña debe contener al menos 6 caracteres.'; }
    
    if(!lengthConfirmPassword) { return 'Ingrese confirmación de contraseña.'; }
    if(password != passwordConfirm) { return 'Las contraseñas no coinciden.'; }

    return '';
  }

  // private async addUser(user:any){
  //   const response = await this.authSvc.addUser(user);
  //   console.log(response);
  //   return response;
  // }

}
