import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './services/contact.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class CoreModule { }
