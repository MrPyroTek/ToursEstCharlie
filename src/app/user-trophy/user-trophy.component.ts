import { Component, OnInit } from '@angular/core';
import { Trophy, TrophyService } from '../trophy.service';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-trophies',
  templateUrl: './user-trophy.component.html',
  styleUrls: ['./user-trophy.component.scss']
})
export class UserTrophiesComponent implements OnInit {
  trophies$: Trophy[] = [];  // Adjusted type
  trophiesObtained: string[] = [];  // Array of trophy IDs for obtained trophies

  constructor(
    private trophyService: TrophyService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.initAllTrophies();
    this.initUserTrophies();
  }

  initUserTrophies() {
    this.afAuth.authState.pipe(
      tap(user => {
        if (!user) {
          throw new Error('User not logged in!');
        }
      }),
      switchMap(user => this.trophyService.getUserTrophies(user.uid)),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Failed to fetch user trophies'));
      })
    ).subscribe(trophyIds => this.trophiesObtained = trophyIds);
  }

  initAllTrophies() {
    this.afAuth.authState.pipe(
      tap(user => {
        if (!user) {
          throw new Error('User not logged in!');
        }
      }),
      switchMap(() => this.trophyService.getAllTrophies()),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Failed to fetch all trophies'));
      })
    ).subscribe(trophies => this.trophies$ = trophies);
  }

  unlockTrophy(trophyId: string) {
    this.afAuth.authState.pipe(
      tap(user => {
        if (!user) {
          throw new Error('No user logged in!');
        }
      }),
      switchMap(user => this.trophyService.unlockTrophy(user.uid, trophyId)),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Failed to unlock trophy'));
      })
    ).subscribe();
  }
}
