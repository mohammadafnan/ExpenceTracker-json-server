import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExtrackerService {
  // expense = [
  //   {
  //     expenceName: 'Electric Bill',
  //     expenceCost: 10000,
  //   },
  //   {
  //     expenceName: 'Internet Bill',
  //     expenceCost: 1500,
  //   },
  //   {
  //     expenceName: 'Maintainance Bill',
  //     expenceCost: 20000,
  //   },
  //   {
  //     expenceName: 'Gas Bill',
  //     expenceCost: 1000,
  //   },
  //   {
  //     expenceName: 'Petrol Cost',
  //     expenceCost: 3000,
  //   },
  // ];

  budget: any = [];
  getdata: any = [];
  copygetdata: any = [];
  postdata: any;

  expencedataUrl = 'http://localhost:3000/expense';
  constructor(private http: HttpClient) {}

  getExpenceData() {
    this.http.get(this.expencedataUrl).subscribe((expdata) => {
      this.getdata = expdata;
      this.copygetdata = this.getdata;
    });
  }
  addExpenceData(data: any) {
    this.http.post(this.expencedataUrl, data).subscribe((expostdata) => {
      this.getExpenceData();
    });
  }
  updateExpenceData(editid: number, updatedata: any) {
    this.http
      .put(`${this.expencedataUrl}/${editid}`, updatedata)
      .subscribe((editdata) => {
        const ind = this.getdata.findIndex((exp: any) => exp.id === editid);
        if (ind !== -1) {
          this.getdata[ind] = editdata;
        }
      });
  }

  deleteExpenceData(delid: number, updatedata: any) {
    this.http
      .delete(`${this.expencedataUrl}/${delid}`, updatedata)
      .subscribe((deletedata) => {
        const ind = this.getdata.findIndex((exp: any) => exp.id === delid);
        if (ind !== -1) {
          this.getdata[ind] = deletedata;
        }
        this.getExpenceData();
      });
  }
}
