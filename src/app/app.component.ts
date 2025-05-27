import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ExpenseComponent } from './expense/expense.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
declare const initFlowbite: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'pegasus_productWeb';
  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        typeof initFlowbite === 'function'
      ) {
        initFlowbite();
      }
    });
  }
}
