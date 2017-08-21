import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualClassificationComponent } from './manual-classification.component';

const routes: Routes = [
  { path: '', component: ManualClassificationComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualClassificationRouteModule {

}
