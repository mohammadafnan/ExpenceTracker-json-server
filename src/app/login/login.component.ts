import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  heading = 'Expense Tracker';
  loginForm: FormGroup;
  isSignup = false;
  loading = false;

  constructor(
    private router: Router,
    private formbulider: FormBuilder,
    public auth: AuthService,
    private http: HttpClient
  ) {
    this.loginForm = this.formbulider.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  login() {
    const { username, password } = this.loginForm.value;

    if (this.isSignup) {
      this.auth.Signup(username, password);
      this.toggleSignup();
    } else {
      this.auth.login(username, password);
    }

    this.loginForm.reset();
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
  }
}
