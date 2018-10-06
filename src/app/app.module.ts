import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,

    // Application Modules
    CoreModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
