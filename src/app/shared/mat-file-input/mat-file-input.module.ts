import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFileInputComponent } from './mat-file-input.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  declarations: [
    MatFileInputComponent,
  ],
  entryComponents: [
    MatFileInputComponent,
  ],
  exports: [
    MatFileInputComponent,
  ],
})
export class MatFileInputModule {
}
