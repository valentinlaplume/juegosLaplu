import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './pages/mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { TeEncuentoComponent } from './pages/te-encuento/te-encuento.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'ahorcado', component: AhorcadoComponent },
      { path: 'mayorOMenor', component: MayorOMenorComponent },
      { path: 'preguntados', component: PreguntadosComponent },
      { path: 'teEncuentro', component: TeEncuentoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
