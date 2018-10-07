import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,

    DashboardRoutingModule,
    FlexLayoutModule,
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule {
}
