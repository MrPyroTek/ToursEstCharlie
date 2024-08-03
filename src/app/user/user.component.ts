import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../model/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.getCurrentUser();
      this.profileForm = this.fb.group({
        name: [this.user.name, Validators.required]
      });
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }

  async save(formValue: { name: string }): Promise<void> {
    try {
      await this.userService.updateCurrentUser({ name: formValue.name });
      alert('Username updated successfully');
    } catch (err) {
      alert('Error updating username: ' + err.message);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userService.logout();
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  }
}