import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ExtrackerService } from '../extracker.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(public router: Router,public auth:AuthService,public extracker:ExtrackerService) {}

  gotodash() {
    this.router.navigate(['/dashboard']);
    // location.replace('/dashboard');

  }

  gotoexpense() {
    this.router.navigate(['/expense']);
    // location.replace('/expense');

  }

 
}
