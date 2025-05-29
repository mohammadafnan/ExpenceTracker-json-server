import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ExtrackerService } from '../extracker.service';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  heading = 'Expense Tracker';

  constructor(public auth: AuthService, public extracker: ExtrackerService) {}

}
