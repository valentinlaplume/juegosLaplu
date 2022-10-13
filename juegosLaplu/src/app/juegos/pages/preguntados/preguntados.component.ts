import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { observable, Subscription } from 'rxjs';
import { CocktailService } from "../../../services/cocktail.service";

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

  constructor(public cocktailService:CocktailService) { 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.finalizar();
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
    this.comenzo = false;
    this.msjPuntos = 'Has conseguido '+this.puntos+'/15 puntos';
    this.listCocktail = [];
    this.puntos = 0;
    this.pathImg = '';
    this.pauseTimer(this.intervalGral);
    this.listSubscription.forEach(observable =>{
      observable.unsubscribe();
    })
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
