import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  heading = 'Expense Tracker';
  form: FormGroup;

  constructor(private router: Router, private formbulider: FormBuilder) {
    this.form = this.formbulider.group({
      loginname: ['', Validators.required],
      loginpassword: ['', Validators.required],
    });
  }

  login(data: any) {
    if (data.loginname == 'afnan' && data.loginpassword == '12345') {
      alert('Login Successfully');
      this.router.navigate(['/expense']);
    } else {
      alert('Login failed');
    }
  }
}
