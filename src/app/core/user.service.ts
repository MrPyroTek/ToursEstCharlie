import { AngularFireAuth } from '@angular/fire/compat/auth';// src/app/core/user.service.ts
import { Injectable } from '@angular/core';
import { FirebaseUserModel } from '../model/user.model';
import { Observable, firstValueFrom, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  // Get Current User
  async getCurrentUser(): Promise<FirebaseUserModel> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        return new FirebaseUserModel({
          name: user.displayName || '', // Use empty string if displayName is undefined
          image: user.photoURL || '',   // Use empty string if photoURL is undefined
          provider: user.providerData[0]?.providerId || '' // Ensure providerData[0] exists
        });
      } else {
        throw new Error('No user logged in');
      }
    } catch (err) {
      throw new Error(`Failed to get current user: ${err.message}`);
    }
  }

  // Update Current User
  async updateCurrentUser(value: { name: string }): Promise<string> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updateProfile({
          displayName: value.name, // Update displayName
          photoURL: user.photoURL // Optionally update photoURL if needed
        });

        // Check if user exists and set data if not
        await this.db.object(`users/${user.uid}/name`).set(value.name);

        return 'Profile updated';
      } else {
        throw new Error('No user logged in');
      }
    } catch (err) {
      throw new Error(`Failed to update profile: ${err.message}`);
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (err) {
      throw new Error(`Failed to log out: ${err.message}`);
    }
  }

  checkIfUserExists(key: string): Observable<boolean> {
    return this.db.object(`/users/${key}`).valueChanges().pipe(
      map(user => !!user)
    );
  }
}