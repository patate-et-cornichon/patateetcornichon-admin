import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
} from '@angular/material';

import { CapitalizeFirstModule } from '../pipes/capitalize-first/capitalize-first.module';
import { DialogsModule } from '../shared/dialogs/dialogs.module';
import { MatFileInputModule } from '../shared/mat-file-input/mat-file-input.module';
import {
  RecipesManagementCreateComponent,
  RecipesManagementEditComponent,
} from './management/recipes-management.component';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes.routing';
import { RecipesService } from './recipes.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FlexLayoutModule,

    RecipesRoutingModule,
    CapitalizeFirstModule,
    DialogsModule,
    MatFileInputModule,
  ],
  declarations: [
    RecipesComponent,
    RecipesManagementCreateComponent,
    RecipesManagementEditComponent,
  ],
  providers: [
    RecipesService,
  ],
})
export class RecipesModule {
}
