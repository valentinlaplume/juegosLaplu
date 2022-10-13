import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';

const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: HomeComponent },
    { path: 'quienSoy', component: QuienSoyComponent },
    { path: 'encuesta', component: EncuestaComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
