import { Component, OnInit, Input } from '@angular/core';
import { Post } from './../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'Fist post', content: 'Fist post content'},
  //   {title: 'second post', content: 'Another post content'},
  //   {title: 'Third post', content: 'And another post content'},
  // ];
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
