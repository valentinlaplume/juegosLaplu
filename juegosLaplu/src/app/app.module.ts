import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

//modulos
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from '@firebase/firestore';
// import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { JuegosModule } from './juegos/juegos.module';
@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore( () => getFirestore()),
    // provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    AuthModule,
    HomeModule,
    JuegosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
