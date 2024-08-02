import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private leaderboardRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.leaderboardRef = db.list('leaderboard');
  }

  getLeaderboard(): Observable<any[]> {
    return this.leaderboardRef.valueChanges();
  }

  addScore(name: string, score: number): void {
    this.leaderboardRef.push({ name, score });
  }
}
