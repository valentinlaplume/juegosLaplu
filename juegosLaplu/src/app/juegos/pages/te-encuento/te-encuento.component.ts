import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Puntaje } from 'src/app/shared/puntaje';
import { AuthService } from '../../../services/auth.service';
import { PuntajeService } from "../../../services/puntaje.service";
@Component({
  selector: 'app-te-encuento',
  templateUrl: './te-encuento.component.html',
  styleUrls: ['./te-encuento.component.css']
})
export class TeEncuentoComponent implements OnInit, OnDestroy {
  caritaCorrecta:string = '°<°';
  caritaIncorrecta:string = '°>°';

  msjPuntos:string = '';
  listCaritas!:string[]; 
  cambioCarita:boolean = false;
  comenzo:boolean = false;
  msjAccion:string='';
  adivino:boolean = false;
  
  puntos:number = 0;
  
  segundos:number = 5;
  tiempo:number= 0;
  interval:any;
  pausa = false;

  // tiempo de juego general
  segundosGral:number = 30;
  tiempoGral:number = 0;
  intervalGral:any;

  //puntaje
  mailUsuarioLogeado:string = '';
  idUsuarioLogeado:string = '';

  puntajes!:Puntaje[];
  puntajesTop!:Puntaje[];
  public usuario$: Observable<any> = this.authService.afAuth.user;
  suscripciones!:Subscription[]; 

  constructor(
    public authService: AuthService,
    public puntajeService: PuntajeService
    ) 
  {
    this.suscripciones = [];
    this.cargarPuntajes();

    this.usuario$.subscribe(res => {
      this.mailUsuarioLogeado = res['email'];
      this.idUsuarioLogeado = res['uid'];
    });
  }

  cargarPuntajes()
  {
    this.suscripciones.push(this.puntajeService.cargarPuntajesTeEncuento().subscribe(snapshot => {
      this.puntajes = [];
      this.puntajesTop = [];
      snapshot.forEach((item: any) => {
        const data = item.payload.doc.data() as Puntaje;
        data.id = item.payload.doc.id;
        this.puntajes.push(data);
        if(this.puntajes.length > 0){
          this.puntajesTop = this.puntajes.slice(0, 10);
        }
      })
    }))
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach(observable =>{
      observable.unsubscribe();
    })
  }

  comenzar(){
    this.msjPuntos = '';
    this.pausa=false;
    this.comenzo = true;
    this.setearlistCaritas();
    this.tiempoGral = this.segundosGral;
    this.onCronometro();
  }

  pauseTimer(interval:any) {
    clearInterval(interval);
  }
  onCronometro(){
    // tiempo de juego general
    this.intervalGral = setInterval(() => {
      if(this.tiempoGral == 0)
      {
        this.finalizar();
      }
      else{
        this.tiempoGral--;
      }
    }, 1000);
  }

  private getOtraJugada(){
    this.pausa = true;
    
    setTimeout(() => {
      this.pausa = false;
      this.adivino = false;
      this.msjAccion = '';

      this.setearlistCaritas();
      this.pauseTimer(this.intervalGral);
      this.onCronometro();
    }, 2000);
  }

  onClick(cara:string){
    this.pauseTimer(this.intervalGral);

    switch (cara) {
      case this.caritaCorrecta:
        this.puntos+=10;
        this.msjAccion = 'CORRECTO!';
        this.adivino = true;
      break;
      case this.caritaIncorrecta:
        this.msjAccion = 'INCORRECTO';
        this.adivino = false;
      break;
    }

    this.getOtraJugada();
  }

  finalizar(){
    this.pauseTimer(this.intervalGral);
    this.addPuntaje();

    this.comenzo = false;
    this.msjPuntos = this.puntos > 0 ? 'Felicitaciones! has conseguido '+this.puntos+' puntos' : 'Has conseguido '+this.puntos+' puntos';
    this.listCaritas = [];
    this.puntos = 0;
  }

  addPuntaje(){
    const puntaje = new Puntaje();
    puntaje.idUsuario= this.idUsuarioLogeado;
    puntaje.emailUsuario= this.mailUsuarioLogeado;
    puntaje.puntos= this.puntos;
    puntaje.fecha= new Date().toLocaleString();
    console.log(puntaje)
    this.puntajeService.addPuntaje(puntaje, this.puntajeService.collectionTeEncuento);
  }


  private setearlistCaritas(){
    this.cambioCarita = !this.cambioCarita;

    this.listCaritas = [];
    for (let index = 0; index < 25; index++) {
      this.listCaritas.push(index == 0 ? this.caritaCorrecta : this.caritaIncorrecta);
    }

    this.desordenarArray();
  }

  desordenarArray()
  {
    this.listCaritas.sort(function (){ return Math.random() - 0.5 } );
  }



}
