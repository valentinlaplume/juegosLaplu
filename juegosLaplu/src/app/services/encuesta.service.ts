import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  dbPath: string = "encuesta";
  encuestaCollection!: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore, public router: Router, public afAuth: AngularFireAuth) {
    this.encuestaCollection = this.db.collection<any>(this.dbPath, ref => ref.orderBy('fecha','desc'));
   }

  addEncuesta(id: string, email:string, nombre:string, apellido:string, edad:number, telefono:string, pregUno:string, pregDos:string, pregTres:string){
    this.encuestaCollection.add({
      id: id,
      email: email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      telefono: telefono,
      pregUno: pregUno,
      pregDos: pregDos,
      pregTres: pregTres,
      fecha: new Date().toLocaleDateString()
    });
  }
}
