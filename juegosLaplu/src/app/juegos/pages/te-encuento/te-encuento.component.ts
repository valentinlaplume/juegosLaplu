import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-te-encuento',
  templateUrl: './te-encuento.component.html',
  styleUrls: ['./te-encuento.component.css']
})
export class TeEncuentoComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit(): void {
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
    this.comenzo = false;
    this.msjPuntos = this.puntos > 0 ? 'Felicitaciones! has conseguido '+this.puntos+' puntos' : 'Has conseguido '+this.puntos+' puntos';
    this.listCaritas = [];
    this.puntos = 0;
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
