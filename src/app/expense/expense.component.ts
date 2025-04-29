import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Query,
  SimpleChanges,
} from '@angular/core';
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
import { promiseHooks } from 'node:v8';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ExpenseComponent
  implements
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    AfterContentChecked,
    OnDestroy,
    OnChanges
{
  heading = 'Expense Tracker';
  form: FormGroup;
  // form2: FormGroup;
  isedit = false;
  iseditid: number | null = null;
  budget: any = 50000;
  num: any;
  number1: any;
  isbtn = true;

  ngOnInit(): void {




    console.log('ngOninit');



    
    this._ExtrackerService.getExpenceData();
    // console.log(this._ExtrackerService.copygetdata +"check service");

    //Start Q1
    // var type
    var x = 1;
    if (true) {
      var x = 22;
      console.log(x);
    }
    console.log(x);

    // let type
    let a = 0;
    if (true) {
      let a = 1;
      console.log(a);
    }
    console.log(a);

    // const type
    const z = 10;
    // z = 100;
    console.log(z);
    //End Q1

    //Start Q2
    var array: any[] = [];
    var arr = array.push('afnan', 100, true);
    console.log('It will reture length is' + ' ' + arr);
    //End Q2

    //Start Q3
    let obj = { carname: 'hyundai', model: 2025 };
    console.log(obj);
    console.log(obj.carname);
    console.log(obj.model);
    let objname = obj;
    objname.carname = 'hyundai 503';
    console.log(obj);
    //End Q3

    //Start Q4
    // sync
    console.log('Server A');
    console.log('Server B');
    console.log('Server C');

    // Async
    console.log('Server X');
    setTimeout(() => {
      console.log('Server Y');
    }, 2000);
    console.log('Server Z');

    // async await
    console.log('i');

    async function great() {
      await new Promise((res) => setTimeout(res, 2000));
      console.log('j');
    }
    console.log('k');
    great();
    //End Q4

    /////code practice....
    var d = 0;
    console.log(d + 'this is z');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');

    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');

    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  constructor(
    private router: Router,
    public _ExtrackerService: ExtrackerService,
    private formbulider: FormBuilder,
    public auth: AuthService
  ) {
    this.form = this.formbulider.group({
      expencename: ['', Validators.required],
      expenceamount: ['', Validators.required],
      expencedate: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
    });
    // this.form2 = this.formbulider.group({
    //   addbudget: ['', Validators.required],
    // });
    console.log('constructor');
  }

  addBudget() {
    this.budget = this.number1;
    alert('Budget added Successfully');
    this.number1 = '';
  }

  addexpense() {
    if (this.iseditid) {
      // Edit  expense
      this._ExtrackerService.updateExpenceData(this.iseditid, this.form.value);
      alert('Updated Expense Successfully');
      this.iseditid = null;
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
      expencedate: item.expencedate,
    });
    this.iseditid = item.id;
  }

  deleteExpense(item: any) {
    this._ExtrackerService.deleteExpenceData(item.id);
    alert('Deleted Expense Successfully');
  }

  totalexp() {
    let total = this._ExtrackerService.expenseTrackerData;
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

  exportToExcel(): void {
    const element: any = document.getElementById('excel-table');
    // Remove action columns (Delete and Edit) from cloned table
    const headerRow = element.tHead.rows[0];
    headerRow.deleteCell(4); // Remove "Delete" header (4th column)
    headerRow.deleteCell(4); // Remove "Edit" header (now 4th column after previous deletion)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    XLSX.writeFile(wb, 'expenses.xlsx');
  }

  search(text: any) {

    this._ExtrackerService.getdata = this._ExtrackerService.copygetdata.filter(
      (x: any) =>
        x.expencename.toLowerCase().indexOf(text) >= 0 ||
        x.expenceamount.toString().toLowerCase().indexOf(text) >= 0
    );
  }


  

  check(val: any) {
    return val;
  }
}
