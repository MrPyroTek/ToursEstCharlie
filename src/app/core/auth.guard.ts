import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          // User is logged in, canActivate returns true unless you want specific logic here
          resolve(true);
        } else {
          // No user logged in, redirect to login page
          this.router.navigate(['/login']);
          resolve(false);
        }
      }, error => {
        console.error('Check login error:', error);
        this.router.navigate(['/login']);
        resolve(false);
      });
    });
  }
}
