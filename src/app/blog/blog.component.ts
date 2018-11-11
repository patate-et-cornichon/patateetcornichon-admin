import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { LayoutWrapperService } from '../core/layout/layout-wrapper.service';
import { MessageService } from '../core/message/message.service';
import { ConfirmationDialogComponent } from '../shared/dialogs/confirmation-dialog.component';
import { Story } from './blog.interface';
import { BlogService } from './blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  displayedColumns: string[] = [
    'main_picture',
    'full_title',
    'created',
    'comments_count',
    'published',
    'actions',
  ];
  resultsLength = 0;
  pageSize = 20;
  data: Story[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private blogService: BlogService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private layoutWrapperServer: LayoutWrapperService,
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
          this.layoutWrapperServer.setLoadingState(true);
          return this.blogService.getStories(this.paginator.pageIndex + 1);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.layoutWrapperServer.setLoadingState(false);
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.layoutWrapperServer.setLoadingState(false);
          return observableOf([]);
        }),
      )
      .subscribe(data => this.data = data);
  }

  /**
   * Update the selected story with a new published value
   *
   * @param e
   * @param storySlug
   */
  togglePublished(e: MatSlideToggleChange, storySlug: string) {
    const data: object = {
      published: e.checked,
    };
    this.blogService.patchStory(storySlug, data)
      .subscribe(
        () => this.messageService.showMessage('Article mis à jour !'),
      );
  }

  /**
   * Delete story from server and update stories data
   *
   * @param story
   */
  deleteStory(story: Story) {
    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Supprimer ?',
        content: `Confirmes-tu la supression de l'article <strong>${story.full_title}</strong> ?`,
      },
    });

    // Update list after recipe is deleted
    dialogRef
      .afterClosed()
      .subscribe(result => {
          if (result) {
            this.blogService
              .deleteStory(story.slug)
              .subscribe(
                () => {
                  this.messageService.showMessage('Article supprimé !');
                  this.data = this.data.filter(e => e.slug !== story.slug);
                },
              );
          }
        },
      );
  }
}
