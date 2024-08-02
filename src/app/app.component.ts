import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  leaderboard$: Observable<any[]>;
  newScoreName: string = '';
  newScoreValue: number = 0;

  constructor(private leaderboardService: LeaderboardService, private router: Router) {}

  ngOnInit(): void {
    this.leaderboard$ = this.leaderboardService.getLeaderboard();
  }

  addScore(): void {
    if (this.newScoreName && this.newScoreValue) {
      this.leaderboardService.addScore(this.newScoreName, this.newScoreValue);
      this.newScoreName = '';
      this.newScoreValue = 0;
    }
  }
}
