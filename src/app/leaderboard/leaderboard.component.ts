import { Component, OnInit } from '@angular/core';
import { TrophyService } from '../trophy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard$: Observable<{ name: string; image: string; trophyCount: number }[]>;

  constructor(private trophyService: TrophyService) {}

  ngOnInit() {
    this.leaderboard$ = this.trophyService.generateLeaderboard();
  }
}
