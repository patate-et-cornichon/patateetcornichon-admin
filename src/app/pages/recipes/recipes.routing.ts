import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  RecipesManagementCreateComponent,
  RecipesManagementEditComponent,
} from './management/recipes-management.component';
import { RecipesComponent } from './recipes.component';


const routes: Routes = [
  {path: '', component: RecipesComponent},
  {path: 'add', component: RecipesManagementCreateComponent},
  {path: ':slug', component: RecipesManagementEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RecipesRoutingModule {
}
