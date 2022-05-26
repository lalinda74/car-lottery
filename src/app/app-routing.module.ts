import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericComponent } from './components/layouts/generic/generic.component';

const routes: Routes = [
  { 
    path: 'contact',
    component: GenericComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule) },
    ]
  },
  { 
    path: 'personal',
    loadChildren: () => import('./modules/personal/personal.module').then(m => m.PersonalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
