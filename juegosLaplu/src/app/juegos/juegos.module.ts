import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './pages/mayor-omenor/mayor-omenor.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
