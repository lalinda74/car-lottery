import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageRoutingModule } from './image-routing.module';

// components
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';

@NgModule({
  declarations: [
    ProfileImageUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageRoutingModule
  ]
})
export class ImageModule { }
