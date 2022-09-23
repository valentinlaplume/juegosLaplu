import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  
  letras!:string[]; 

  palabrasAdivinar = ['auto', 'mate', 'mesa', 'programador', 'perro'];
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
    this.indicePalabra = Math.floor(Math.random()*this.palabrasAdivinar.length);
    console.log(this.indicePalabra);
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
      if(this.numeroErrorImg == 7) { alert("PERDISTE!!!!! la palabra era: " + this.palabrasAdivinar[this.indicePalabra].toLocaleUpperCase()); this.setearJuego(); return; }
    }

    console.log(this.palabraEnGuiones)
    if(!this.palabraEnGuiones.includes('_')) 
    { alert("GANASTE!!!!! la palabra es: " + this.palabrasAdivinar[this.indicePalabra].toLocaleUpperCase()); this.setearJuego(); }
  }

  replaceAt(i: number, letra: string) {
    let arr = this.palabraEnGuiones.split(" ");
    arr[i] = letra;
    let r = arr.join(" ");
    return r;
  }
}


