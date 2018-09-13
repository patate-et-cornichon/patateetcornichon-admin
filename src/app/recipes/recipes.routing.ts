import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import {
  RecipesManagementCreateComponent,
  RecipesManagementEditComponent,
} from './management/recipes-management.component';


const routes: Routes = [
  {path: '', component: RecipesComponent},
  {path: 'add', component: RecipesManagementCreateComponent},
  {path: ':slug', component: RecipesManagementEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {
}
