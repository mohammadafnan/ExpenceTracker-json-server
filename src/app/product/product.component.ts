import { Component } from '@angular/core';
import { ExtrackerService } from '../extracker.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor, NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [NgFor, ReactiveFormsModule, NgClass,NgIf],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ProductComponent {
  heading = 'Expense Tracker';
  form: FormGroup;
  isedit = false;
  iseditid: number | null = null;

  ngOnInit(): void {
    this._ExtrackerService.getExpenceData();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.load();
  }

  constructor(
    public _ExtrackerService: ExtrackerService,
    private formbulider: FormBuilder
  ) {
    this.form = this.formbulider.group({
      expencename: ['', Validators.required],
      expenceamount: ['', Validators.required],
    });
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
    this.isedit == true
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
    let num = 0;
    for (let i = 0; i < total.length; i++) {
      const element = total[i];
      num = num + element.expenceamount;
    }
    return num;
  }
  totalbud(){
    let budget = 50000
    return budget
  }
}
