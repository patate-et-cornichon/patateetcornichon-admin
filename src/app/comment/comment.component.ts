import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

import { CommentService } from './comment.service';
import { Comment, PaginatedComments } from './comment.interface';
import { MessageService } from '../core/message/message.service';
import { ConfirmationDialogComponent } from '../shared/dialogs/confirmation-dialog.component';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  displayedColumns: string[] = [
    'comment',
    'post',
    'type',
    'author',
    'email',
    'created',
    'valid',
    'actions',
  ];
  resultsLength = 0;
  pageSize = 0;
  isLoadingResults = true;
  data: Comment[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private commentService: CommentService,
    private messageService: MessageService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.initPaginator();
  }

  /**
   * Init pagination
   */
  initPaginator() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.commentService.getComments(this.paginator.pageIndex + 1);
        }),
        map((data: PaginatedComments) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;
          this.pageSize = data.page_size;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => this.data = data);
  }

  /**
   * Update the selected comment with a new published value
   *
   * @param e
   * @param commentId
   */
  togglePublished(e: MatSlideToggleChange, commentId: string) {
    const data: object = {
      is_valid: e.checked,
    };
    this.commentService.patchComment(commentId, data)
      .subscribe(
        () => this.messageService.showMessage('Commentaire mis à jour !')
      );
  }

  /**
   * Delete comment from server and update comments data
   *
   * @param comment
   */
  deleteRecipe(comment: Comment) {
    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Supprimer ?',
        content: 'Confirmes-tu la supression de ce commentaire ?',
      }
    });

    // Update list after comment is deleted
    dialogRef
      .afterClosed()
      .subscribe(result => {
          if (result) {
            this.commentService
              .deleteComment(comment.id)
              .subscribe(
                () => {
                  this.messageService.showMessage('Commentaire supprimé !');
                  this.data = this.data.filter(e => e.id !== comment.id);
                }
              );
          }
        }
      );
  }
}
