import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import {
  isPlatformBrowser,
  CurrencyPipe,
  NgClass,
  NgIf,
} from '@angular/common';
// import ApexCharts from 'apexcharts';
import type { ApexOptions } from 'apexcharts';
import { ExtrackerService } from '../extracker.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  num: number = 0;
  budget: any = 0;

  constructor(
    public _ExtrackerService: ExtrackerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this._ExtrackerService.getExpenceData();
    this.findhighexpense()
    // this._ExtrackerService.budget
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

  findhighexpense() {
    let expense = this._ExtrackerService.expenseTrackerData || []
    let maxValue = expense[0]
    for (let x = 0; x < expense.length; x++) {
      if (expense[x].expenceamount > maxValue.expenceamount) {
        maxValue = expense[x].expenceamount;
      }
    }

    return maxValue;
  }
  balacnce(): number {
    this.budget = localStorage.getItem('budget');
    return this.getUserBudget() - this.num;
  }

  getUserBudget() {
    const userId: any = localStorage.getItem('userId');
    const userBudgets = JSON.parse(localStorage.getItem('userBudgets') || '{}');
    return userBudgets[userId] || 0;
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const ApexCharts = (await import('apexcharts')).default;

      // Step 1: Get dynamic user expense data
      const expenseData = this._ExtrackerService.expenseTrackerData || [];

      // Step 2: Group data by date and sum amounts
      const expenseMap = new Map<string, number>();

      expenseData.forEach((entry: any) => {
        const date = entry.expencedate;
        const amount = entry.expenceamount;

        if (expenseMap.has(date)) {
          expenseMap.set(date, expenseMap.get(date) + amount);
        } else {
          expenseMap.set(date, amount);
        }
      });

      // Step 3: Sort dates and prepare chart data
      const sortedDates = Array.from(expenseMap.keys()).sort();
      const seriesData = sortedDates.map((date) => expenseMap.get(date));
      const categories = sortedDates.map((date) =>
        new Date(date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
        })
      );

      // Step 4: Define chart options
      const options = {
        series: [
          {
            name: 'Expense data',
            data: seriesData,
            color: '#1A56DB',
          },
        ],
        chart: {
          type: 'area',
          height: 350,
        },
        xaxis: {
          categories: categories,
          labels: { show: true },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          show: true,
        },
        tooltip: {
          enabled: false,
          x: { show: false },
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: '#1C64F2',
            gradientToColors: ['#1C64F2'],
          },
        },
        dataLabels: { enabled: true },
        stroke: { width: 5 },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: 0,
          },
        },
      };

      // Step 5: Render chart
      const chartEl = document.getElementById('labels-chart');
      if (chartEl) {
        const chart = new ApexCharts(chartEl, options);
        chart.render();
      }
    }
  }
}
