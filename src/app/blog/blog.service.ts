import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Story, Tag, PaginatedStories } from './blog.interface';
import { BlogModule } from './blog.module';


@Injectable({
  providedIn: BlogModule,
})
export class BlogService {

  constructor(private http: HttpClient) {
  }

  /**
   * GET: get all stories from the server
   */
  getStories(page: number = 1): Observable<PaginatedStories> {
    return this.http.get<PaginatedStories>(`${environment.baseUrl}/stories/?page=${page}`);
  }

  /**
   * GET: get a single story
   */
  getStory(slug): Observable<Story> {
    return this.http.get<Story>(`${environment.baseUrl}/stories/${slug}/`);
  }

  /**
   * POST: post a new story
   */
  postStory(data: Story): Observable<Story> {
    return this.http.post<Story>(`${environment.baseUrl}/stories/`, data);
  }

  /**
   * PATCH: update story
   */
  patchStory(slug: string, data: Object): Observable<Story> {
    return this.http.patch<Story>(`${environment.baseUrl}/stories/${slug}/`, data);
  }

  /**
   * DELETE: delete a story from server
   *
   * @param slug
   */
  deleteStory(slug: string): Observable<null> {
    return this.http.delete<null>(`${environment.baseUrl}/stories/${slug}/`);
  }
}
