import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { observable, Subscription } from 'rxjs';
import { CocktailService } from "../../services/cocktail.service";

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
  termino:boolean;
  spinner:boolean = false;;

  pathImg:string='';
  cocktail:any;
  respuesta:string='';
  listCocktail!:any[]; 

  listSubscription!:Subscription[]; 
  puntos:number=0;
  pregunta:number=0;
  msjPuntos:string='';

  constructor(public cocktailService:CocktailService) { 
    this.termino = false;
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy preguntados');
    this.finalizar();
  }

  finalizar(){
    this.msjPuntos = 'Has conseguido '+this.puntos+'/15 puntos';
    this.listCocktail = [];
    this.pregunta = 0;
    this.puntos = 0;
    this.pathImg = '';
    this.pauseTimer();
    this.listSubscription.forEach(observable =>{
      observable.unsubscribe();
      console.log('unsubscribe de ',this.listSubscription.length);
    })
  }

  comenzar(){
    this.msjPuntos = '';
    this.pregunta = 1;
    this.spinner = false;
    this.termino = false;
    this.msjAccion = '';
    this.getCocktailRandom();
    this.addNameCocktailRandom();
    this.pauseTimer();
    this.onCronometro();
  }

  async getCocktailRandom(){
    this.listCocktail = [];
    this.listSubscription = [];

    this.listSubscription.push(
    this.cocktailService.getCocktailRandom().subscribe((item:any) => {
      this.cocktail = item['drinks'][0];
      this.pathImg = this.cocktail['strDrinkThumb'];
      this.respuesta = this.cocktail['strDrink'];
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
    }));

    this.desordenarRespuestas();
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

    this.pauseTimer();
    this.termino = true;

    this.getOtraPregunta();
  }

  getOtraPregunta()
  {
    setTimeout(() => {
      this.spinner = true;
    }, 1000);
    
    setTimeout(() => {
      this.spinner = false;
      this.termino = false;
      this.msjAccion = '';

      this.pregunta++;
      console.log('getOtraPregunta', this.pregunta);
      if(this.pregunta == 4) { this.finalizar(); return; }

      this.getCocktailRandom();
      this.addNameCocktailRandom();
      this.pauseTimer();
      this.onCronometro();
    }, 3000);
  }

  desordenarRespuestas()
  {
    this.listCocktail.sort(function (){return Math.random() - 0.5} );
  }

  onCronometro(){
    this.tiempo = this.segundos;
    this.interval = setInterval(() => {
      if(this.tiempo == 0)
      {
        this.adivino = false;
        this.msjAccion = 'SIN TIEMPO';
        this.termino = true;
        this.pauseTimer();
        this.getOtraPregunta();
      }
      else{
        this.tiempo--;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
