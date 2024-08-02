import { Component, OnInit } from '@angular/core';
import { TrophyService } from '../trophy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard$: { userId: string; trophyCount: number; }[];

  constructor(private trophyService: TrophyService) {}

  ngOnInit() {
     this.trophyService.generateLeaderboard().subscribe(data => {
      this.leaderboard$ = data
      console.log(data)
    });
  }
}
