import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClassificationConfigurationRouterModule } from './classification-configuration.route';

import { ClassificationConfigComponent } from './classification-config/classification-config.component';
import { UploadtemplateComponent } from './uploadtemplate/uploadtemplate.component';
import { DocSearchComponent } from './docSearch/docSearch.component';
import { ConfigViewerComponent } from './config-viewer/config-viewer.component';
import { NewClassificationConfigComponent } from './new-classification-config/new-classification-config.component';

import { CellDirective, DocSummaryDirective, DocTypeDirective } from './config-viewer/config-viewer.directive';


import { DocSearchPipe } from './docSearch/docSearch.pipe';
import { DocTypePipe } from './config-viewer/config-viewer.pipe';
import { DocTypeNamePipe } from './config-viewer/config-viewername.pipe';
import { DocTypeisDeletePipe } from './config-viewer/config-viewerisdelete.pipe';


import { ConfigViewerService } from './config-viewer/config-viewer.service';

// import { DropdownModule, PanelModule } from 'primeng/primeng';

import { ActionFormService } from './new-classification-config/new-classification-config.service';

import { ExtractionConfigComponent } from '../extraction-config/extraction-config.component';
import { ExtractionConfigRoutingModule } from '../extraction-config/extraction-config.route';

// import { ExtractionConfigService } from '../extraction-config/extraction-config.service';
// import { ManualExtractionService } from '../manual-extraction/manual-extraction.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BatchImageService } from '../core/batch-image-service/batch-image.service';
import { ManualExtractionService } from '../manual-extraction/manual-extraction.service';
import { DataTableModule,SpinnerModule,GrowlModule,TooltipModule, DropdownModule, MultiSelectModule, DialogModule, ListboxModule, PanelModule, TabViewModule } from 'primeng/primeng';
import { ExtractionConfigService } from '../extraction-config/extraction-config.service';
import { ExtractionDocCarouselComponent } from '../manual-extraction/extraction-doc-carousel/doc-carousel.component';

@NgModule({
  imports: [SharedModule, CommonModule, ClassificationConfigurationRouterModule, DropdownModule, PanelModule, ReactiveFormsModule,TooltipModule, FormsModule, ExtractionConfigRoutingModule, DataTableModule, MultiSelectModule,GrowlModule, DialogModule, ListboxModule, TabViewModule,SpinnerModule],
  providers: [ConfigViewerService, ActionFormService, ExtractionConfigService, ManualExtractionService, BatchImageService],
  exports: [DocSummaryDirective],
  declarations: [
    ClassificationConfigComponent, DocSearchComponent, DocSearchPipe, UploadtemplateComponent, ConfigViewerComponent,
    NewClassificationConfigComponent, ExtractionConfigComponent, ExtractionDocCarouselComponent,
    CellDirective, DocSummaryDirective, DocTypeDirective,
    DocTypePipe, DocTypeNamePipe, DocTypeisDeletePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClassificationConfigurationModule {

}
