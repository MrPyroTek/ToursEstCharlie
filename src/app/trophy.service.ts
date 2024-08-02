import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Trophy {
  key: string;
  name: string;
  description?: string;
}

interface UserData {
  trophies: { [key: string]: boolean };
}

interface FirebaseUser {
  key: string;
  data: UserData;
}

@Injectable({
  providedIn: 'root'
})
export class TrophyService {

  constructor(private db: AngularFireDatabase) { }

  // Admin function to add a trophy
  addTrophy(trophy: Trophy) {
    return this.db.list('trophies').push(trophy);
  }

  // Player function to unlock a trophy
  unlockTrophy(userId: string, trophyId: string) {
    return this.db.object(`users/${userId}/trophies/${trophyId}`).set(true);
  }

   // Fetch users from Firebase
   getAllUsers(): Observable<FirebaseUser[]> {
    return this.db.list<UserData>('users').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload.key as string,  // Firebase key is treated as a string
          data: c.payload.val() as UserData // Ensure the value matches UserData
        }))
      )
    );
  }

  // Generate leaderboard
  generateLeaderboard(): Observable<{ userId: string, trophyCount: number }[]> {
    return this.getAllUsers().pipe(
      map(users => users.map(user => {
        const trophyCount = user.data.trophies ? Object.keys(user.data.trophies).length : 0;
        return { userId: user.key, trophyCount };
      }).sort((a, b) => b.trophyCount - a.trophyCount))  // Sort descending by trophy count
    );
  }

    // Fetch all trophies for a specific user
  getUserTrophies(userId: string) {
    return this.db.list(`users/${userId}/trophies`).snapshotChanges().pipe(
      map(changes => changes.map(c => c.payload.key || ''))  // Only get the keys which are trophy IDs
    );
  }

  // Fetch all trophies
  getAllTrophies(): Observable<Trophy[]> {
    return this.db.list('trophies').snapshotChanges().pipe(
      map(changes => changes.map(c => {
        const val = c.payload.val();
        // Use type assertion to inform TypeScript about the structure of `val`
        return {
          key: c.payload.key || '',
          name: (val as Trophy)?.name || 'Unknown',  // Provide a default value if `name` is missing
          description: (val as Trophy)?.description || ''  // Provide a default value if `description` is missing
        };
      }))
    );
  }
}
