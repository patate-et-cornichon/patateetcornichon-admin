import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy, OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core';
import { CanUpdateErrorState, ErrorStateMatcher, MatFormFieldControl, MatInput, mixinErrorState } from '@angular/material';
import { Subject } from 'rxjs';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';


/* Boilerplate for applying mixins to MatFileInput. */
export class MatFileInputBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
              public _parentForm: NgForm,
              public _parentFormGroup: FormGroupDirective,
              public ngControl: NgControl) {
  }
}

export const _MatInputMixinBase = mixinErrorState(MatFileInputBase);

@Component({
  selector: 'app-mat-file-input',
  styleUrls: ['./mat-file-input.component.scss'],
  templateUrl: './mat-file-input.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: MatFileInputComponent
    }
  ],
})
export class MatFileInputComponent
  extends _MatInputMixinBase
  implements MatFormFieldControl<string>, ControlValueAccessor, OnInit, OnDestroy, DoCheck, CanUpdateErrorState {
  static nextId = 0;

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'mat-file-input';

  private _placeholder: string;
  private _required = false;
  private _reader = new FileReader();

  @Input() autofilled = false;
  @Input() valuePlaceholder: string;
  @Input() errorStateMatcher: ErrorStateMatcher;

  @HostBinding() id = `app-mat-file-input-${MatFileInputComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  @ViewChild('input') private input: ElementRef;
  @ViewChild('preview') private preview: ElementRef;

  imageContent = null;

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get value(): string | null {
    return this.empty ? null : this._elementRef.nativeElement.value;
  }

  set value(fileInput: string | null) {
    if (fileInput) {
      this.writeValue(fileInput);
      this.stateChanges.next();
    }
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty() {
    return !this._elementRef.nativeElement.value || this._elementRef.nativeElement.value.length === 0;
  }

  @HostBinding('class.mat-form-field-should-float')
  get shouldLabelFloat() {
    return this.focused || !this.empty || this.valuePlaceholder !== undefined;
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @HostBinding('class.file-input-disabled')
  get isDisabled() {
    return this.disabled;
  }

  @Input()
  get disabled() {
    return this._elementRef.nativeElement.disabled;
  }

  set disabled(dis: boolean) {
    this.setDisabledState(coerceBooleanProperty(dis));
    this.stateChanges.next();
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
      this._elementRef.nativeElement.querySelector('input').focus();
      this.focused = true;
      this.open();
    }
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    private fm: FocusMonitor,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private http: HttpClient,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(_elementRef.nativeElement, true)
      .subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    this._initReaderEventHandler();
  }

  ngOnInit() {
    if (!this.empty) {
      this.imageContent = this.value;
      this.preview.nativeElement.style.backgroundImage = `url(${this.value})`;
    }
  }

  private _onChange(_: any) {
  }

  private _onTouched() {
  }

  writeValue(obj: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  @HostListener('change', ['$event'])
  change(event: any) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (file) {
      this._reader.readAsDataURL(file);
    }
  }

  _initReaderEventHandler() {
    this._reader.addEventListener('load', () => {
      // Get the result and set the preview image
      this.imageContent = this._reader.result;
      this.preview.nativeElement.style.backgroundImage = `url(${this.imageContent})`;

      // Change the component input value
      this.value = this._reader.result;
      this._onChange(this._reader.result);
    }, false);
  }

  @HostListener('focusout')
  blur() {
    this.focused = false;
    this._onTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  /**
   * Open file manager
   */
  open() {
    if (!this.disabled) {
      this._elementRef.nativeElement.querySelector('input').click();
    }
  }

  /**
   * Remove image
   *
   * @param event
   */
  deleteImage(event: Event) {
    event.stopPropagation();

    const emptyValue = null;
    this.input.nativeElement.value = emptyValue;
    this.imageContent = emptyValue;
    this.writeValue(emptyValue);
    this._onChange(emptyValue);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this._elementRef.nativeElement);
  }

  ngDoCheck() {
    this.updateErrorState();
  }
}
