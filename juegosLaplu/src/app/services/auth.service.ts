// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import {  
//   Auth, 
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from '@angular/fire/auth';


// //---------------------------------------
// import { UsuarioService } from "./usuario.service";
// import { Usuario } from "../shared/usuario";

// import { 
//   Firestore, 
//   collection, 
//   addDoc  } from '@angular/fire/firestore';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public usuario:any;

//   constructor(
//     private auth:Auth,
//     private firestore: Firestore,
//     public usuarioSvc: UsuarioService
//     ) 
//   {
//     console.log(this.auth.currentUser);
//   }

//   public async register({email, password}: any){
//      return createUserWithEmailAndPassword(this.auth, email, password);
//   }

//   public async login({email, password}: any){
//     const user = await signInWithEmailAndPassword(this.auth, email, password)
//     .then((result) => {
//       if(result.user)
//       {
//         this.usuario = new Usuario();
//         this.usuario.id = result.user?.uid;
//         this.usuario.email = result.user?.email;
//         console.log(this.usuario);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log(err.code);
//       console.log(this.getError(err.code));
//     });
//     return user;
//   }

//   private getError(msj:string):string{
//     switch(msj){
//       case 'auth/email-already-in-use':
//         return "El correo electrónico ingresado ya está en uso."
//       break;
//       case 'auth/invalid-email':
//         return "El formato del correo electrónico ingresado no es correcto.";
//       break;
//     }

//     return '';
//   }

//   // public addUser(item: any){
//   //   const userRef = collection(this.firestore,'users');
//   //   return addDoc(userRef, item);
//   // }

//   async getUserLogged() {
//     return onAuthStateChanged(this.auth, (usuario) => {
//       if(usuario){ console.log('getUserLogged -> ', usuario); }
//     });
//   }
  

//   async logout():Promise<void>{
//     try {
//       await signOut(this.auth);
//     } 
//     catch (error) {
//       console.log('error ->', error);
//     }
//   }


// }

//==========================================================================

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  public usuario: any;
  msjError: string = "";

  constructor(
  public afAuth: AngularFireAuth,
  private router: Router, 
  public usuarioSvc: UsuarioService
  ) { }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.msjError = "";
      if(result.user)
      {
        this.usuario = new Usuario();
        this.usuario.id = result.user?.uid;
        this.usuario.email = result.user?.email;
        console.log(this.usuario);
        
      }
    })
    .catch((res) => {
      console.log(res);
      this.msjError = this.getError(res.code);
    });
  }

  async register({email, password}: any) {

    return await this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.msjError = "";

      if(result.user){
        this.usuarioSvc.registrarUsuario(result.user, result.user.uid);
      }
    })
    .catch((res) => {
      console.log(res);
      this.msjError = this.getError(res.code);
    });
  }

  async getUserLogged() {
    return this.afAuth.onAuthStateChanged(usuario => {
      if(usuario)
      {
        console.log('getUserLogged -> ', usuario);
      }
    });
  }

  logout() {
    this.router.navigate(["home"]);
    this.afAuth.signOut();
  }

  private getError(msj:string):string{
    console.log('getError ->', msj);
    switch(msj){
      case 'auth/user-not-found':
        return 'No existe ningún registro de usuario que corresponda al correo electrónico indicado.';
      case 'auth/email-already-in-use':
        return 'Otro usuario ya está utilizando el correo electrónico indicado.';
      case 'auth/invalid-email':
        return "El formato del correo electrónico no es correcto.";
      case 'auth/invalid-password':
        return "El valor que se proporcionó para la contraseña no es válido. Debe contener al menos seis caracteres.";
      case 'auth/invalid-phone-number':
      return "El valor que se proporcionó para el número de celular no es válido. Debe no estar vacío y que cumpla con el estándar E.164.";
    }
    return '';
  }

}

