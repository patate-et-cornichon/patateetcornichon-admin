import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule, MatListModule, MatGridListModule, MatCardModule,
} from '@angular/material';

import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from '../app-routing.module';

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
    AppRoutingModule,
  ],
  exports: [
    NavComponent,
  ],
  declarations: [
    NavComponent,
  ],
})
export class CoreModule {
}
