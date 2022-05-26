import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// modules
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { GenericComponent } from './components/layouts/generic/generic.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptor/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GenericComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // modules
    SharedModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [  
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: AuthInterceptorService,  
      multi: true  
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
