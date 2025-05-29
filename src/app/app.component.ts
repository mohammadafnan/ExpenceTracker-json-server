import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ExpenseComponent } from './expense/expense.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExtrackerService } from './extracker.service';
declare const initFlowbite: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'pegasus_productWeb';
  constructor(private router: Router,public extracker:ExtrackerService) {}

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
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
