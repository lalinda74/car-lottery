import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotterySuccessComponent } from './lottery-success/lottery-success.component';

const routes: Routes = [
    {
        path: '',
        component: LotterySuccessComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessRoutingModule { }
