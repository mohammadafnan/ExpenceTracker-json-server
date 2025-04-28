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
  allData: any = [];
  expencedataUrl = 'http://localhost:3000/expense';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getExpenceData() {
    const userId = localStorage.getItem('userId');
    this.http.get<any>(this.expencedataUrl).subscribe((expdata) => {
      this.getdata = expdata.expense;
      this.copygetdata = this.getdata;
    });
  }

  // addExpenceData(data: any) {
  //   const userId = localStorage.getItem('userId');
  //   const newData = { ...data, userId };
  //   this.http.post(this.expencedataUrl, newData).subscribe(() => {
  //     this.getExpenceData();
  //   });
  // }

  addExpenceData(data: any) {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const newData = { ...data, userId, id: this.generateId() };

      // Make sure the user's expense array exists
      this.getdata[userId] = this.getdata[userId] || [];

      // Push new expense to that user's array
      this.getdata[userId].push(newData);

      // Send wrapped data: { expense: { 01d9: [...], 7c2e: [...] } }
      const wrappedExpenseData = { expense: this.getdata };

      // PUT the updated "expense" object to API
      this.http.put(this.expencedataUrl, wrappedExpenseData).subscribe({
        next: () => {
          console.log('Expense added and saved to backend:', newData);
          this.getExpenceData(); // Refresh from backend
        },

        error: (err) => {
          console.error('Failed to add expense to backend:', err);
        },
      });

      console.log('New expense added locally:', newData);
    }
  }

 

  updateExpenceData(editid: number, updatedata: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const updatedExpense = { ...updatedata, userId, id: this.generateId() };

    // Find the index of the item to update in that user's expense array
    const userExpenses = this.getdata[userId];
    const index = userExpenses.findIndex((exp: any) => exp.id === editid);

    if (index !== -1) {
      // Update it locally
      userExpenses[index] = updatedExpense;

      // Wrap it in { expense: ... } and PUT to backend
      this.http.put(this.expencedataUrl, { expense: this.getdata }).subscribe({
        next: () => {
          console.log('Expense updated in backend.');
          this.getExpenceData(); // Refresh data
        },
        error: (err) => {
          console.error('Failed to update expense:', err);
        },
      });
    }
  }

  deleteExpenceData(delid: number) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    const userExpenses = this.getdata[userId];
  
    if (!userExpenses) return;
  
    // Find the index of the item to delete
    const index = userExpenses.findIndex((exp: any) => exp.id === delid);
  
    if (index !== -1) {
      // Remove the expense locally
      userExpenses.splice(index, 1);
  
      // Send updated data back to the backend
      this.http.put(this.expencedataUrl, { expense: this.getdata }).subscribe({
        next: () => {
          console.log('Expense deleted successfully.');
          this.getExpenceData(); // Refresh the UI
        },
        error: (err) => {
          console.error('Failed to delete expense:', err);
        },
      });
    }
  }
  
 

  get expenseTrackerData() {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      return this.getdata[userId as string] || [];
    }
    return [];
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 6);
  }
}
