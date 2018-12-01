import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Category, Ingredient, PaginatedRecipes, PaginatedSelections, Recipe, Tag, Unit } from './recipes.interface';
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
   * GET: get a single recipe
   */
  getRecipe(slug): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.baseUrl}/recipes/${slug}/`);
  }

  /**
   * POST: post a new recipe
   */
  postRecipe(data: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${environment.baseUrl}/recipes/`, data);
  }

  /**
   * PATCH: update recipe
   */
  patchRecipe(slug: string, data: Object): Observable<Recipe> {
    return this.http.patch<Recipe>(`${environment.baseUrl}/recipes/${slug}/`, data);
  }

  /**
   * DELETE: delete a recipe from server
   *
   * @param slug
   */
  deleteRecipe(slug: string): Observable<null> {
    return this.http.delete<null>(`${environment.baseUrl}/recipes/${slug}/`);
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

  /**
   * GET: Get recipe ingredients from server
   */
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.baseUrl}/recipes/ingredients/`);
  }

  /**
   * GET: Get recipe units from server
   */
  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${environment.baseUrl}/recipes/units/`);
  }

  /**
   * GET: Get recipe selections
   */
  getSelections(parameters: any): Observable<PaginatedSelections> {
    const params = new HttpParams({
      fromObject: parameters,
    });
    return this.http.get<PaginatedSelections>(
      `${environment.baseUrl}/recipes/selections/`, {
        params,
      },
    );
  }

  /**
   * PATCH: update selection
   */
  patchSelection(slug: string, data: Object): Observable<Selection> {
    return this.http.patch<Selection>(
      `${environment.baseUrl}/recipes/selections/${slug}/`, data,
      );
  }

  /**
   * DELETE: delete a selection from server
   */
  deleteSelection(slug: string): Observable<null> {
    return this.http.delete<null>(`${environment.baseUrl}/recipes/selections/${slug}/`);
  }
}
