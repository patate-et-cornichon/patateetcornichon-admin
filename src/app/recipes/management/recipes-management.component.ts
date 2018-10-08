import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import slugify from 'slugify';

import { map, startWith } from 'rxjs/operators';
import { LayoutWrapperService } from '../../core/layout/layout-wrapper.service';
import { MessageService } from '../../core/message/message.service';
import { Category, Recipe } from '../recipes.interface';
import { RecipesService } from '../recipes.service';


export class RecipesManagementBaseComponent implements OnInit {
  isPosting = false;
  hasError = false;
  editMode = false;

  recipe: Recipe;

  // Categories
  categoryList: Category[] = [];

  // Tags
  filteredTags: Observable<string[]>;
  tagList: string[] = [];
  tags: string[] = [];

  // Ingredients / Units
  filteredIngredients: string[];
  ingredientsList: string[] = [];
  filteredUnits: string[];
  unitsList: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formGroup = new FormGroup({
    published: new FormControl(false),
    created: new FormControl(new Date(), [
      Validators.required,
    ]),
    title: new FormControl(null, [
      Validators.required,
    ]),
    sub_title: new FormControl(null, [
      Validators.required,
    ]),
    full_title: new FormControl(null, [
      Validators.required,
    ]),
    slug: new FormControl(null, [
      Validators.required,
    ]),
    categories: new FormControl(null, [
      Validators.required,
    ]),
    tags: new FormControl(null),
    main_picture: new FormControl(null, [
      Validators.required,
    ]),
    secondary_picture: new FormControl(null),
    goal: new FormControl(null, [
      Validators.required,
    ]),
    preparation_time: new FormControl(null, [
      Validators.required,
    ]),
    cooking_time: new FormControl(null),
    fridge_time: new FormControl(null),
    leavening_time: new FormControl(null),
    difficulty: new FormControl(null, [
      Validators.required,
    ]),
    introduction: new FormControl(null, [
      Validators.required,
    ]),
    composition: new FormArray([], [
      Validators.required,
    ]),
    steps: new FormArray([], [
      Validators.required,
    ]),
    meta_description: new FormControl(null, [
      Validators.required,
    ]),
  });

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    protected recipesService: RecipesService,
    protected messageService: MessageService,
    protected router: Router,
  ) {
    this.filteredTags = this.formGroup.controls['tags']
      .valueChanges
      .pipe(
        startWith(null),
        map((tag: string | null) => {
          if (tag) {
            return this._filterTag(tag);
          } else {
            return this.tagList.filter(tagItem => !this.tagList.includes(tagItem));
          }
        }),
      );
  }

  ngOnInit() {
    // Get Categories
    this.recipesService
      .getCategories()
      .subscribe(
        categories => this.categoryList = this.getNestedCategories(categories),
      );

    // Get tags
    this.recipesService
      .getTags()
      .subscribe(
        tags => this.tagList = tags.map(tag => tag.name),
      );

    // Get ingredients
    this.recipesService
      .getIngredients()
      .subscribe(
        ingredients => this.ingredientsList = ingredients.map(
          ingredient => ingredient.name,
        ),
      );

    // Get units
    this.recipesService
      .getUnits()
      .subscribe(
        units => this.unitsList = units.map(
          unit => unit.name,
        ),
      );
  }

  /**
   * All nested categories should be at the first level
   *
   * @param categories
   * @param categoryList
   */
  getNestedCategories(categories, categoryList = []) {
    for (const category of categories) {
      categoryList = [...categoryList, category];
      if (category.children && category.children.length > 0) {
        categoryList = this.getNestedCategories(category.children, categoryList);
      }
    }
    return categoryList;
  }

  /**
   * Add tag event
   *
   * @param event
   */
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formGroup.controls['tags'].setValue(null);
  }

  /**
   * Remove Tag event
   *
   * @param tag
   */
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  /**
   * Selected Tag event
   *
   * @param event
   */
  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.formGroup.controls['tags'].setValue(null);
  }

  /**
   * Change the slug field value according to the full title field
   */
  changeSlug(): void {
    let fullTitleValue = this.formGroup.controls['full_title'].value;
    if (fullTitleValue) {
      fullTitleValue = fullTitleValue.toLowerCase();
      const slugifiedTitle = slugify(fullTitleValue);
      this.formGroup.controls['slug'].setValue(slugifiedTitle);
    }
  }

  // Step Management
  get steps(): FormArray {
    return this.formGroup.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(new FormControl(null));
  }

  createStep() {
    return new FormControl(null, [
      Validators.required,
    ]);
  }

  removeStep(index) {
    this.steps.removeAt(index);
  }

  // Composition Management
  get composition(): FormArray {
    return this.formGroup.get('composition') as FormArray;
  }

  addComposition() {
    this.composition.push(this.createComposition());
  }

  createComposition(ingredientsLength: number = 1) {
    const composition = new FormGroup({
      name: new FormControl(null),
      ingredients: new FormArray([], [
        Validators.required,
      ]),
    });
    const ingredients = composition.get('ingredients') as FormArray;
    Array.from({
        length: ingredientsLength
      },
      () => ingredients.push(this.createIngredient())
    );
    return composition;
  }

  removeComposition(index: number) {
    this.composition.removeAt(index);
  }

  // Composition ingredients management
  getIngredients(compositionIndex: number) {
    return this.composition.controls[compositionIndex].get('ingredients') as FormArray;
  }

  addIngredient(compositionIndex: number) {
    this.getIngredients(compositionIndex).push(this.createIngredient());
  }

  createIngredient() {
    return new FormGroup({
      ingredient: new FormControl(null, [
        Validators.required,
      ]),
      unit: new FormControl(null),
      quantity: new FormControl(null),
    });
  }

  removeIngredient(compositionIndex: number, ingredientIndex: number) {
    this.getIngredients(compositionIndex).removeAt(ingredientIndex);
  }

  /**
   * Filter ingredients on keypress event
   *
   * @param event
   */
  filterIngredients(event) {
    const filterValue = event.currentTarget.value;

    if (filterValue === '') {
      this.filteredIngredients = [];
    } else {
      this.filteredIngredients = this.ingredientsList
        .filter(ingredient => {
          ingredient = ingredient.toLocaleLowerCase();
          return ingredient.indexOf(filterValue.toLowerCase()) === 0;
        });
    }
  }

  /**
   * Filter units on keypress event
   *
   * @param event
   */
  filterUnits(event) {
    const filterValue = event.currentTarget.value;

    if (filterValue === '') {
      this.filteredUnits = [];
    } else {
      this.filteredUnits = this.unitsList
        .filter(unit => {
          unit = unit.toLocaleLowerCase();
          return unit.indexOf(filterValue.toLocaleLowerCase()) === 0;
        });
    }
  }

  /**
   * Filter tags according to a tag value
   *
   * @param value
   * @private
   */
  private _filterTag(value: string): string[] {
    const filterValue = value;

    return this.tagList
      .filter(tag => {
        tag = tag.toLocaleLowerCase();
        return tag.indexOf(filterValue) === 0 && !this.tags.includes(tag);
      });
  }

  saveRecipe() {
    if (this.formGroup.invalid) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
  }
}


@Component({
  selector: 'app-recipes-management-create',
  templateUrl: './recipes-management.component.html',
  styleUrls: ['./recipes-management.component.scss']
})
export class RecipesManagementCreateComponent extends RecipesManagementBaseComponent implements OnInit {

  pageTitle = 'Ajouter une recette';

  constructor(
    protected recipesService: RecipesService,
    protected messageService: MessageService,
    protected router: Router,
  ) {
    super(recipesService, messageService, router);

    // Init composition and steps with at least one entity
    this.composition.push(this.createComposition());
    this.steps.push(this.createStep());
  }

  /**
   * Save recipe
   */
  saveRecipe() {
    super.saveRecipe();

    if (this.formGroup.valid) {
      this.isPosting = true;
      const data = {
        ...this.formGroup.value,
        tags: this.tags,
      };
      this.recipesService.postRecipe(data)
        .subscribe(
          () => {
            this.messageService.showMessage('Recette enregistrée !');
            return this.router.navigate(['/recipes']);
          },
          null,
          () => this.isPosting = false,
        );
    }
  }
}


@Component({
  selector: 'app-recipes-management-edit',
  templateUrl: './recipes-management.component.html',
  styleUrls: ['./recipes-management.component.scss']
})
export class RecipesManagementEditComponent extends RecipesManagementBaseComponent implements OnInit {

  pageTitle = 'Éditer une recette';
  editMode = true;

  slug: string;

  constructor(
    protected recipesService: RecipesService,
    protected messageService: MessageService,
    protected router: Router,
    private route: ActivatedRoute,
    private layoutWrapperService: LayoutWrapperService,
  ) {
    super(recipesService, messageService, router);

    this.slug = this.route.snapshot.params.slug;

    this.layoutWrapperService.setLoadingState(true);
    this.recipesService.getRecipe(this.slug)
      .subscribe(
        recipe => {
          this.recipe = recipe;
          this._populateData(recipe);
          this.layoutWrapperService.setLoadingState(false);
        },
        () => this.router.navigateByUrl('/recipes'),
      );
  }

  /**
   * Populate recipe fields with fetched data
   *
   * @param recipe
   * @private
   */
  _populateData(recipe: Recipe): void {
    // Add composition structure
    for (const composition of recipe.composition) {
      this.composition.push(
        this.createComposition(composition.ingredients.length),
      );
    }
    // Add steps structure
    Array.from(
      {
        length: recipe.steps.length
      },
      () => this.steps.push(this.createStep()),
    );

    // Populate with values
    this.formGroup.patchValue(recipe);
    // Update complex fields
    this.formGroup.get('categories').setValue(
      recipe.categories.map(category => category.id),
    );
    this.formGroup.get('main_picture').setValue(recipe.main_picture_thumbs.medium);
    if (recipe.secondary_picture_thumbs) {
      this.formGroup.get('secondary_picture').setValue(recipe.secondary_picture_thumbs.medium);
    }
    this.tags = recipe.tags.map(tag => tag.name);
  }

  /**
   * Save recipe
   */
  saveRecipe() {
    super.saveRecipe();

    if (this.formGroup.valid) {
      this.isPosting = true;
      const data = {
        ...this.formGroup.value,
        tags: this.tags,
      };

      // We don't want to send pictures if they are the default ones (URL pictures)
      if (data['main_picture'] === this.recipe.main_picture_thumbs.medium) {
        delete data['main_picture'];
      }
      if (this.recipe.secondary_picture_thumbs && (data['secondary_picture'] === this.recipe.secondary_picture_thumbs.medium)) {
        delete data['secondary_picture'];
      }

      this.recipesService.patchRecipe(this.recipe.slug, data)
        .subscribe(
          (response) => {
            this.messageService.showMessage('Recette mise à jour !');
            this.slug = response.slug;
          },
          null,
          () => this.isPosting = false,
        );
    }
  }
}
