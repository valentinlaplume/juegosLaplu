import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Puntaje } from '../shared/puntaje';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PuntajeService {
  dbPathMayorOMenor: string = 'puntajesMayorOMenor';
  dbPathPreguntados: string = 'puntajesPreguntados';
  dbPathAhorcado: string = 'puntajesAhorcado';
  dbPathTeEncuentro: string = 'puntajesTeEncuentro';

  collectionMayorOMenor!: AngularFirestoreCollection<Puntaje>;
  collectionPreguntados!: AngularFirestoreCollection<Puntaje>;
  collectionAhorcado!: AngularFirestoreCollection<Puntaje>;
  collectionTeEncuento!: AngularFirestoreCollection<Puntaje>;

  puntajes!: Observable<Puntaje[]>;

  constructor(
    public db: AngularFirestore, 
    public router: Router, 
    public afAuth: AngularFireAuth) 
  {

  }

  getPuntajes(collection: AngularFirestoreCollection){
    this.puntajes = collection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Puntaje))
    );
 }

  cargarPuntajesMayorOMenor(){
      this.collectionMayorOMenor = this.db.collection<Puntaje>(this.dbPathMayorOMenor, ref => ref.orderBy('puntos','desc'));
      return this.collectionMayorOMenor.snapshotChanges();
   }

  cargarPuntajesPreguntados(){
  this.collectionPreguntados = this.db.collection<Puntaje>(this.dbPathPreguntados, ref => ref.orderBy('puntos','desc'));
  setTimeout(() => {
    this.getPuntajes(this.collectionPreguntados);
  }, 1000);
  return this.collectionPreguntados.snapshotChanges();
  }

  cargarPuntajesAhorcado(){
  this.collectionAhorcado = this.db.collection<Puntaje>(this.dbPathAhorcado, ref => ref.orderBy('puntos','desc'));
  setTimeout(() => {
    this.getPuntajes(this.collectionAhorcado);
  }, 1000);
  return this.collectionAhorcado.snapshotChanges();
  }

  cargarPuntajesTeEncuento(){
  this.collectionTeEncuento = this.db.collection<Puntaje>(this.dbPathTeEncuentro, ref => ref.orderBy('puntos','desc'));
  setTimeout(() => {
    this.getPuntajes(this.collectionTeEncuento);
  }, 1000);
  return this.collectionTeEncuento.snapshotChanges();
  }

  // public addPuntaje(item:Puntaje, collection: AngularFirestoreCollection) {
  //   //   idUsuario: usuarioId,
  //   //   usuario: usuario,
  //   //   puntos: puntaje,
  //   //   fecha: new Date().toLocaleString()
  //   return collection.add(item);
  // }

  async addPuntaje(item: Puntaje, collection: AngularFirestoreCollection){
    //   idUsuario: usuarioId,
 //   usuario: usuario,
 //   puntos: puntaje,
 //   fecha: new Date().toLocaleString()
    return await collection.add(
    {
      emailUsuario: item.emailUsuario,
      idUsuario: item.idUsuario,
      fecha: item.fecha,
      puntos: item.puntos
    });
  }
}
