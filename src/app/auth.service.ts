import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userdataUrl = 'http://localhost:3000/users';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  Signup(username: string, password: string) {
    this.loading = true;

    this.http.post(this.userdataUrl, { username, password }).subscribe(() => {
      this.loading = true;

      alert('Account created! Please login');
      this.loading = false;

    });
  }

  login(username: string, password: string) {
    this.loading = true;

    this.http.get<any[]>(`${this.userdataUrl}?username=${username}`).subscribe(
      (users) => {
        if (users.length && users[0].password == password) {
          this.saveUserId(users[0].id);
          setTimeout(() => {

            this.router.navigate(['/expense']);
            this.loading = false;
          }, 2000);
        } else {
          this.loading = true;

          alert('Invalid credentials');
          this.loading = false;

        }

      },
      (error) => {
        console.error('Login error', error);
        alert('Something went wrong during login.');
      }
      
    );
    
  }

  saveUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
