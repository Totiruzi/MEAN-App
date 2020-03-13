import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUndated = new Subject<Post[]>();
  url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // return [...this.posts];
    this.http
      .get<{ message: string; posts: any }>(this.url)
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postsUndated.next([...this.posts]);
      });
  }

  getPostUndatedListener() {
    return this.postsUndated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string; postId: string }>(this.url, post)
      .subscribe(responseData => {
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUndated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = {...this.posts};
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUndated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUndated.next([...this.posts]);
      });
  }
}
