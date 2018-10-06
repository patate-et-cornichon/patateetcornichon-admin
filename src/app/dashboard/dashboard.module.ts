import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule, MatIconModule, MatMenuModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule {
}
