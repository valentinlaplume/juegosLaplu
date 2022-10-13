import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './pages/mayor-omenor/mayor-omenor.component';
import { FormsModule } from '@angular/forms';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { TeEncuentoComponent } from './pages/te-encuento/te-encuento.component';
import { TablaPuntajeComponent } from './components/tabla-puntaje/tabla-puntaje.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent,
    PreguntadosComponent,
    TeEncuentoComponent,
    TablaPuntajeComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
