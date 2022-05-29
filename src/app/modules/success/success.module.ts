import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessRoutingModule } from './success-routing.module';

// components
import { LotterySuccessComponent } from './lottery-success/lottery-success.component';



@NgModule({
  declarations: [
    LotterySuccessComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule
  ]
})
export class SuccessModule { }
