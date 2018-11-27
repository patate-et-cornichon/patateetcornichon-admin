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

import { CapitalizeFirstModule } from '../../shared/pipes/capitalize-first/capitalize-first.module';
import { DialogsModule } from '../../shared/components/dialogs/dialogs.module';
import { MatFileInputModule } from '../../shared/components/mat-file-input/mat-file-input.module';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing';
import { BlogService } from './blog.service';
import { BlogManagementCreateComponent, BlogManagementEditComponent } from './management/blog-management.component';


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

    BlogRoutingModule,
    CapitalizeFirstModule,
    DialogsModule,
    MatFileInputModule,
  ],
  declarations: [
    BlogComponent,
    BlogManagementCreateComponent,
    BlogManagementEditComponent,
  ],
  providers: [
    BlogService,
  ],
})
export class BlogModule {
}
