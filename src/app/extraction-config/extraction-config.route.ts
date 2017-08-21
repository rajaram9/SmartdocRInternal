import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtractionConfigComponent } from './extraction-config.component';

const routes: Routes = [
  { path: '', component: ExtractionConfigComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractionConfigRoutingModule { }






