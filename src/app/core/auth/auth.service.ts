import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './auth.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  /**
   * Check if the user is authenticated
   */
  get isAuthenticated(): boolean {
    // Check if the token is expired or not
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.getToken());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getUser(): User {
    const user = localStorage.getItem('user');
    return JSON.parse(user) || {};
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  /**
   * Remove user attributes and redirect to login page
   */
  logout() {
    this.removeToken();
    this.removeUser();
    this.router.navigate(['/login']);
  }

  /**
   * POST: get token from server thanks to credentials
   *
   * @param data
   */
  login(data) {
    return this.http
      .post<{ token: string, user: User }>(`${environment.baseUrl}/auth/obtain-token/`, data)
      .pipe(
        map(
          response => {
            this.setToken(response.token);
            this.setUser(response.user);
          },
        ),
      );
  }

  /**
   * Check the token expiration date.
   * If this expiration date is less than 30 minutes,
   * we make a refresh token request.
   */
  checkTokenExpiration() {
    const token = this.getToken();
    const helper = new JwtHelperService();

    if (!helper.isTokenExpired(token)) {
      const expirationDate = helper.getTokenExpirationDate(token);
      const diff = Math.abs(expirationDate.getTime() - new Date().getTime());
      const remainingMinutes = Math.floor((diff / 1000) / 60);

      if (remainingMinutes < 30) {
        this.http
          .post<{ token: string, user: User }>(`${environment.baseUrl}/auth/refresh-token/`, {token})
          .subscribe(
            response => {
              this.setToken(response.token);
              this.setUser(response.user);
            },
          );
      }
    }
  }
}
