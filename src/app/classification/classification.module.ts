import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClassificationRouterModule } from './classification.route';

import { ClassificationBatchUploadComponent } from './classification-upload-batch/classification-upload-batch.Component';
import { ClassificationOutputComponent } from './classification-output/classification-output.Component';
import { ClassificationOutputViewerComponent } from './classification-output-viewer/classification-output-viewer.component';


@NgModule({
  imports: [SharedModule, ClassificationRouterModule],
  providers: [],
  declarations: [ClassificationBatchUploadComponent, ClassificationOutputComponent, ClassificationOutputViewerComponent],
})
export class ClassificationModule {

}
