import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSlideToggleChange, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutWrapperService } from '../../core/layout/layout-wrapper.service';
import { MessageService } from '../../core/message/message.service';
import { ConfirmationDialogComponent } from '../../shared/components/dialogs/confirmation-dialog.component';
import { Comment, PaginatedComments } from './comment.interface';
import { CommentService } from './comment.service';


@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
})
export class CommentDialogComponent {
  isPosting = false;

  formGroup = new FormGroup({
    content: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public comment: Comment,
    private commentService: CommentService,
    private messageService: MessageService,
  ) {
  }

  submit() {
    const content = this.formGroup.get('content');
    if (content.valid) {
      this.isPosting = true;

      // Make multiple requests
      let requests = [];
      if (!this.comment.is_valid) {
        requests = [...requests, this.commentService.patchComment(this.comment.id, {is_valid: true})];
      }
      const data = {
        content: content.value,
        is_valid: true,
        content_type: this.comment.content_type,
        object_id: this.comment.object_id,
        parent: this.comment.parent ? this.comment.parent : this.comment.id,
      };
      requests = [...requests, this.commentService.postComment(data)];

      forkJoin(requests).subscribe(
        () => {
          this.messageService.showMessage('Réponse enregistrée !');
          this.dialogRef.close('success');
        },
      );
    }
  }

  /**
   * Close dialog modal
   *
   * @param e
   */
  close(e: Event) {
    e.preventDefault();
    this.dialogRef.close();
  }
}


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
  comment_max_length = 20;
  data: Comment[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private commentService: CommentService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private layoutWrapperService: LayoutWrapperService,
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
          this.layoutWrapperService.setLoadingState(true);
          return this.commentService.getComments(this.paginator.pageIndex + 1);
        }),
        map((data: PaginatedComments) => {
          // Flip flag to show that loading has finished.
          this.layoutWrapperService.setLoadingState(false);
          this.resultsLength = data.count;
          this.pageSize = data.page_size;

          return data.results;
        }),
        catchError(() => {
          this.layoutWrapperService.setLoadingState(false);
          return observableOf([]);
        }),
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
        () => this.messageService.showMessage('Commentaire mis à jour !'),
      );
  }

  /**
   * Open selected comment dialog
   *
   * @param comment
   */
  openComment(comment: Comment) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: comment,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === 'success') {
          this._refreshData();
        }
      },
    );
  }

  /**
   * Delete comment from server and update comments data
   *
   * @param comment
   */
  deleteComment(comment: Comment) {
    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Supprimer ?',
        content: 'Confirmes-tu la supression de ce commentaire ?',
      },
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
                  this._refreshData();
                },
              );
          }
        },
      );
  }

  /**
   * Refresh data, fetching from server
   */
  _refreshData(): void {
    this.layoutWrapperService.setLoadingState(true);
    this.commentService.getComments(this.paginator.pageIndex + 1)
      .subscribe(
        data => {
          this.resultsLength = data.count;
          this.pageSize = data.page_size;
          this.data = data.results;
          this.layoutWrapperService.setLoadingState(false);
        },
      );
  }
}

