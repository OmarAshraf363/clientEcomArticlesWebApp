import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { FeaturesModule } from './features/features.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ArticlesRoutingModule } from './features/articles/articles-routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CredentialsInterceptor } from './core/interceptors/addWithCarditaits.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader';
import { ErrorInterceptor } from './core/interceptors/erorr-handling';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LayoutModule, 
    FeaturesModule
  
    ,HttpClientModule,
  NgxEditorModule    ,
  MatCommonModule,
  MatFormFieldModule
  
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide:HTTP_INTERCEPTORS,useClass:CredentialsInterceptor,multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }


    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
