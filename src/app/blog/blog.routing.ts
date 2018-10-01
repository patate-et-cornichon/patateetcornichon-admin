import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogManagementCreateComponent, BlogManagementEditComponent } from './management/blog-management.component';


const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: 'add', component: BlogManagementCreateComponent},
  {path: ':slug', component: BlogManagementEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule {
}
