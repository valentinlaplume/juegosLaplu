import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection 
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuario } from '../shared/usuario';

//------------------------ de

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private dbPath: string = '/usuarios';
  public usuario: Usuario = new Usuario();
  usuariosRef!: AngularFirestoreCollection<any>;
  usuarioData: any;
  userMail!: string;
  usuarios!: Observable<any[]>;

  constructor(private firestoreDb: AngularFirestore) {
    this.usuariosRef = firestoreDb.collection<any>(this.dbPath);
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarios = this.usuariosRef.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => a.payload.doc.data() as any))
    )
  }

  getUsuarioById(id: string) {
    let usuarioRef = this.firestoreDb.collection(this.dbPath, ref => ref.where(id, '==', 'id'));
    return usuarioRef;
  }

  registrarUsuario(usuario: any, id: string) {
    this.usuariosRef.add(
      {
        email: usuario.email,
        fecha: new Date().toLocaleString(),
        id: id
      });
  }

}
