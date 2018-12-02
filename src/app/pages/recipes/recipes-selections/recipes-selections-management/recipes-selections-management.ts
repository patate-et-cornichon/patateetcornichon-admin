import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { finalize, map, pluck } from 'rxjs/operators';
import slugify from 'slugify';

import { LayoutWrapperService } from '../../../../core/layout/layout-wrapper.service';
import { MessageService } from '../../../../core/message/message.service';
import { Recipe, Selection } from '../../recipes.interface';
import { RecipesService } from '../../recipes.service';


class RecipesSelectionsManagementBaseComponent {

  pageTitle: string;
  isPosting = false;
  hasError = false;
  editMode = false;
  selection: Selection;
  filteredRecipes: Recipe[] = [];
  selectedRecipes: Array<{ id: string, title: string, picture: string }> = [];
  editor: Quill;
  formGroup = new FormGroup({
    published: new FormControl(false),
    title: new FormControl(null, [
      Validators.required,
    ]),
    slug: new FormControl(null, [
      Validators.required,
    ]),
    picture: new FormControl(null, [
      Validators.required,
    ]),
    description: new FormControl(null, [
      Validators.required,
    ]),
    recipe: new FormControl(null),
    recipes: new FormArray([], [
      Validators.required,
    ]),
    meta_description: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    protected recipesServices: RecipesService,
  ) {
    this.formGroup.controls['recipe'].valueChanges
      .subscribe(value => this.filterRecipes(value));
  }


  /**
   * Save selection
   */
  saveSelection() {
    if (this.formGroup.invalid) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
  }

  /**
   * Append recipe in displayable recipe list and in form
   */
  appendRecipe(event: MatAutocompleteSelectedEvent) {
    const recipe: Recipe = event.option.value;

    // Append recipe to the selected displayable list
    this.selectedRecipes = [
      ...this.selectedRecipes,
      {
        id: recipe.id,
        title: recipe.full_title,
        picture: recipe.main_picture_thumbs.mini,
      },
    ];

    // Update form values
    this.updateRecipes();
    this.formGroup.controls['recipe'].setValue('');
  }

  /**
   * Drop recipe, respecting order
   */
  dropRecipe(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.selectedRecipes, event.previousIndex, event.currentIndex);
    this.updateRecipes();
  }

  /**
   * Remove recipe from list
   */
  removeRecipe(recipeId: string): void {
    this.selectedRecipes = this.selectedRecipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
    this.updateRecipes();
  }

  /**
   * Change the slug field value according to the full title field
   */
  changeSlug(): void {
    let fullTitleValue = this.formGroup.controls['title'].value;
    if (fullTitleValue) {
      fullTitleValue = fullTitleValue.toLowerCase();
      const slugifiedTitle = slugify(
        fullTitleValue,
        {
          remove: /[*,+~.()'"!:@]/g,
        },
      );
      this.formGroup.controls['slug'].setValue(slugifiedTitle);
    }
  }

  selectionChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex === 1 && !this.editor) {
      this.initEditor();
    }
  }

  /**
   * Init editor behavior
   */
  protected initEditor(): void {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],

      ['link'],

      ['clean'],
    ];
    this.editor = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    });
    this.editor.on('text-change', () => {
      const content = this.editor.root.innerHTML;
      this.formGroup.controls['description'].setValue(content);
    });
  }

  /**
   * Update recipes according to the selected recipes order
   */
  protected updateRecipes(): void {
    const recipesForm = this.formGroup.get('recipes') as FormArray;

    recipesForm.controls.splice(0);

    this.selectedRecipes.forEach((recipe, index) => {
      recipesForm.push(
        new FormGroup({
          recipe: new FormControl(recipe.id),
          order: new FormControl(index),
        }),
      );
    });
  }

  /**
   * Fetch recipes from server according to a query value
   */
  private filterRecipes(value: string): void {
    if (!value) {
      this.filteredRecipes = [];
      return;
    }

    const selectedRecipesIds = this.selectedRecipes.map(item => item.id);
    this.recipesServices.getRecipes({
      full_title__icontains: value,
      page_size: 5,
    })
      .pipe(
        pluck('results'),
        map((results: Recipe[]) => {
          return results.filter(result => !selectedRecipesIds.includes(result.id));
        }),
      )
      .subscribe(data => {
        this.filteredRecipes = data;
      });
  }
}


@Component({
  selector: 'app-recipes-selections-management-create',
  templateUrl: './recipes-selections-management.html',
  styleUrls: ['./recipes-selections-management.scss'],
})
export class RecipesSelectionsManagementCreateComponent
  extends RecipesSelectionsManagementBaseComponent {

  pageTitle = 'Ajouter une sélection';

  constructor(
    protected recipesServices: RecipesService,
    private messageService: MessageService,
    private router: Router,
  ) {
    super(recipesServices);
  }

  /**
   * Save Selection
   */
  saveSelection() {
    super.saveSelection();

    if (this.formGroup.valid) {
      this.isPosting = true;
      const data = this.formGroup.value;
      this.recipesServices.postSelection(data)
        .pipe(finalize(() => this.isPosting = false))
        .subscribe(
          () => {
            this.messageService.showMessage('Sélection enregistrée !');
            return this.router.navigate(['/recipes/selections']);
          },
        );
    }
  }
}

@Component({
  selector: 'app-recipes-selections-management-edit',
  templateUrl: './recipes-selections-management.html',
  styleUrls: ['./recipes-selections-management.scss'],
})
export class RecipesSelectionsManagementEditComponent extends RecipesSelectionsManagementBaseComponent {

  pageTitle = 'Éditer une sélection';
  editMode = true;
  slug: string;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    protected recipesServices: RecipesService,
    private messageService: MessageService,
    private layoutWrapperService: LayoutWrapperService,
  ) {
    super(recipesServices);

    this.slug = this.route.snapshot.params.slug;

    this.layoutWrapperService.setLoadingState(true);
    this.recipesServices.getSelection(this.slug)
      .subscribe(
        selection => {
          this.selection = selection;
          this.populateData(selection);
          this.layoutWrapperService.setLoadingState(false);
        },
        () => this.router.navigateByUrl('/recettes/selections'),
      );
  }

  /**
   * Save selection
   */
  saveSelection() {
    super.saveSelection();

    if (this.formGroup.valid) {
      this.isPosting = true;
      const data = this.formGroup.value;

      // We don't want to send pictures if they are the default ones (URL pictures)
      if (data['picture'] === this.selection.picture_thumbs.large) {
        delete data['picture'];
      }

      this.recipesServices.patchSelection(this.selection.slug, data)
        .pipe(finalize(() => this.isPosting = false))
        .subscribe(
          (response) => {
            this.messageService.showMessage('Sélection mise à jour !');
            this.slug = response.slug;
          },
        );
    }
  }

  protected initEditor(): void {
    super.initEditor();

    this.editor.root.innerHTML = this.formGroup.get('description').value;
  }

  /**
   * Populate selection fields with fetched data
   */
  private populateData(selection: Selection): void {
    // Populate with values
    this.formGroup.patchValue({...selection});
    // Update complex fields
    this.formGroup.get('picture').setValue(selection.picture_thumbs.large);
    this.selectedRecipes = this.selection.recipes.map(recipe => (
      {
        id: recipe.id,
        title: recipe.full_title,
        picture: recipe.main_picture_thumbs.mini,
      }
    ));
    this.updateRecipes();
  }
}
