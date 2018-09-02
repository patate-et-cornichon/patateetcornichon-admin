import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzAxNTI5NWUtMWI2NC00NTZjLTkxYmUtNjUyZmM1OWUyYTA5IiwidXNlcm5hbWUiOiJkZXZlbG9wZXJAcGF0YXRlZXRjb3JuaWNob24uY29tIiwiZXhwIjoxNTM1ODU0MzYzLCJlbWFpbCI6ImRldmVsb3BlckBwYXRhdGVldGNvcm5pY2hvbi5jb20iLCJvcmlnX2lhdCI6MTUzNTg1MDc2M30.hLFVcF9l5_mGeL97pjbf8FxW73dhvqIUvjkL0bsEQ_0',
      'Content-Type': 'application/json'
    });
    const newRequest = req.clone({
      headers: headers
    });
    return next.handle(newRequest);
  }
}
