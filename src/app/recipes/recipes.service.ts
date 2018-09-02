import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Recipe, PaginatedRecipes } from './recipe.interface';
import { RecipesModule } from './recipes.module';

@Injectable({
  providedIn: RecipesModule,
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  /**
   * GET: get all recipes from the server
   */
  getRecipes(page: number = 1): Observable<PaginatedRecipes> {
    return this.http.get<PaginatedRecipes>(`${environment.baseUrl}/recipes/?page=${page}`);
  }

  /**
   * PATCH: update recipe identified by its slug.
   *
   * @param recipeSlug
   * @param data
   */
  updateRecipe(recipeSlug: string, data: object): Observable<Recipe> {
    return this.http
      .patch<Recipe>(`${environment.baseUrl}/recipes/${recipeSlug}`, data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
