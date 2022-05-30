import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalRoutingModule } from './personal-routing.module';

// angular material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// components
import { PersonalDataComponent } from './personal-data/personal-data.component';

@NgModule({
  declarations: [
    PersonalDataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonalRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PersonalModule { }
