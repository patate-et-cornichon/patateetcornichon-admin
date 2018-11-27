import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Comment, PaginatedComments } from './comment.interface';
import { CommentModule } from './comment.module';


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
   * POST: post comment
   *
   * @param data
   */
  postComment(data: Object): Observable<Comment> {
    return this.http.post<Comment>(`${environment.baseUrl}/comments/`, data);
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
