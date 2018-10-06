import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSlideToggleChange } from '@angular/material';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { LayoutWrapperService } from '../core/layout/layout-wrapper.service';
import { MessageService } from '../core/message/message.service';
import { ConfirmationDialogComponent } from '../shared/dialogs/confirmation-dialog.component';
import { Recipe } from './recipes.interface';
import { RecipesService } from './recipes.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  displayedColumns: string[] = [
    'full_title',
    'created',
    'categories',
    'comments_count',
    'published',
    'actions',
  ];
  resultsLength = 0;
  pageSize = 0;
  data: Recipe[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private recipesService: RecipesService,
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
          return this.recipesService.getRecipes(this.paginator.pageIndex + 1);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.layoutWrapperService.setLoadingState(false);
          this.resultsLength = data.count;
          this.pageSize = data.page_size;

          return data.results;
        }),
        catchError(() => {
          this.layoutWrapperService.setLoadingState(false);
          return observableOf([]);
        })
      )
      .subscribe(data => this.data = data);
  }

  /**
   * Update the selected recipe with a new published value
   *
   * @param e
   * @param recipeSlug
   */
  togglePublished(e: MatSlideToggleChange, recipeSlug: string) {
    const data: object = {
      published: e.checked,
    };
    this.recipesService.patchRecipe(recipeSlug, data)
      .subscribe(
        () => this.messageService.showMessage('Recette mise à jour !')
      );
  }

  /**
   * Delete recipe from server and update recipes data
   *
   * @param recipe
   */
  deleteRecipe(recipe: Recipe) {
    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Supprimer ?',
        content: `Confirmes-tu la supression de la recette <strong>${recipe.full_title}</strong> ?`,
      }
    });

    // Update list after recipe is deleted
    dialogRef
      .afterClosed()
      .subscribe(result => {
          if (result) {
            this.recipesService
              .deleteRecipe(recipe.slug)
              .subscribe(
                () => {
                  this.messageService.showMessage('Recette supprimée !');
                  this.data = this.data.filter(e => e.slug !== recipe.slug);
                }
              );
          }
        }
      );
  }
}

