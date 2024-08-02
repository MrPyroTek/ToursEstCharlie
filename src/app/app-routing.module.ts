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


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, resolve: { data: UserResolver } },
  { path: 'admin/trophies', component: TrophyComponent, canActivate: [AuthGuard] }, // Admin only
  { path: 'player/trophies', component: UserTrophiesComponent, canActivate: [AuthGuard] }, // Authenticated users
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] }, // Authenticated users
  { path: '**', redirectTo: '' } // Wildcard route for redirecting unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
