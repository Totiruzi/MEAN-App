import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUndated = new Subject<Post[]>();
  url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    this.http.get<{message: string, posts: Post[]}>(this.url)
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUndated.next([...this.posts]);

    });
  }

  getPostUndatedListener() {
    return this.postsUndated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string}>(this.url, post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUndated.next([...this.posts]);
    });
  }
}
