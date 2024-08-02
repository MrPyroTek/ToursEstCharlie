import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getCurrentUser()
        .then(user => {
          // Redirect if user is already logged in
          this.router.navigate(['/user']);
          resolve(false);
        })
        .catch(() => resolve(true)); // Allow access if no user is logged in
    });
  }
}
