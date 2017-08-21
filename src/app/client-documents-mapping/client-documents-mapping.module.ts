import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientDocumentsMappingRoutingModule } from './client-documents-mapping.route';
import { ClientDocumentsMappingComponent } from './client-documents-mapping/client-documents-mapping.component';
import { ClientsddlComponent } from './clients-ddl/clients-ddl.component';
import { DualListComponent } from './documents-mapping/dual-list.component';
import { ClientDocumentsMappingService } from './client-documents-mapping/client-documents-mapping.service';

@NgModule({
  imports: [ClientDocumentsMappingRoutingModule, SharedModule],
  exports: [],
  declarations: [ClientDocumentsMappingComponent, DualListComponent, ClientsddlComponent],
  providers: [ClientDocumentsMappingService],
})
export class ClientDocumentsMappingModule { }
