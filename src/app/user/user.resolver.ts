import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(private userService: UserService, private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {
    try {
      const user = await this.userService.getCurrentUser();

      // Ensure providerData and its first item exist
      const providerId = user.provider || '';
      const isPasswordProvider = providerId === 'password';

      // Set default image if the provider is 'password'
      if (isPasswordProvider) {
        user.image = 'https://via.placeholder.com/400x300';
      }

      return user;
    } catch (err) {
      console.error('Error resolving user:', err);
      this.router.navigate(['/login']);
      throw err; // Reject the promise if there's an error
    }
  }
}
