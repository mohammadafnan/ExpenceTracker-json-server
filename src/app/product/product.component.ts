import { Component, Optional } from '@angular/core';
import { ExtrackerService } from '../extracker.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor, NgClass, NgIf, CurrencyPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as XLSX from 'xlsx'; // Import SheetJS

@Component({
  selector: 'app-product',
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    FormsModule,
    CurrencyPipe,
  ],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ProductComponent {
  heading = 'Expense Tracker';
  form: FormGroup;
  form2: FormGroup;
  isedit = false;
  iseditid: number | null = null;
  budget: any;
  num: any;

  ngOnInit(): void {
    this._ExtrackerService.getExpenceData();
  }

  constructor(
    public _ExtrackerService: ExtrackerService,
    private formbulider: FormBuilder
  ) {
    this.form = this.formbulider.group({
      expencename: ['', Validators.required],
      expenceamount: ['', Validators.required],
    });
    this.form2 = this.formbulider.group({
      addbudget: ['', Validators.required],
    });
  }

  addBudget() {
    this.budget = this._ExtrackerService.budget.push(this.form2.value);
    // alert(this.budget);
    this.form2.reset();
    return this.budget;

  }

  addexpence() {
    if (this.iseditid) {
      // Edit  expense
      this._ExtrackerService.updateExpenceData(this.iseditid, this.form.value);
      alert('Updated Expense Successfully');
    } else {
      // Add new expense
      this._ExtrackerService.addExpenceData(this.form.value);
      alert('Added Expense Successfully');
    }
    this.form.reset();
  }

  editExpense(item: any) {
    this.isedit == true;
    this.form.patchValue({
      expencename: item.expencename,
      expenceamount: item.expenceamount,
    });
    this.iseditid = item.id;
  }

  deleteExpense(item: any) {
    this._ExtrackerService.deleteExpenceData(item.id, this.form.value);
    alert('Deleted Expense Successfully');
  }

  totalexp() {
    let total = this._ExtrackerService.getdata;
    this.num = 0;
    for (let i = 0; i < total.length; i++) {
      const element = total[i];
      this.num = this.num + element.expenceamount;
    }
    return this.num;
  }
  // totalbud() {
  //   this.budget = 50000;
  //   return this.budget;
  // }

  balacnce() {
    let bal = this.budget - this.num;
    return bal;
  }

  exportToExcel(): void {
    const element: any = document.getElementById('excel-table');
    // Remove action columns (Delete and Edit) from cloned table
    const headerRow = element.tHead.rows[0];
    headerRow.deleteCell(3); // Remove "Delete" header (4th column)
    headerRow.deleteCell(3); // Remove "Edit" header (now 4th column after previous deletion)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    XLSX.writeFile(wb, 'expenses.xlsx');
  }

  // exportToExcel(): void {
  //   // Clone the original table to avoid modifying the DOM element directly
  //   const originalTable: any = document.getElementById('excel-table');
  //   // const clonedTable: any = originalTable.cloneNode(true) as HTMLTableElement;

  //   // Create worksheet and workbook from modified table
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(originalTable);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

  //   // Trigger download
  //   XLSX.writeFile(wb, 'expenses.xlsx');
  // }

  search(text: any) {
    this._ExtrackerService.getdata = this._ExtrackerService.copygetdata.filter(
      (x: any) =>
        x.expencename.toLowerCase().indexOf(text) >= 0 ||
        x.expenceamount.toString().toLowerCase().indexOf(text) >= 0
    );
  }
}
