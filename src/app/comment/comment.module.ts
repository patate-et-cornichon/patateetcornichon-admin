import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
} from '@angular/material';

import { DialogsModule } from '../shared/dialogs/dialogs.module';
import { CommentComponent, CommentDialogComponent } from './comment.component';
import { CommentRoutingModule } from './comment.routing';
import { CommentService } from './comment.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,

    CommentRoutingModule,
    DialogsModule,
  ],
  declarations: [
    CommentComponent,
    CommentDialogComponent,
  ],
  entryComponents: [
    CommentDialogComponent,
  ],
  providers: [
    CommentService,
  ],
})
export class CommentModule {
}
