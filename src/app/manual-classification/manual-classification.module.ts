import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualClassificationRouteModule } from './manual-classification-routing.module';

import { ManualClassificationService } from './manual-classification.service';

import { SharedModule } from '../shared/shared.module';
import { ManualClassificationComponent } from './manual-classification.component';
import { WorkAreaComponent } from './workarea/workarea.component';
import { DocCarouselComponent } from './doc-carousel/doc-carousel.component';
import { DocCarouselDragDirective } from './doc-carousel/doc-carousel.directive';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { CheckboxModule } from 'primeng/primeng';

@NgModule({
  imports: [SharedModule, ManualClassificationRouteModule, CommonModule, CheckboxModule],
  declarations: [ManualClassificationComponent, WorkAreaComponent, DocCarouselComponent, DocCarouselDragDirective, ImageCarouselComponent],
  providers: [ManualClassificationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManualClassificationModule {

}
