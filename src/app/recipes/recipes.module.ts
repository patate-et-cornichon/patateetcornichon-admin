import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatCheckboxModule,
  MatMenuModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipesComponent } from './recipes.component';
import {
  RecipesManagementCreateComponent,
  RecipesManagementEditComponent,
} from './management/recipes-management.component';
import { RecipesRoutingModule } from './recipes.routing';
import { RecipesService } from './recipes.service';
import { DialogsModule } from '../shared/dialogs/dialogs.module';
import { MatFileInputModule } from '../shared/mat-file-input/mat-file-input.module';
import { CapitalizeFirstPipe } from '../pipes/capitalize-first.pipe';


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
    FlexLayoutModule,

    RecipesRoutingModule,
    DialogsModule,
    MatFileInputModule,
  ],
  declarations: [
    RecipesComponent,
    RecipesManagementCreateComponent,
    RecipesManagementEditComponent,
    CapitalizeFirstPipe,
  ],
  providers: [
    RecipesService
  ]
})
export class RecipesModule {
}
