import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path:'', 
    loadChildren: () => import ('./home/home.module').then(res => res.HomeModule) 
  },
  { 
    path:'home', 
    loadChildren: () => import ('./home/home.module').then(res => res.HomeModule) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import ('./auth/auth.module').then(res => res.AuthModule) 
  },
  { 
    path: 'juegos', 
    loadChildren: () => import ('./juegos/juegos.module').then(res => res.JuegosModule) 
  },
  
  //{ path:'error', component: ErrorComponent},
  //{ path:'**', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
