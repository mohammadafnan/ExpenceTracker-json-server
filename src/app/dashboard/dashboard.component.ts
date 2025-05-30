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
  budget: number = 50000;

  constructor(
    public _ExtrackerService: ExtrackerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this._ExtrackerService.getExpenceData();

    // Only run in the browser
    // if (isPlatformBrowser(this.platformId)) {
    //   const chartEl = document.getElementById('labels-chart');
    //   if (chartEl) {
    //     const chart = new ApexCharts(chartEl, this.options);
    //     chart.render();
    //   }
    // }
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const ApexCharts = (await import('apexcharts')).default;

      const chartEl = document.getElementById('labels-chart');
      if (chartEl) {
        const chart = new ApexCharts(chartEl, this.options);
        chart.render();
      }
    }
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

  balacnce(): number {
    return this.budget - this.num;
  }

  options: ApexOptions = {
    chart: {
      height: '100%',
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: false,
      x: {
        show: false,
      },
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: 'New users',
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        // color: '#1A56DB',
        color: '#1A56DB',
      },
    ],
    xaxis: {
      categories: [
        '01 February',
        '02 February',
        '03 February',
        '04 February',
        '05 February',
        '06 February',
        '07 February',
      ],
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
  };
}
