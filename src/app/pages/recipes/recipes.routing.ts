import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  RecipesManagementCreateComponent,
  RecipesManagementEditComponent,
} from './recipes-management/recipes-management.component';
import {
  RecipesSelectionsManagementCreateComponent,
  RecipesSelectionsManagementEditComponent,
} from './recipes-selections/recipes-selections-management/recipes-selections-management';
import { RecipesSelectionsComponent } from './recipes-selections/recipes-selections.component';
import { RecipesComponent } from './recipes.component';


const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
  },
  {
    path: 'selections',
    component: RecipesSelectionsComponent,
  },
  {
    path: 'selections/add',
    component: RecipesSelectionsManagementCreateComponent,
  },
  {
    path: 'selections/:slug',
    component: RecipesSelectionsManagementEditComponent,
  },
  {
    path: 'add',
    component: RecipesManagementCreateComponent,
  },
  {
    path: ':slug',
    component: RecipesManagementEditComponent,
  },
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
