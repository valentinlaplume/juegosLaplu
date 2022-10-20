import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  msjEnviado:string = '';
  public formulario!: FormGroup;
  usuario: Usuario = new Usuario();
  public usuario$: Observable<any> = this.auth.afAuth.user;
  
  constructor(public fv: FormBuilder, public auth: AuthService, public encuestaSvc: EncuestaService, public router: Router) {
    this.usuario$.subscribe((result: any) => {
      this.usuario.email = result['email'];
      this.usuario.id = result['uid'];
    });

    this.formulario = fv.group({
      nombre:["", [Validators.required, this.validarNombre]],
      apellido:["", Validators.required],
      edad:["", [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono:["", [Validators.required, Validators.maxLength(10), this.validarTelefono, this.validarTelefonoLenth]],
      pregUno:["", Validators.required],
      pregDos:["", Validators.required],
      pregTres:["", Validators.required]

    });
   }

  ngOnInit(): void {
  }

  enviar(){
    console.log(this.usuario);
    
    console.log(this.formulario);
    
    const nombre = this.formulario.controls['nombre'].value;
    const apellido = this.formulario.controls['apellido'].value;
    const edad = this.formulario.controls['edad'].value;
    const telefono = this.formulario.controls['telefono'].value;
    const pregUno = this.formulario.controls['pregUno'].value;
    const pregDos = this.formulario.controls['pregDos'].value;
    const pregTres = this.formulario.controls['pregTres'].value;
    
    this.encuestaSvc.addEncuesta(this.usuario.id, this.usuario.email, nombre, apellido, edad, telefono, pregUno, pregDos, pregTres);
    this.msjEnviado = 'Tu encuesta fue enviada.';
    setTimeout(() => {
      this.msjEnviado = '';
      this.router.navigate(['home']);
    }, 2000);
  }

  validarNombre(control: AbstractControl){
    const nombre = control.value;
    const tieneEspacio = nombre.includes(' ');
    if(tieneEspacio){
      return { tieneEspacio: true };
    }
    return null;
  }

  validarTelefono(control: AbstractControl){
    const telefono = control.value;
    const telefonoNumerico = parseInt(telefono);
    if(!telefonoNumerico){
      return { telefonoNumerico: true };
    }
    return null;
  }

  validarTelefonoLenth(control: AbstractControl){
    const telefono = control.value;
    const telefonoLength = telefono.length;
    
    if(telefonoLength > 10){
      return { telefonoLength: true };
    }
    return null;
  }

}
