import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
// import { provideAuth, getAuth } from '@angular/fire/auth';

import { LoginComponent } from "./pages/login/login.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { RegisterComponent } from "./pages/register/register.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
  declarations: [ // indica que todos estos componentes son parte de auth
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
