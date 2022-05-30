import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageRoutingModule } from './image-routing.module';

// material components
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// components
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';

@NgModule({
  declarations: [
    ProfileImageUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageRoutingModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ImageModule { }
