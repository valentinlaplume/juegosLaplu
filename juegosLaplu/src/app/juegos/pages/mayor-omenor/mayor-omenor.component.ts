import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Puntaje } from 'src/app/shared/puntaje';
import { AuthService } from '../../../services/auth.service';
import { PuntajeService } from "../../../services/puntaje.service";
@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOMenorComponent implements OnInit, OnDestroy {
  cambioCarta:boolean = false;
  adivino:boolean = false;
  
  cartaAnterior:string='';
  cartaActual:string='';
  cartaSiguiente:string='';
  
  indiceNum!:number;
  listaNumeros = ['2', '4', '5', '6', '7', '8', '9', '10'];
  
  puntos:number = 0;
  
  interval:any;
  segundosPorJugada:number = 5;
  tiempo:number= 0;
  
  msjAccion:string='';
  msjPuntos:string = '';
  comenzo:boolean = false;
  pause = true;
  private puntoConseguir = 1; // puntos a conseguir si adivina

  // tiempo de juego general
  segundosGral:number = 20;
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
    this.suscripciones.push(this.puntajeService.cargarPuntajesMayorOMenor().subscribe(snapshot => {
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

  private getNewIndexNumber():number {
    let index = Math.floor(Math.random()*this.listaNumeros.length);
    while(index == this.indiceNum) // valida que no sea repetido
    { 
      index = Math.floor(Math.random()*this.listaNumeros.length);
    }
    return index;
  }


  comenzar(){
    this.getNuevaCarta();
    this.tiempoGral = this.segundosGral;
    this.msjPuntos = '';
    this.comenzo = true;
    this.onCronometro();
  }

  finalizar(){
    this.pauseTimer(this.intervalGral);
    this.addPuntaje();

    this.comenzo = false;
    this.msjPuntos = 'Has conseguido '+this.puntos+' puntos';
    this.msjAccion = '';
    this.puntos = 0;
    this.cartaAnterior = '';
  }

  addPuntaje(){
    const puntaje = new Puntaje();
    puntaje.idUsuario= this.idUsuarioLogeado;
    puntaje.emailUsuario= this.mailUsuarioLogeado;
    puntaje.puntos= this.puntos;
    puntaje.fecha= new Date().toLocaleString();
    console.log(puntaje)
    this.puntajeService.addPuntaje(puntaje, this.puntajeService.collectionMayorOMenor);
  }

  pauseTimer(interval:any) { 
    this.pause = true;
    clearInterval(interval); 
  }
  onCronometro(){
    this.pause = false;
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
    this.pause = true;
    setTimeout(() => 
    {
      this.pause = false;
      this.msjAccion = '';
      this.changeCarta();
      this.onCronometro();
    }, 2000);
  }

  private getNuevaCarta(){
    this.indiceNum = this.getNewIndexNumber();
    this.cartaActual = this.listaNumeros[this.indiceNum];
  }
  private changeCarta()
  {  
    this.cartaAnterior = this.cartaActual;
    this.getNuevaCarta();
    this.cambioCarta = !this.cambioCarta; // usada para efecto visual
  }

  onMayor(){
    this.onChangeAccion('>');
  }
  onMenor(){
    this.onChangeAccion('<');
  }

  onChangeAccion(signo:string)
  {
    this.pauseTimer(this.intervalGral);
    this.changeCarta();

    let cartaActual = parseInt(this.cartaActual);
    let cartaAnterior = parseInt(this.cartaAnterior);

    switch (signo) {
      case '>':
        if(cartaActual > cartaAnterior){
          this.adivino = true;
          this.msjAccion = 'CORRECTO, ES MAYOR';
          this.puntos+=this.puntoConseguir;
        }
        else{
          this.msjAccion = 'INCORRECTO, ES MENOR';
          this.adivino = false;
        }
      break;
      case '<':
        if(cartaActual < cartaAnterior){
          this.adivino = true;
          this.msjAccion = 'CORRECTO, ES MENOR';
          this.puntos+=this.puntoConseguir;
        }
        else{
          this.msjAccion = 'INCORRECTO, ES MAYOR';
          this.adivino = false;
        }
      break;
    }
    this.getOtraJugada();
    // setTimeout(() => 
    // {
    //   this.msjAccion = '';
    //   if(this.contadorJugadas == this.jugadas) { this.finalizar(); return; }
    //   this.contadorJugadas++;
    // }, 2000);
  }


}
