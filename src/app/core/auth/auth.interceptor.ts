import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { AuthService } from './auth.service';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // On every request, we check the token validity
    if (!req.url.includes('refresh-token')) {
      this.authService.checkTokenExpiration();
    }

    // Add custon header in all requests
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `JWT ${this.authService.getToken()}`);
    headers = headers.set('Content-Type', 'application/json');
    for (const key of req.headers.keys()) {
      const value = req.headers.get(key);
      if (value) {
        headers = headers.set(key, req.headers.get(key));
      } else {
        headers = headers.delete(key);
      }
    }
    const newRequest = req.clone({headers});

    return next.handle(newRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.status === 400 &&
            (req.url.includes('refresh-token') || req.url.includes('obtain-token'))
          ) {
            this.authService.logout();
          }
          this.messageService.showMessage('Une erreur est survenue');
          return throwError(error);
        }),
      );
  }
}
