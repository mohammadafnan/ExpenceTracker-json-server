import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ExtrackerService } from '../extracker.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  heading = 'Expense Tracker';

  constructor(
    public auth: AuthService,
    public extracker: ExtrackerService,
    public router: Router
  ) {}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.extracker.currentRoute = this.router.routerState.snapshot.url;
    // alert(this.extracker.currentRoute);
  }
}
