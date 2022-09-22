import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat-service.service';
import { ChatMensaje } from 'src/app/shared/chat-mensaje';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit 
{
  public msjEnviar!: string;
  // mensajes!: AngularFireList<ChatMensaje>;
  msjs: any;
  lsUsuarioEmail!: any;
  mail!: string;
  usuario!: any;
  usuarioActual: boolean = false;
  mailUsuarioLogeado!: string;
  idUsuarioLogeado!: string;
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  listaMensajes: Array<any> = new Array<any>();

  constructor(
    public authSvc: AuthService,
    private chatSvc: ChatService, 
    public router: Router) { 

      this.usuario$.subscribe(res => {
        this.mailUsuarioLogeado = res['email'];
        this.idUsuarioLogeado = res['uid'];
      });

      this.cargarMensajes();
    }
    
    ngOnInit(): void {
    }


    async cargarMensajes(){
      this.listaMensajes = [];
      this.chatSvc.getMensajes()
      .subscribe((res:any) => {
        this.listaMensajes = res;
        console.log(this.listaMensajes);
      });
    }

    enviar(){
      let msj = new ChatMensaje();
      msj.idUsuario = this.idUsuarioLogeado;
      msj.emailUsuario = this.mailUsuarioLogeado;
      msj.fecha = new Date().toLocaleString();
      msj.mensaje = this.msjEnviar;

      // msj.hora = new Date().toLocaleTimeString();
      // this.chatSvc.addMensaje(msj);
      console.log('mensaje a guardar en db: ', msj);
      this.chatSvc.saveMensaje(msj);
      this.msjEnviar = "";
    }

}
