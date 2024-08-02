import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;  // Definite assignment assertion
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async tryLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    try {
      const result = await this.authService.doLogin(this.loginForm.value);
      this.router.navigate(['/user']);
    } catch (err) {
      console.error(err);
    }
  }

  async tryGoogleLogin() {
    try {
      await this.authService.doGoogleLogin();
      this.router.navigate(['/user']);
    } catch (err) {
      console.error(err);
    }
  }

  async tryFacebookLogin() {
    try {
      await this.authService.doFacebookLogin();
      this.router.navigate(['/user']);
    } catch (err) {
      console.error(err);
    }
  }

  async tryTwitterLogin() {
    try {
      await this.authService.doTwitterLogin();
      this.router.navigate(['/user']);
    } catch (err) {
      console.error(err);
    }
  }
}
