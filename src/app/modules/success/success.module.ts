import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessRoutingModule } from './success-routing.module';

// material components
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// components
import { LotterySuccessComponent } from './lottery-success/lottery-success.component';



@NgModule({
  declarations: [
    LotterySuccessComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class SuccessModule { }
