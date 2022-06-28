import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ToastrModule} from 'ngx-toastr';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ExpenseListComponent } from './Expenses/expense-list/expense-list.component';
import { ExpenseUpdateComponent } from './expenses/expense-update/expense-update.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { SharedModule } from './_modules/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ContactComponent,
    DisclaimerComponent,
    NotFoundComponent,
    ExpenseListComponent,
    ExpenseUpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }