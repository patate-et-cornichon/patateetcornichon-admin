import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSlideToggleChange, MatSnackBar, PageEvent } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  displayedColumns: string[] = [
    'created',
    'full_title',
    'categories',
    'published',
  ];
  resultsLength = 0;
  pageSize = 0;
  isLoadingResults = true;
  data: Recipe[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private recipesService: RecipesService,
    private snackBar: MatSnackBar,
  ) {}

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
          return this.recipesService.getRecipes(this.paginator.pageIndex + 1);
        }),
        map(data => {
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
   * Update the selected recipe with a new published value
   *
   * @param e
   * @param recipeSlug
   */
  togglePublished(e: MatSlideToggleChange, recipeSlug: string) {
    const data: object = {
      published: e.checked,
    };
    this.recipesService.updateRecipe(recipeSlug, data)
      .subscribe(
        () => this.snackBar.open('Recette publiée !')
      );
  }
}
