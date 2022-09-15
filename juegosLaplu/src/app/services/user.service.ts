import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  
  Auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';

import { AuthModule } from '../auth/auth.module';

//---------------------------------------
import { User } from "../shared/user.interface";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';

import  {  Observable ,  of   } from  'rxjs' ;
import  { switchMap   } from  'rxjs/operators' ;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: Promise<UserCredential>|undefined;
  // public user$: Observable<User | null | undefined>;

  constructor(
    private auth:Auth
    // ,
    // public afAuth: AngularFireAuth, 
    // private afs: AngularFirestore
    ) {
      // this.user$ = this.afAuth.authState.pipe(
      //   switchMap((user) => {
      //     if (user) {
      //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      //     }
      //     return of(null);
      //   })
      // );
  }

  public register({email, password}: any):any{
     return createUserWithEmailAndPassword(this.auth, email, password);
    // try {
    //   //destructuro user a mi user
    //   // return createUserWithEmailAndPassword(,email, password);
    // } catch (error) {
    //   console.log('Error->', error);
    // }
  }

  public login({email, password}: any){
    // const { user }: any = await this.afAuth.signInWithEmailAndPassword(email, password);
    // this.updateUserData(user);
    // return user;
    const a =  signInWithEmailAndPassword(this.auth, email, password);
    this.user = a;
    return a;
  }

  async logout():Promise<void>{
    try {
      await signOut(this.auth);
    } 
    catch (error) {
      console.log('error ->', error);
    }
  }

  public getUser(){
    return this.user;
  }

  // private updateUserData(user: User) {
  //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  //   console.log('userRef ->', userRef);
    
  //   const data: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     emailVerified: user.emailVerified,
  //     displayName: user.displayName,
  //   };

  //   return userRef.set(data, { merge: true });
  // }
}
