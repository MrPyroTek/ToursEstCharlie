import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Import Firebase app module
import 'firebase/compat/auth'; // Import Firebase auth module

@Injectable({
  providedIn: 'root' // Ensure the service is provided in the root injector
})
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  // Get Current User
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  // Update Current User
  updateCurrentUser(value: { name: string }) {
    return new Promise<any>((resolve, reject) => {
      const user = this.afAuth.currentUser;
      user.then(currentUser => {
        if (currentUser) {
          currentUser.updateProfile({
            displayName: value.name,
            photoURL: currentUser.photoURL
          }).then(() => {
            resolve('Profile updated');
          }).catch(err => reject(err));
        } else {
          reject('No user logged in');
        }
      }).catch(err => reject(err));
    });
  }
}
