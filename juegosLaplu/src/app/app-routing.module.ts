import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import ('./auth/auth.module').then(res => res.AuthModule) 
  },
  { 
    path:'home', 
    loadChildren: () => import ('./home/home.module').then(res => res.HomeModule) 
  },
  { path:'**', redirectTo: ''}
  //{ path:'error', component: ErrorComponent},
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
