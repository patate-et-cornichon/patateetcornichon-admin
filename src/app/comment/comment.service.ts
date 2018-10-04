import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginatedComments } from './comment.interface';
import { CommentModule } from './comment.module';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: CommentModule,
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  /**
   * GET: get all comments from the server
   */
  getComments(page: number = 1): Observable<PaginatedComments> {
    return this.http.get<PaginatedComments>(`${environment.baseUrl}/comments/?page=${page}`);
  }

  /**
   * PATCH: update comment
   *
   * @param commentId
   * @param data
   */
  patchComment(commentId: string, data: Object): Observable<Comment> {
    return this.http.patch<Comment>(`${environment.baseUrl}/comments/${commentId}/`, data);
  }

  /**
   * DELETE: delete a comment from server
   *
   * @param commentId
   */
  deleteComment(commentId: string): Observable<null> {
    return this.http.delete<null>(`${environment.baseUrl}/comments/${commentId}/`);
  }
}
