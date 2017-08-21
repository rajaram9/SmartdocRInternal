import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BatchManagmentAdminComponent } from './batch-management-admin/batch-management-admin.component';


const routes: Routes = [
  { path: '', component: BatchManagmentAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchManagementAdminRouterModule { }
