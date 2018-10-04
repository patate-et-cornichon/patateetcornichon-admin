import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from '@angular/material';

import { CommentComponent } from './comment.component';
import { CommentRoutingModule } from './comment.routing';
import { CommentService } from './comment.service';


@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatChipsModule,

    CommentRoutingModule,
  ],
  declarations: [
    CommentComponent,
  ],
  providers: [
    CommentService,
  ]
})
export class CommentModule {
}
