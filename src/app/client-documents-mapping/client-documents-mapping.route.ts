import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDocumentsMappingComponent } from './client-documents-mapping/client-documents-mapping.component';

const routes: Routes = [
  { path: 'clientdocumentsmappingComponent', component: ClientDocumentsMappingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDocumentsMappingRoutingModule { }


