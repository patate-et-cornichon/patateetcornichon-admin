import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule,
} from '@angular/material';

import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes.routing';
import { RecipesService } from './recipes.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,

    RecipesRoutingModule,
  ],
  declarations: [
    RecipesComponent
  ],
  providers: [
    RecipesService
  ]
})
export class RecipesModule {
}
