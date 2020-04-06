import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './auth/auth.guard';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreatComponent } from './posts/post-creat/post-creat.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreatComponent, canActivate: [AuthGaurd] },
  {
    path: 'edit/:postId',
    component: PostCreatComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd],
})
export class AppRoutingModule {}
