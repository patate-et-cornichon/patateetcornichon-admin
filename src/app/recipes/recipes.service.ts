import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


import { environment } from '../../environments/environment';
import { Recipe, PaginatedRecipes } from './recipe.interface';
import { RecipesModule } from './recipes.module';


@Injectable({
  providedIn: RecipesModule,
})
export class RecipesService {

  constructor(private http: HttpClient) {
  }

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
      .patch<Recipe>(`${environment.baseUrl}/recipes/${recipeSlug}`, data);
  }
}
