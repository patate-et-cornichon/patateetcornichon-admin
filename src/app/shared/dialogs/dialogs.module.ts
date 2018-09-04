import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatButtonModule,
} from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';


@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
})
export class DialogsModule {
}
