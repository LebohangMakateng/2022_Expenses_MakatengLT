import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl = environment.apiUrl;
  expenseCache = new Map();
  expenses: Expense[] = [];

  constructor(private http: HttpClient) { }

  deleteExpensee(id: number) {
    return this.http.delete(this.baseUrl + 'expenses/' + id);
  }


  getExpenses(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Expense[]>(this.baseUrl + 'expenses', params, this.http);
  }

  getExpense(id: number) {
    const expense = [...this.expenseCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [] )
      .find((expense: Expense) => expense.id ===id ) ;

    if (expense) {
      return of(expense);
    }
    return this.http.get<Expense>(this.baseUrl + 'expenses/' + id);
  }

  updateExpense(expense: Expense) {
    return this.http.put(this.baseUrl + 'expenses', expense).pipe(
      map(() => {
        const index = this.expenses.indexOf(expense);
        this.expenses[index] = expense;
      })
    );
  }

}