import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Recipe, PaginatedRecipes, Category, Tag } from './recipes.interface';
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
    return this.http.patch<Recipe>(`${environment.baseUrl}/recipes/${recipeSlug}/`, data);
  }

  /**
   * DELETE: delete a recipe from server
   *
   * @param recipeSlug
   */
  deleteRecipe(recipeSlug: string): Observable<null> {
    return this.http.delete<null>(`${environment.baseUrl}/recipes/${recipeSlug}/`);
  }

  /**
   * GET: Get recipe categories from server
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/recipes/categories/`);
  }

  /**
   * GET: Get recipe tags from server
   */
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.baseUrl}/recipes/tags/`);
  }
}
