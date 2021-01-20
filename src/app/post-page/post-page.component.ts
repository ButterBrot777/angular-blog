import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/posts.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(
        // switchMap allows to change the direction of the stream from 'params' to the needed stream
        switchMap((params: Params) => {
          console.log('params: ', params)
          return this.postsService.getById(params.id);
        })
      )
  }

}
