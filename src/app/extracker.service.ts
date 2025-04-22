import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExtrackerService {
  bigbudget: any = [];
  getdata: any = [];
  copygetdata: any = [];
  postdata: any;

  expencedataUrl = 'http://localhost:3000/expenses';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getExpenceData() {
    const userId = localStorage.getItem('userId');
    this.http
      .get(`${this.expencedataUrl}?userId=${userId}`)
      .subscribe((expdata) => {
        this.getdata = expdata;
        this.copygetdata = this.getdata;
      });
  }

  addExpenceData(data: any) {
    const userId = localStorage.getItem('userId');
    const newData = { ...data, userId };
    console.log('Submitting new expense:', newData);
    this.http.post(this.expencedataUrl, newData).subscribe(() => {
      this.getExpenceData();
    });
  }

  updateExpenceData(editid: number, updatedata: any) {
    const userId = localStorage.getItem('userId');
    const newData = { ...updatedata, userId };
    this.http
      .put(`${this.expencedataUrl}/${editid}`, newData)
      .subscribe((editdata) => {
        const ind = this.getdata.findIndex((exp: any) => exp.id === editid);
        if (ind !== -1) {
          this.getdata[ind] = editdata;
        }
      });
  }

  deleteExpenceData(delid: number, updatedata: any) {
    const userId = localStorage.getItem('userId');
    const newData = { ...updatedata, userId };
    this.http
      .delete(`${this.expencedataUrl}/${delid}`, newData)
      .subscribe((deletedata) => {
        const ind = this.getdata.findIndex((exp: any) => exp.id === delid);
        if (ind !== -1) {
          this.getdata[ind] = deletedata;
        }
        this.getExpenceData();
      });
  }
}
