import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ExtractionConfigRoutingModule } from './extraction-config.route';
import { ExtractionConfigComponent } from './extraction-config.component';
import { BatchImageService } from '../core/batch-image-service/batch-image.service';
import { ManualExtractionService } from '../manual-extraction/manual-extraction.service';
import { DataTableModule, DropdownModule, MultiSelectModule, DialogModule, ListboxModule } from 'primeng/primeng';
import { ExtractionConfigService } from './extraction-config.service';
import { ExtractionDocCarouselComponent } from '../manual-extraction/extraction-doc-carousel/doc-carousel.component';

@NgModule({
  imports: [
    CommonModule, ExtractionConfigRoutingModule, SharedModule, DataTableModule, DropdownModule, MultiSelectModule, DialogModule, ListboxModule
  ],
  declarations: [ExtractionConfigComponent, ExtractionDocCarouselComponent],
  providers: [BatchImageService, ManualExtractionService, ExtractionConfigService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExtractionConfigModule { }
