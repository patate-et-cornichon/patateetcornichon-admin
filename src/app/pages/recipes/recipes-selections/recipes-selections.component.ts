import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { LayoutWrapperService } from '../../../core/layout/layout-wrapper.service';
import { MessageService } from '../../../core/message/message.service';
import { ConfirmationDialogComponent } from '../../../shared/components/dialogs/confirmation-dialog.component';
import { Selection } from '../recipes.interface';
import { RecipesService } from '../recipes.service';


@Component({
  selector: 'app-selections',
  templateUrl: './recipes-selections.component.html',
  styleUrls: ['./recipes-selections.component.scss'],
})
export class RecipesSelectionsComponent implements OnInit {
  displayedColumns: string[] = [
    'picture',
    'title',
    'created',
    'recipes_count',
    'published',
    'actions',
  ];
  resultsLength = 0;
  pageSize = 20;
  data: Selection[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private recipesService: RecipesService,
    private messageService: MessageService,
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
          return this.recipesService.getSelections({
            page: this.paginator.pageIndex + 1,
          });
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.layoutWrapperService.setLoadingState(false);
          this.resultsLength = data.count;

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
   * Update the selected selection with a new published value
   */
  togglePublished(e: MatSlideToggleChange, selectionSlug: string) {
    const data: object = {
      published: e.checked,
    };
    this.recipesService.patchSelection(selectionSlug, data)
      .subscribe(
        () => this.messageService.showMessage('Sélection mise à jour !'),
      );
  }

  /**
   * Delete selection from server and update selections data
   */
  deleteSelection(selection: Selection) {
    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Supprimer ?',
        content: `Confirmes-tu la supression de la sélection <strong>${selection.title}</strong> ?`,
      },
    });

    // Update list after selection is deleted
    dialogRef
      .afterClosed()
      .subscribe(result => {
          if (result) {
            this.recipesService
              .deleteSelection(selection.slug)
              .subscribe(
                () => {
                  this.messageService.showMessage('Sélection supprimée !');
                  this.data = this.data.filter(e => e.slug !== selection.slug);
                },
              );
          }
        },
      );
  }
}
