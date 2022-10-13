import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOMenorComponent implements OnInit {
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

  constructor() { 
  }

  ngOnInit(): void {
  }

  OnDestroy(){
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
    this.comenzo = false;
    this.pauseTimer(this.intervalGral);
    this.msjPuntos = 'Has conseguido '+this.puntos+' puntos';
    this.msjAccion = '';
    this.puntos = 0;
    this.cartaAnterior = '';
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
