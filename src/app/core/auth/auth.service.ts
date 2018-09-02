import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

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

  /**
   * POST: get token from server thanks to credentials
   *
   * @param data
   */
  getTokenFromServer(data): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.baseUrl}/auth/obtain-token/`, data);
  }
}
