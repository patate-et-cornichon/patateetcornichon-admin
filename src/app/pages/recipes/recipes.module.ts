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

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogsModule } from '../../shared/components/dialogs/dialogs.module';
import { MatFileInputModule } from '../../shared/components/mat-file-input/mat-file-input.module';
import { CapitalizeFirstModule } from '../../shared/pipes/capitalize-first/capitalize-first.module';
import {
  RecipesManagementCreateComponent,
  RecipesManagementEditComponent,
} from './recipes-management/recipes-management.component';
import {
  RecipesSelectionsManagementCreateComponent,
  RecipesSelectionsManagementEditComponent,
} from './recipes-selections/recipes-selections-management/recipes-selections-management';
import { RecipesSelectionsComponent } from './recipes-selections/recipes-selections.component';
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
    DragDropModule,
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
    RecipesSelectionsComponent,
    RecipesSelectionsManagementCreateComponent,
    RecipesSelectionsManagementEditComponent,
  ],
  providers: [
    RecipesService,
  ],
})
export class RecipesModule {
}
