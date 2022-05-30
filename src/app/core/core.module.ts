import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// angular material
import { MatButtonModule } from '@angular/material/button';

// components
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    BannerComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
