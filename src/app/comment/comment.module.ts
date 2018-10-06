import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatMenuModule,
  MatChipsModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
} from '@angular/material';

import { CommentComponent, CommentDialogComponent } from './comment.component';
import { CommentRoutingModule } from './comment.routing';
import { CommentService } from './comment.service';
import { DialogsModule } from '../shared/dialogs/dialogs.module';


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
  ]
})
export class CommentModule {
}
