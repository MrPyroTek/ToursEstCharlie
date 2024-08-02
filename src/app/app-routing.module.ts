import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { TrophyComponent } from './trophy/trophy.component';
import { UserTrophiesComponent } from './user-trophy/user-trophy.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, resolve: { data: UserResolver } },
  { path: 'admin/trophies', component: TrophyComponent, canActivate: [AuthGuard] },
  { path: 'player/trophies', component: UserTrophiesComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
