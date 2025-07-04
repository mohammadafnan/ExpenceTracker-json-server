import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userdataUrl = 'http://localhost:3000/users';
  loading: boolean = false;
  err: boolean = false;
  err2: boolean = false;

  succ: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}
  // if (typeof window !== 'undefined') {
  // }
  signup(username: string, password: string) {
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
          this.saveUserId(users[0].id, users[0].username);
          this.succ = true;

          setTimeout(() => {
            this.router.navigate(['/expense']);

            this.loading = false;
            this.succ = false;
          }, 200);
        } else {
          this.loading = true;

          this.err = true;
          setTimeout(() => {
            this.err = false;
          }, 1500);
          this.loading = false;
        }
      },
      (error) => {
        console.error('Login error', error);
        this.err2 = true;
        setTimeout(() => {
          this.err2 = false;
        }, 5000);
      }
    );
  }

  saveUserId(userId: string, username: string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUserName() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return [];
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
