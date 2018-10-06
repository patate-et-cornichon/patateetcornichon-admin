import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { Observable } from 'rxjs';
import slugify from 'slugify';

import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../core/auth/auth.interface';
import { AuthService } from '../../core/auth/auth.service';
import { LayoutWrapperService } from '../../core/layout/layout-wrapper.service';
import { MessageService } from '../../core/message/message.service';
import { Story } from '../blog.interface';
import { BlogService } from '../blog.service';


export class BlogManagementBaseComponent implements OnInit {
  isPosting = false;
  hasError = false;
  editMode = false;

  // Author
  authorsList: User[] = [];

  // Tags
  filteredTags: Observable<string[]>;
  tagList: string[] = [];
  tags: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formGroup = new FormGroup({
    published: new FormControl(false),
    authors: new FormControl(null, [
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
    tags: new FormControl(null),
    main_picture: new FormControl(null, [
      Validators.required,
    ]),
    content: new FormControl(null, [
      Validators.required,
    ]),
    meta_description: new FormControl(null, [
      Validators.required,
    ]),
  });

  editor: Quill;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    protected blogService: BlogService,
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
    // Get Authors
    this.blogService
      .getAuthors()
      .subscribe(
        authors => this.authorsList = authors,
      );

    // Get tags
    this.blogService
      .getTags()
      .subscribe(
        tags => this.tagList = tags.map(tag => tag.name),
      );
  }

  selectionChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex === 1 && !this.editor) {
      this.initEditor();
    }
  }

  initEditor(): void {
    const toolbarOptions = [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],

      ['link', 'image', 'video'],

      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}],

      [{'align': []}],

      ['clean'],
    ];
    this.editor = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    });
    this.editor.getModule('toolbar').addHandler('image', () => this._selectLocalImage());
    this.editor.on('text-change', () => {
      const content = this.editor.root.innerHTML;
      this.formGroup.controls['content'].setValue(content);
    });
  }

  /**
   * Select local image and send it to the server.
   * Update the editor with the new image.
   *
   * @private
   */
  _selectLocalImage(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // Listen upload local image and save to server
    input.addEventListener('change', () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        this.blogService.uploadImage(file)
          .subscribe(
            data => {
              const range = this.editor.getSelection();
              this.editor.insertEmbed(range.index, 'image', data.image_url);
            },
          );
      } else {
        console.warn('Il faut une image seulement !.');
      }
    }) ;
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

  saveStory() {
    if (this.formGroup.invalid || !this.tags.length) {
      this.hasError = true;
      return;
    }
    this.hasError = false;
  }
}


@Component({
  selector: 'app-blog-management-create',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss']
})
export class BlogManagementCreateComponent extends BlogManagementBaseComponent implements OnInit {

  pageTitle = 'Ajouter un article';

  constructor(
    protected blogService: BlogService,
    protected messageService: MessageService,
    protected router: Router,
    private authService: AuthService,
  ) {
    super(blogService, messageService, router);
  }
  ngOnInit() {
    super.ngOnInit();

    // Set the default user to the current user
    const user: User = this.authService.getUser();
    this.formGroup.controls['authors'].setValue([user.id]);
  }

  /**
   * Save blog
   */
  saveStory() {
    super.saveStory();

    if (this.formGroup.valid) {
      this.isPosting = true;
      const data = {
        ...this.formGroup.value,
        tags: this.tags,
      };
      this.blogService.postStory(data)
        .subscribe(
          () => {
            this.messageService.showMessage('Article enregistré !');
            return this.router.navigate(['/blog']);
          },
          null,
          () => this.isPosting = false,
        );
    }
  }
}


@Component({
  selector: 'app-blog-management-edit',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss']
})
export class BlogManagementEditComponent extends BlogManagementBaseComponent implements OnInit {

  pageTitle = 'Éditer un article';
  editMode = true;

  slug: string;
  story: Story;

  constructor(
    protected blogService: BlogService,
    protected messageService: MessageService,
    protected router: Router,
    private route: ActivatedRoute,
    private layoutWrapperService: LayoutWrapperService,
  ) {
    super(blogService, messageService, router);

    this.slug = this.route.snapshot.params.slug;

    this.layoutWrapperService.setLoadingState(true);
    this.blogService.getStory(this.slug)
      .subscribe(
        story => {
          this.story = story;
          this._populateData(story);
          this.layoutWrapperService.setLoadingState(false);
        },
        () => this.router.navigateByUrl('/blog'),
      );
  }

  /**
   * Populate story fields with fetched data
   *
   * @param story
   * @private
   */
  _populateData(story: Story): void {
    // Populate with values
    this.formGroup.patchValue(story);
    // Update complex fields
    this.formGroup.get('authors').setValue(
      story.authors.map(author => author.id),
    );
    this.tags = story.tags.map(tag => tag.name);
  }

  initEditor(): void {
    super.initEditor();

    this.editor.root.innerHTML = this.formGroup.get('content').value;
  }

  /**
   * Save story
   */
  saveStory() {
    super.saveStory();

    if (this.formGroup.valid) {
      this.isPosting = true;
      const data = {
        ...this.formGroup.value,
        tags: this.tags,
      };

      // We don't want to send pictures if they are the default ones (URL pictures)
      if (data['main_picture'] === this.story.main_picture) {
        delete data['main_picture'];
      }

      this.blogService.patchStory(this.story.slug, data)
        .subscribe(
          (response) => {
            this.messageService.showMessage('Article mis à jour !');
            this.slug = response.slug;
          },
          null,
          () => this.isPosting = false,
        );
    }
  }
}
