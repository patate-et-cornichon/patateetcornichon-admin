import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogManagementCreateComponent, BlogManagementEditComponent } from './blog-management/blog-management.component';
import { BlogComponent } from './blog.component';


const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: 'add', component: BlogManagementCreateComponent},
  {path: ':slug', component: BlogManagementEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BlogRoutingModule {
}
