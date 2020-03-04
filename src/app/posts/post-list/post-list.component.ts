import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './../post.model';
import { PostsService } from './../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'Fist post', content: 'Fist post content'},
  //   {title: 'second post', content: 'Another post content'},
  //   {title: 'Third post', content: 'And another post content'},
  // ];
  posts: Post[] = [];
  private postSub: Subscription;
  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUndatedListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
