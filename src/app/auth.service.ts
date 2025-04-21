import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getCurrentUserId() {
    return localStorage.getItem('userId');
  }

  login(userId: string) {
    localStorage.setItem('userId', userId);
  }

  logout() {
    localStorage.removeItem('userId');
  }

  isLoggedIn() {
    return !!this.getCurrentUserId();
  }
}
