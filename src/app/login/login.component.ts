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
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.loginForm = this.formbulider.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // login(data: any) {
  //   if (data.loginname == 'afnan' && data.loginpassword == '12345') {
  //     alert('Login Successfully');
  //     this.router.navigate(['/expense']);
  //   } else {
  //     alert('Login failed');
  //   }
  // }

  login() {
    this.loading = true;
    const { username, password } = this.loginForm.value;

    if (this.isSignup) {
      this.http
        .post('http://localhost:3000/users', {
          username,
          password,
        })
        .subscribe(() => {
          alert('Account created! Please login');
          this.signup();
          this.loading = false;
        });
    } else {
      this.http
        .get<any[]>(`http://localhost:3000/users?username=${username}`)
        .subscribe((users) => {
          if (users[0]?.password === password) {
            this.auth.login(users[0].id);
            this.loading = true;

            setTimeout(() => {
              this.router.navigate(['/expense']);
            }, 2000);
            // this.router.navigate(['/expense']);
          } else {
            alert('Invalid credentials');
          }
          this.loading = true;
          this.loginForm.reset();
        });
    }
  }

  signup() {
    this.isSignup = !this.isSignup;
  }
}
