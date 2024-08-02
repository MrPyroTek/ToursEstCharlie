import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Import Firebase app module
import 'firebase/compat/auth'; // Import Firebase auth module

@Injectable({
  providedIn: 'root' // Ensure the service is provided in the root injector
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) {}

  // Facebook Login
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider)
        .then(res => resolve(res), err => {
          console.error('Facebook Login Error:', err);
          reject(err);
        });
    });
  }

  // Twitter Login
  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.signInWithPopup(provider)
        .then(res => resolve(res), err => {
          console.error('Twitter Login Error:', err);
          reject(err);
        });
    });
  }

  // Google Login
  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider)
        .then(res => resolve(res), err => {
          console.error('Google Login Error:', err);
          reject(err);
        });
    });
  }

  // Register
  doRegister(value: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  // Login
  doLogin(value: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  // Logout
  doLogout() {
    return new Promise<void>(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => resolve(), (err) => {
            console.error('Logout Error:', err);
            reject(err);
          });
      } else {
        reject('No user currently signed in');
      }
    });
  }
}
