import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes.routing';
import { RecipesService } from './recipes.service';
import { ConfirmationDialogComponent } from '../shared/dialogs/confirmation-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,

    RecipesRoutingModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  declarations: [
    RecipesComponent,
    ConfirmationDialogComponent,
  ],
  providers: [
    RecipesService
  ]
})
export class RecipesModule {
}
