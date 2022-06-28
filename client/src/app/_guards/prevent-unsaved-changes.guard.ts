import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpenseUpdateComponent } from '../expenses/expense-update/expense-update.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmSevice: ConfirmService) {}

  canDeactivate( component: ExpenseUpdateComponent):  Observable<boolean> | boolean {
    if(component.editForm.dirty)
    {
      return this.confirmSevice.confirm()
    }
    return true;
  }
  
}
