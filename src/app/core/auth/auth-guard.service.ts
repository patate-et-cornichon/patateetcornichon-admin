import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  /**
   * Check if the user is authenticated and is staff
   */
  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    } else {
      const user = this.authService.getUser();
      if (!user.is_staff) {
        this.authService.logout();
        this.router.navigate(['login']);
        return false;
      }
    }
    return true;
  }
}
