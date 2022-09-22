import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './pages/mayor-omenor/mayor-omenor.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'ahorcado', component: AhorcadoComponent },
      { path: 'mayorOMenor', component: MayorOMenorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
