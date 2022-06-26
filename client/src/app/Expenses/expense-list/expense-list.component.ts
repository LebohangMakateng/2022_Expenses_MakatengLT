import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expense } from 'src/app/_models/expense';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { getPaginatedResult, getPaginationHeaders } from 'src/app/_services/paginationHelper';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private confirmService: ConfirmService, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.loading = true;
    this.expenseService.getExpenses(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.expenses = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  deleteExpense(id: number) {
    this.confirmService.confirm('confirm delete expense', 'This cannot be undone').subscribe(result =>{
      if (result) {
        this.expenseService.deleteExpensee(id).subscribe(() => {
          this.expenses.splice(this.expenses.findIndex(ex => ex.id === id), 1);
        })
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadExpenses();
  }

}
