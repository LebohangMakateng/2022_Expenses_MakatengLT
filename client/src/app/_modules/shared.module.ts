import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {TimeagoModule} from 'ngx-timeago';
import {ModalModule} from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    ModalModule
  ]
})
export class SharedModule { }