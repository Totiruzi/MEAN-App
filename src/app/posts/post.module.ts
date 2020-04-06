import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreatComponent } from './post-creat/post-creat.component';

@NgModule({
  declarations: [PostCreatComponent, PostListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule,
  ],
})
export class PostModule {}
