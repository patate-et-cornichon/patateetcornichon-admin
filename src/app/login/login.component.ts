import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { MessageService } from '../core/messages/messages.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  /**
   * Submit credentials to the auth service
   */
  onSubmit() {
    this.isSubmitted = true;
    this.authService.getTokenFromServer(this.loginForm.value)
      .subscribe(
        data => {
          this.authService.setToken(data.token);
          this.router.navigate(['/']);
        },
        () => {
          this.messageService.showMessage('Une erreur est survenue');
          this.isSubmitted = false;
        }
      );
  }
}
