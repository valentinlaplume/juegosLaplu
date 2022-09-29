import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOMenorComponent implements OnInit {
  cambioCarta:boolean = false;
  adivino:boolean = false;
  msjAccion:string='';
  
  numCartaAntes:string='';
  numCarta:string='2';
  
  indiceNum!:number;
  listaNumeros = ['2', '4', '5', '6', '7', '8', '9', '10'];

//   Mayor o Menor
// Desde un mazo de carta se va a preguntar si la siguiente ES MAYOR o menor. El jugador sumará un punto ante cada carta que adivine.
  constructor() { 
    this.indiceNum = Math.floor(Math.random()*this.listaNumeros.length);
    this.numCarta = this.listaNumeros[this.indiceNum];
  }

  ngOnInit(): void {
  }

  OnDestroy(){
    
  }

  private getNewIndexNumber():number{
    let index = Math.floor(Math.random()*this.listaNumeros.length);
    while(index == this.indiceNum){
      index = Math.floor(Math.random()*this.listaNumeros.length);
    }
    return index;
  }
    
  private onChangeCarta()
  {  
    this.numCartaAntes = this.numCarta;
    this.indiceNum = this.getNewIndexNumber();
    this.numCarta = this.listaNumeros[this.indiceNum];
    this.cambioCarta = !this.cambioCarta; 
  }


  onMayor(){
    this.onChangeCarta();
    this.onChangeAccion('>');
  }
  onMenor(){
    this.onChangeCarta();
    this.onChangeAccion('<');
  }

  onChangeAccion(signo:string)
  {
    let numeroAntes = parseInt(this.numCartaAntes);
    let numeroAhora = parseInt(this.numCarta);
    
    switch (signo) {
      case '>':
        if(numeroAhora > numeroAntes)
        {
          this.msjAccion = 'CORRECTO, ES MAYOR';
          this.adivino = true;
        }else{
          this.msjAccion = 'INCORRECTO, ES MENOR';
          this.adivino = false;
        }
      break;
      case '<':
        if(numeroAhora < numeroAntes)
        {
          this.msjAccion = 'CORRECTO, ES MENOR';
          this.adivino = true;
        }else{
          this.msjAccion = 'INCORRECTO, ES MAYOR';
          this.adivino = false;
        }
      break;
    }
  }


}
