import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileImageUploadComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
