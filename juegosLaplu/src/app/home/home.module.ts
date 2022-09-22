import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';


@NgModule({
  declarations: [
    HomeComponent,
    QuienSoyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule

  ]
})
export class HomeModule { }
