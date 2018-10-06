import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';

import { AuthHttpInterceptor } from './auth/auth.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import {
  LayoutComponent,
  PrivateLayoutComponent,
} from './layout/layout.component';
import { NavComponent } from './nav/nav.component';


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
