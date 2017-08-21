import { NgModule } from '@angular/core';

import { ManualExtractionRouteModule } from './manual-extraction-route.module';
import { SharedModule } from '../shared/shared.module';

import { ManualExtractionComponent } from './manual-extraction.component';
import { ManualExtractionWorkareaComponent } from './workarea/workarea.component';
import { ConfidenceDirective } from './workarea/workarea-confidence.directive';
import { ExtractionDocCarouselComponent } from './extraction-doc-carousel/doc-carousel.component';
import { ManualExtractionService } from './manual-extraction.service';



@NgModule({
  imports: [SharedModule, ManualExtractionRouteModule],
  declarations: [ManualExtractionComponent, ManualExtractionWorkareaComponent, ConfidenceDirective,
    ExtractionDocCarouselComponent],
  providers: [ManualExtractionService]
})
export class ManualExtractionModule {

}
