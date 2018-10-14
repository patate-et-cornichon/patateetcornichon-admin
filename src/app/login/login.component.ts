import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../core/auth/auth.service';
import { LayoutWrapperService } from '../core/layout/layout-wrapper.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutWrapperService: LayoutWrapperService,
  ) {
  }

  /**
   * Submit credentials to the auth service
   */
  onSubmit() {
    this.isSubmitted = true;
    this.layoutWrapperService.setLoadingState(true);
    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => this.layoutWrapperService.setLoadingState(false)))
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.isSubmitted = false,
      );
  }
}
