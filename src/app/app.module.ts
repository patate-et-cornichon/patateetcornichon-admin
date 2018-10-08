import { LayoutModule } from '@angular/cdk/layout';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeCaExtra from '@angular/common/locales/extra/fr';
import localeCa from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

registerLocaleData(localeCa, 'fr-CA', localeCaExtra);

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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-CA' },
  ],
})
export class AppModule {
}
