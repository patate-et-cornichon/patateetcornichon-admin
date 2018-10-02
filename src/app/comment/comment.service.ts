import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CommentModule } from './comment.module';


@Injectable({
  providedIn: CommentModule,
})
export class CommentService {

  constructor(private http: HttpClient) {
  }
}
