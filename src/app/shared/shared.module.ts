import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { GridToolsComponent } from './grid-tools/grid-tools.component';
import { GridTableComponent } from './grid/grid.component';
import { ColumnToolsDirective, GridPropertyDirective } from './grid/grid-column-tools.directive';
import { KeyValuePairPipe } from './grid/grid-column.pipe';
import { GridDataFormatPipe } from './grid/grid-data-format.pipe';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDirective } from './calendar/calendar.directive';
import { ProcessTypeFilterComponent } from './process-type-filter/process-type-filter.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { DocTypeFilterComponent } from './doc-type-filter/doc-type-filter.component';
import { IconNavComponent } from './icon-nav/icon-nav.component';
import { DocumentSideBarComponent } from './document-side-bar/document-side-bar.component';
import { DragAndDropDirective, DocNameUpdateDirective } from './document-side-bar/document-side-bar.directive';
import { ProgressBarComponent } from './progress-bar/progressbar/progress-bar.component';
import { BootstrapProgressbarComponent } from './progress-bar/bootstrap-progressbar/progressbar.component';
import { HelpComponent } from './help/help.component';
import { BatchUploadComponent } from './batchupload/batchupload.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ImageViewerService } from './image-viewer/image-viewer.service';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { FocusDirective } from './focus/si-focus.directive';
import { BatchMoveComponent } from './icon-nav-panels/batch-move/batch-move.component';

import { BatchMoveService } from './icon-nav-panels/batch-move/batch-move.service';
import { SelectClientComponent } from './select-client/select-client.component';
import { SelectClientService } from './select-client/select-client.service';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { MainMenuComponent } from './main-menu/main-menu.component';




const componentToExport = [
  HeaderComponent, GridToolsComponent, GridTableComponent, CalendarComponent, CalendarDirective,
  ProcessTypeFilterComponent, LeftNavComponent,
  DocTypeFilterComponent, IconNavComponent, DocumentSideBarComponent, DragAndDropDirective, DocNameUpdateDirective, ProgressBarComponent,
  HelpComponent, BatchUploadComponent, ImageViewerComponent, DocViewerComponent, FocusDirective, BatchMoveComponent, TooltipDirective,
  BootstrapProgressbarComponent
];


@NgModule({
  imports: [FormsModule, HttpModule, CommonModule, RouterModule],
  declarations: [...componentToExport, GridDataFormatPipe, KeyValuePairPipe, ColumnToolsDirective, GridPropertyDirective,
    FocusDirective, SelectClientComponent, MainMenuComponent],
  exports: [...componentToExport, FormsModule, HttpModule, CommonModule],
  providers: [BatchMoveService, SelectClientService, ImageViewerService]
})
export class SharedModule { }
