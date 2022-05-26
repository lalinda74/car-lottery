import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';

// angular material
import { MatInputModule } from '@angular/material/input';

import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactRoutingModule,
    MatInputModule
  ]
})
export class ContactModule { }
