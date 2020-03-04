import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUndated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUndatedListener() {
    return this.postsUndated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.posts.push(post);
    this.postsUndated.next([...this.posts]);
  }
}
