import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import slugify from 'slugify';

import { Category } from '../recipes.interface';
import { RecipesService } from '../recipes.service';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-recipes-management',
  templateUrl: './recipes-management.component.html',
  styleUrls: ['./recipes-management.component.scss']
})
export class RecipesManagementComponent implements OnInit {
  categoryList: Category[] = [];
  filteredTags: Observable<string[]>;
  tagList: string[] = [];
  tags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  firstFormGroup = new FormGroup({
    published: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
    ]),
    sub_title: new FormControl('', [
      Validators.required,
    ]),
    full_title: new FormControl('', [
      Validators.required,
    ]),
    slug: new FormControl('', [
      Validators.required,
    ]),
    categories: new FormControl('', [
      Validators.required,
    ]),
    tags: new FormControl(''),
    main_picture: new FormControl('', [
      Validators.required,
    ]),
    secondary_picture: new FormControl(''),
  });

  secondFormGroup = new FormGroup({
    goal: new FormControl('', [
      Validators.required,
    ]),
    preparation_time: new FormControl('', [
      Validators.required,
    ]),
    cooking_time: new FormControl(''),
    fridge_time: new FormControl(''),
    leavening_time: new FormControl(''),
    difficulty: new FormControl('', [
      Validators.required,
    ]),
  });

  thirdGroup = new FormGroup({
    introduction: new FormControl('', [
      Validators.required,
    ]),
  });

  fourthGroup = new FormGroup({
    composition: new FormArray([this.createComposition()], [
      Validators.required,
    ]),
  });

  fifthGroup = new FormGroup({
    steps: new FormArray([
      new FormControl('', [
        Validators.required,
      ]),
    ], [
      Validators.required,
    ]),
  });

  sixthGroup = new FormGroup({
    meta_description: new FormControl('', [
      Validators.required,
    ])
  });

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private recipesService: RecipesService) {
    this.filteredTags = this.firstFormGroup.controls['tags']
      .valueChanges
      .pipe(
        startWith(null),
        map((tag: string | null) => {
          if (tag) {
            return this._filter(tag);
          } else {
            return this.tagList.filter(tagItem => !this.tagList.includes(tagItem));
          }
        })
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
        tags => this.tagList = tags.map(tag => tag.name.toLocaleLowerCase()),
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

    this.firstFormGroup.controls['tags'].setValue(null);
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
    this.firstFormGroup.controls['tags'].setValue(null);
  }

  /**
   * Filter tags according to a tag value
   *
   * @param value
   * @private
   */
  private _filter(value: string): string[] {
    const filterValue = value;

    return this.tagList
      .filter(tag => {
        tag = tag.toLocaleLowerCase();
        return tag.indexOf(filterValue) === 0 && !this.tags.includes(tag);
      });
  }

  /**
   * Change the slug field value according to the full title field
   */
  changeSlug(): void {
    const fullTitleValue = this.firstFormGroup.controls['full_title'].value.toLowerCase();
    const slugifiedTitle = slugify(fullTitleValue);
    this.firstFormGroup.controls['slug'].setValue(slugifiedTitle);
  }

  // Step Management
  get steps(): FormArray {
    return this.fifthGroup.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(new FormControl(''));
  }

  removeStep(index) {
    this.steps.removeAt(index);
  }

  // Composition Management
  get composition(): FormArray {
    return this.fourthGroup.get('composition') as FormArray;
  }

  addComposition() {
    this.composition.push(this.createComposition());
  }

  createComposition() {
    return new FormGroup({
      name: new FormControl(''),
      ingredients: new FormArray([this.createIngredient()], [
        Validators.required,
      ]),
    });
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
      ingredient: new FormControl('', [
        Validators.required,
      ]),
      unit: new FormControl(''),
      quantity: new FormControl(''),
    });
  }

  removeIngredient(compositionIndex: number, ingredientIndex: number) {
    this.getIngredients(compositionIndex).removeAt(ingredientIndex);
  }
}