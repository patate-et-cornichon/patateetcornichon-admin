import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';

import { AuthHttpInterceptor } from './auth/auth.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import {
  LayoutWrapperComponent,
  LayoutWrapperDirective,
} from './layout/layout-wrapper.component';
import { LayoutWrapperService } from './layout/layout-wrapper.service';
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
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    CoreRoutingModule,
  ],
  exports: [
    NavComponent,
    LayoutComponent,
    LayoutWrapperComponent,
    LayoutWrapperDirective,
  ],
  declarations: [
    PrivateLayoutComponent,
    LayoutComponent,
    NavComponent,
    LayoutWrapperComponent,
    LayoutWrapperDirective,
  ],
  entryComponents: [
    LayoutWrapperComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    LayoutWrapperService,
  ],
})
export class CoreModule {
}
