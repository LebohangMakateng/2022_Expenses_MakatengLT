import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Expense } from 'src/app/_models/expense';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExpenseService } from 'src/app/_services/expense.service';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.css']
})
export class ExpenseUpdateComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm
  expense: Expense;
  user: User;
  @HostListener('window:beforeunload', ['$event]']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private expenseService: ExpenseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense() {
    this.expenseService.getExpense(this.expense.id).subscribe(expense => {
      this.expense = this.expense;
    });
  }

  updateExpense() {
    this.expenseService.updateExpense(this.expense).subscribe(() =>{
      this.toastr.success('Profile pdated succesfully');
      this.editForm.reset(this.expense)
    })
  }

}
