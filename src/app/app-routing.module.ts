import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericComponent } from './components/layouts/generic/generic.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ImageRouterGuardService } from './core/services/guards/image-router-guard.service';

// router guards
import { PersonalDataGuardService } from './core/services/guards/personal-data-guard.service';
import { SuccessRouterGuardService } from './core/services/guards/success-router-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: GenericComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/contact/contact.module').then(
            (m) => m.ContactModule
          ),
      },
    ],
  },
  {
    path: 'personal',
    component: GenericComponent,
    children: [
      {
        path: '',
        canLoad: [PersonalDataGuardService],
        loadChildren: () =>
          import('./modules/personal/personal.module').then(
            (m) => m.PersonalModule
          ),
      },
    ],
  },
  {
    path: 'image-upload',
    component: GenericComponent,
    children: [
      {
        path: '',
        canLoad: [PersonalDataGuardService, ImageRouterGuardService],
        loadChildren: () =>
          import('./modules/image/image.module').then((m) => m.ImageModule),
      },
    ],
  },
  {
    path: 'success/:lotteryID',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/success/success.module').then(
            (m) => m.SuccessModule
          ),
      },
    ],
  },
  {
    path: 'error',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
