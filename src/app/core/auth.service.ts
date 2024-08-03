import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Import Firebase app module
import 'firebase/compat/auth'; // Import Firebase auth module
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseUserModel } from '../model/user.model';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensure the service is provided in the root injector
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase // Inject AngularFireDatabase
  ) {}

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider)
        .then(async res => {
          const user = res.user;
          if (user) {
            const userData: FirebaseUserModel = {
              key: user.uid,
              name: user.displayName || '',
              image: user.photoURL || '',
              provider: user.providerData[0]?.providerId || ''
            };
  
            // Check if user exists and set data if not
            const userExists = await firstValueFrom(this.checkIfUserExists(user.uid));
            if (!userExists) { // Notice the negation here
              await this.db.object(`users/${user.uid}`).set(userData);
            }
            
            resolve(res);
          } else {
            reject('No user data found');
          }
        }, err => {
          console.error('Google Login Error:', err);
          reject(err);
        });
    });
  }
  
  checkIfUserExists(key: string): Observable<boolean> {
    return this.db.object(`/users/${key}`).valueChanges().pipe(
      map(user => !!user)
    );
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
