import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ExtrackerService } from '../extracker.service';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, NgClass, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  num: any;
  budget: any = 50000;

  constructor(public _ExtrackerService: ExtrackerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ExtrackerService.getExpenceData();

  }
  totalexp() {
    let total = this._ExtrackerService.expenseTrackerData || [];
    this.num = 0;
    for (let i = 0; i < total.length; i++) {
      const element = total[i];
      this.num = this.num + element.expenceamount;
    }
    return this.num;
  }

  balacnce() {
    let bal = this.budget - this.num;
    return bal;
  }
}
