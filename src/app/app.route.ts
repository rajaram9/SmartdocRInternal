import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { BatchManagmentAuditComponent } from './module2-batch-management-audit/batch-management-audit.component';
import { BatchManagmentComponent } from './module2-batch-management/batch-management.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { CompanyIndexComponent } from './company-index/company-index.component';
import { ModuleIndexComponent } from './module-index/module-index.component';
import { OperatorComponent } from './operator/operator.component';
import { PermissionComponent } from './permission/permission.component';
import { ClientComponent } from './client/client.component';
import { ProcessComponent } from './process/process.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path:'firstPage', component: FirstPageComponent }, 
  { path:'editDetails', component:EditDetailsComponent },
  { path:'moduleIndex', component:ModuleIndexComponent },
  { path:'company', component:CompanyIndexComponent },
  { path:'permission', component:PermissionComponent },
  { path:'process', component:ProcessComponent },
  { path:'client', component:ClientComponent },
  { path:'workflow', component: WorkFlowComponent },
  { path:'operator', component: OperatorComponent },
  { path: 'batchManagmentAudit', component: BatchManagmentAuditComponent },
  { path: 'batchManagment', component: BatchManagmentComponent },
  { path: 'manualClassification', loadChildren: './manual-classification/manual-classification.module#ManualClassificationModule' },
  { path: 'manualExtraction', loadChildren: './manual-extraction/manual-extraction.module#ManualExtractionModule' },
  { path: 'batchManagmentAdmin', loadChildren: './batch-management-admin/batch-management-admin.module#BatchManagementAdminModule' },
  {
    path: 'calssificationConfig',
    loadChildren: './classification-configuration/classification-configuration.module#ClassificationConfigurationModule'
  },
  { path: 'classification', loadChildren: './classification/classification.module#ClassificationModule' },
  { path: 'extractionConfig', loadChildren: './extraction-config/extraction-config.module#ExtractionConfigModule' }

];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
