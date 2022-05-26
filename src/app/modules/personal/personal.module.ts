import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { PersonalRoutingModule } from './personal-routing.module';



@NgModule({
  declarations: [
    PersonalDataComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ]
})
export class PersonalModule { }
