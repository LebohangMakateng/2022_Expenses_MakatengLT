import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  deleteExpensee(id: number) {
    return this.http.delete(this.baseUrl + 'expenses/' + id);
  }


  getExpenses(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Expense[]>(this.baseUrl + 'expenses', params, this.http);
  }

}