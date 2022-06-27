import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

// to use map
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  // to handle signUp  of user using firebase
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // to handle signin of user using firebase
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // to get signed user from firebase
  getUser() {
    return this.auth.authState;
  }

  // to handle signOut of the user from application
  signOut() {
    return this.auth.signOut();
  }
}
