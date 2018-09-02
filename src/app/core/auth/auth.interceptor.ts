import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';


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
    const headers = new HttpHeaders({
      'Authorization': `JWT ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
    const newRequest = req.clone({headers});

    return next.handle(newRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.authService.logout();
          }
          this.messageService.showMessage('Une erreur est survenue');
          return throwError(error);
        }),
      );
  }
}
