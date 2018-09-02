import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { CoreModule } from '../core.module';


@Injectable({
  providedIn: CoreModule,
})
export class MessageService {
  private action = 'Fermer';

  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(message, this.action, config);
  }
}
