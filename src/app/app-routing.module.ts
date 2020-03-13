import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreatComponent } from './posts/post-creat/post-creat.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreatComponent},
  {path: 'edit/:postId', component: PostCreatComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule {}
