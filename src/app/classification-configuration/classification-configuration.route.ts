import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassificationConfigComponent } from './classification-config/classification-config.component';




const routes: Routes = [
  { path: '', component: ClassificationConfigComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationConfigurationRouterModule {

}
