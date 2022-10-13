import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { VerEncuestasComponent } from './pages/ver-encuestas/ver-encuestas.component';


@NgModule({
  declarations: [
    HomeComponent,
    QuienSoyComponent,
    EncuestaComponent,
    VerEncuestasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule, // validador de formulario

  ]
})
export class HomeModule { }
