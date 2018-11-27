import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { PrivateLayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [
      AuthGuard,
    ],
    children: [
      {
        path: '',
        loadChildren: '../pages/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'recipes',
        loadChildren: '../pages/recipes/recipes.module#RecipesModule',
      },
      {
        path: 'blog',
        loadChildren: '../pages/blog/blog.module#BlogModule',
      },
      {
        path: 'comments',
        loadChildren: '../pages/comment/comment.module#CommentModule',
      },
    ],
  },
  {
    path: 'login',
    loadChildren: '../pages/login/login.module#LoginModule',
  },
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
