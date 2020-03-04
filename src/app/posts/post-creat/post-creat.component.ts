import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from './../post.model';
@Component({
  selector: 'app-post-creat',
  templateUrl: './post-creat.component.html',
  styleUrls: ['./post-creat.component.css']
})
export class PostCreatComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();
  constructor() { }

  ngOnInit(): void {
  }
  onAddPost() {
    const post: Post = {
      title : this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }
}
