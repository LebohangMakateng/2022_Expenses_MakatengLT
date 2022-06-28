import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { ExpenseListComponent } from './Expenses/expense-list/expense-list.component';
import { ExpenseUpdateComponent } from './expenses/expense-update/expense-update.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'expenses', component: ExpenseListComponent},
      {path: 'expense/edit', component: ExpenseUpdateComponent, canDeactivate: [PreventUnsavedChangesGuard]}
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'disclaimer', component: DisclaimerComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
