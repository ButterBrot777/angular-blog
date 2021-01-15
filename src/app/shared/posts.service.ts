import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, FbCreateResponse } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(
    private http: HttpClient
  ) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {

          // spread post to set id and date
          return  {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        })
      );
  }
}
