import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  adivino:boolean = false;
  msjAccion:string='';
  letras!:string[]; 

  palabrasAdivinar = ['futbol', 'mate', 'auto', 'programador', 'celular', 'computadora', 'mouse', 'gimnasio', 'universidad', 'trabajo'];
  palabraEnLetras:string = '';
  palabraEnGuiones:string = '';
  numeroErrorImg:number = 1;
  indicePalabra!:number;
  gano:boolean = false;
  perdio:boolean = false;
  
  constructor() {
    this.setearPalabra();
    this.setearLetras();
  }
  
  ngOnInit(): void { }

  private setearLetras(){
    this.letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z'];
  }

  private setearPalabra(){
    this.palabraEnGuiones = '';
    this.palabraEnLetras = '';

    let indexBefore =  this.indicePalabra;
    this.indicePalabra = Math.floor(Math.random()*this.palabrasAdivinar.length);
    while (indexBefore == this.indicePalabra) {
      this.indicePalabra = Math.floor(Math.random()*this.palabrasAdivinar.length);
    }

    console.log('setearPalabra -> ', this.indicePalabra);
    this.convertirpalabraEnLetras(this.palabrasAdivinar[this.indicePalabra]);
  }

  private sumarErrorImg(){
    if(this.numeroErrorImg < 7)
      this.numeroErrorImg += 1;
  }

  setearJuego(){
    this.perdio = false;
    this.gano = false;
    this.numeroErrorImg = 1;
    this.setearLetras();
    this.setearPalabra();
  }

  convertirpalabraEnLetras(palabraRandom:string)
  {
    for (let i = 0; i < palabraRandom.length; i++) 
    { 
      this.palabraEnGuiones += '_'; 
      this.palabraEnLetras += palabraRandom[i];
      if(i != palabraRandom.length-1){ this.palabraEnLetras += ' '; this.palabraEnGuiones += ' '; }
    }
  }

  onLetra(letraElegida:string){
    console.log('APRETA ->', letraElegida.toLocaleLowerCase());
    this.msjAccion = '';
    let arrEnGuiones = this.palabraEnGuiones.split(" ");
    let arrEnLetras = this.palabraEnLetras.split(" ");

    console.log(arrEnGuiones)
    console.log(arrEnLetras)

    let sumaNoEsLetra = 0;
    for (let i = 0; i < arrEnGuiones.length; i++) 
    {
      let letra = arrEnLetras[i];
      if(letra == letraElegida.toLocaleLowerCase()) { this.palabraEnGuiones = this.replaceAt(i, letra); } else { sumaNoEsLetra++; }
    }
    
    this.actualizarEstadoJuego(sumaNoEsLetra, arrEnGuiones.length);

  }

  private actualizarEstadoJuego(sumaNoEsLetra:number, lenPabraEnGuiones:number){
    if(sumaNoEsLetra == lenPabraEnGuiones){ 
      this.sumarErrorImg(); 
      if(this.numeroErrorImg == 7) { 
        this.adivino = false; 
        this.msjAccion = "PERDISTE, PALABRA CORRECTA: " + this.palabrasAdivinar[this.indicePalabra].toLocaleUpperCase(); 
        this.setearJuego(); 
        return; 
      }
    }

    console.log(this.palabraEnGuiones)
    if(!this.palabraEnGuiones.includes('_')) 
    { 
      this.adivino = true; 
      this.msjAccion = "GANASTE, PALABRA CORRECTA: " + this.palabrasAdivinar[this.indicePalabra].toLocaleUpperCase(); 
      this.setearJuego(); 
    }
  }

  replaceAt(i: number, letra: string) {
    let arr = this.palabraEnGuiones.split(" ");
    arr[i] = letra;
    let r = arr.join(" ");
    return r;
  }
}


