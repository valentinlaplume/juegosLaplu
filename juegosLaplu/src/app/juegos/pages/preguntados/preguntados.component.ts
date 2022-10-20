import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CocktailService } from "../../../services/cocktail.service";
import { Observable, Subscription } from 'rxjs';
import { Puntaje } from 'src/app/shared/puntaje';
import { AuthService } from '../../../services/auth.service';
import { PuntajeService } from "../../../services/puntaje.service";
@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  segundos:number = 15;
  tiempo:number= this.segundos;
  interval:any;

  msjAccion:string='';
  adivino:boolean = false;
  comenzo:boolean = false;
  spinner:boolean = false;;

  pathImg:string='';
  cocktail:any;
  respuesta:string='';
  listCocktail!:any[]; 

  listSubscription!:Subscription[]; 
  puntos:number=0;
  msjPuntos:string='';
  pause:boolean = false;
  // tiempo de juego general
  segundosGral:number = 60;
  tiempoGral:number = 0;
  intervalGral:any;

    //puntaje
    mailUsuarioLogeado:string = '';
    idUsuarioLogeado:string = '';
  
    puntajes!:Puntaje[];
    puntajesTop!:Puntaje[];
    public usuario$: Observable<any> = this.authService.afAuth.user;
    suscripciones!:Subscription[]; 

  constructor(public cocktailService:CocktailService,
    public authService: AuthService,
    public puntajeService: PuntajeService) { 
    this.listSubscription = [];
    this.suscripciones = [];
    this.cargarPuntajes();

    this.usuario$.subscribe(res => {
      this.mailUsuarioLogeado = res['email'];
      this.idUsuarioLogeado = res['uid'];
    });
  }

  cargarPuntajes()
  {
    this.suscripciones.push(this.puntajeService.cargarPuntajesPreguntados().subscribe(snapshot => {
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
    this.finalizar();
    this.suscripciones.forEach(observable =>{
      observable.unsubscribe();
    })
  }

  comenzar(){
    this.msjPuntos = '';
    this.spinner = false;
    this.comenzo = true;
    this.msjAccion = '';
    this.getCocktailRandom();
    this.addNameCocktailRandom();
    // this.onCronometro();
  }

  pauseTimer(interval:any) {
    clearInterval(interval);
  }
  onCronometro(){
    this.tiempoGral = this.segundosGral;
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

  finalizar(){
    this.pauseTimer(this.intervalGral);
    this.addPuntaje();

    this.comenzo = false;
    this.msjPuntos = 'Has conseguido '+this.puntos+'/15 puntos';
    this.listCocktail = [];
    this.puntos = 0;
    this.pathImg = '';
    this.listSubscription.forEach(observable =>{
      observable.unsubscribe();
    })
  }

  addPuntaje(){
    const puntaje = new Puntaje();
    puntaje.idUsuario= this.idUsuarioLogeado;
    puntaje.emailUsuario= this.mailUsuarioLogeado;
    puntaje.puntos= this.puntos;
    puntaje.fecha= new Date().toLocaleString();
    console.log(puntaje)
    this.puntajeService.addPuntaje(puntaje, this.puntajeService.collectionPreguntados);
  }




  async getCocktailRandom(){
    this.listCocktail = [];
    this.listSubscription = [];

    this.listSubscription.push(
    this.cocktailService.getCocktailRandom().subscribe((item:any) => {
      this.cocktail = item['drinks'][0];
      this.pathImg = this.cocktail['strDrinkThumb'];
      this.respuesta = this.cocktail['strDrink'];
      console.log('respuesta ->', this.respuesta)
      this.listCocktail.push(this.cocktail);
    },
    (error: any) => { 
      console.log(error);
    }));
  }

  addNameCocktailRandom(){
    this.listSubscription.push(
    this.cocktailService.getCocktailRandom().subscribe((item:any) => {
      this.listCocktail.push(item['drinks'][0]);
    }));

    this.listSubscription.push(
    this.cocktailService.getCocktailRandom().subscribe((item:any) => {
      this.listCocktail.push(item['drinks'][0]);
    }));

    this.listSubscription.push(
    this.cocktailService.getCocktailRandom().subscribe((item:any) => {
      this.listCocktail.push(item['drinks'][0]);
    }));

    this.listSubscription.push(
    this.cocktailService.getCocktailRandom().subscribe((item:any) => {
      this.listCocktail.push(item['drinks'][0]);
      this.desordenarRespuestas();
    }));

    this.onCronometro();
  }

  onRespuesta(respuesta:string){

    if(respuesta == this.respuesta){
      this.adivino = true;
      this.msjAccion = 'CORRECTA';
      this.puntos+=5;
    }
    else{
      this.adivino = false;
      this.msjAccion = 'INCORRECTA';
    }

    this.pauseTimer(this.intervalGral);
    this.pause = true;

    this.getOtraPregunta();
  }

  getOtraPregunta()
  {
    setTimeout(() => {
      this.spinner = true;
    }, 1000);
    
    setTimeout(() => {
      this.spinner = false;
      this.pause = false;
      this.msjAccion = '';

      this.getCocktailRandom();
      this.addNameCocktailRandom();
      this.pauseTimer(this.intervalGral);
      this.onCronometro();
    }, 3000);
  }



  desordenarRespuestas()
  {
    this.listCocktail.sort(function (){return Math.random() - 0.5} );
  }

}
