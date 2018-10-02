import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { PrivateLayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'recipes',
        loadChildren: '../recipes/recipes.module#RecipesModule'
      },
      {
        path: 'blog',
        loadChildren: '../blog/blog.module#BlogModule'
      },
      {
        path: 'comments',
        loadChildren: '../comment/comment.module#CommentModule'
      },
    ],
  },
  {
    path: 'login',
    loadChildren: '../login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CoreRoutingModule {
}
