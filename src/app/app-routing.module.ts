import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreatComponent } from './posts/post-creat/post-creat.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreatComponent},
  {path: 'edit/:postId', component: PostCreatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule {}
