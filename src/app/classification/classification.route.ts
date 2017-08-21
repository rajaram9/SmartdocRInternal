import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassificationBatchUploadComponent } from './classification-upload-batch/classification-upload-batch.Component';
import { ClassificationOutputViewerComponent } from './classification-output-viewer/classification-output-viewer.component';




const routes: Routes = [
  { path: 'BatchUpload', component: ClassificationBatchUploadComponent },
  { path: 'OutputViewer', component: ClassificationOutputViewerComponent }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationRouterModule {

}
