import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
} from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  PrivateLayoutComponent,
  LayoutComponent,
} from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { CoreRoutingModule } from './core-routing.module';
import { AuthHttpInterceptor } from './auth/auth.interceptor';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,

    CoreRoutingModule,
  ],
  exports: [
    NavComponent,
    LayoutComponent,
  ],
  declarations: [
    PrivateLayoutComponent,
    LayoutComponent,
    NavComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
})
export class CoreModule {
}
