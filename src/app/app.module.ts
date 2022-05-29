import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects, metaReducers, appReducers } from './store';

// modules
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './core/core.module';

// componenents
import { AppComponent } from './app.component';
import { GenericComponent } from './components/layouts/generic/generic.component';

// services
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptor/auth-interceptor.service';


import { environment } from 'src/environments/environment';

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
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
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
