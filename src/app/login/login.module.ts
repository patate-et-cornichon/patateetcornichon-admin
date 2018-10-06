import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,

    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule {
}
