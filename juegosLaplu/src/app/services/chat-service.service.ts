import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  } from '@angular/fire/compat/database';
import { ChatMensaje } from '../shared/chat-mensaje';
import { 
  AngularFirestore,
  AngularFirestoreCollection 
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService 
{
  private dbPath: string = 'chatMensajes';
  
  mensajesCollection!: AngularFirestoreCollection<ChatMensaje>;
  mensajes!: Observable<ChatMensaje[]>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore) 
  {
    this.mensajesCollection = firestore.collection<ChatMensaje>(this.dbPath, ref => ref.orderBy('fecha','asc'));
  }

  getMensajes() {
    this.mensajes = this.mensajesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as ChatMensaje))
    );
    
    return this.mensajes;
 }


  saveMensaje(item: ChatMensaje){
    this.mensajesCollection.add(
    {
      emailUsuario: item.emailUsuario,
      idUsuario: item.idUsuario,
      fecha: item.fecha,
      mensaje: item.mensaje
    });
  }

  
}
