import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManualExtractionComponent } from './manual-extraction.component';

const routes: Routes = [
  { path: '', component: ManualExtractionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualExtractionRouteModule { }
