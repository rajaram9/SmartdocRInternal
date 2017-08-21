import { NgModule } from '@angular/core';

import { BatchManagementAdminRouterModule } from './batch-management-admin.router';
import { SharedModule } from '../shared/shared.module';
import { ActionBarComponent } from './action-bar-admin/action-bar.component';
import { BatchManagmentAdminComponent } from './batch-management-admin/batch-management-admin.component';
import { FileUploadTriggerDirective } from './action-bar-admin/fileUploadTrigger.directive';


@NgModule({
    imports: [SharedModule, BatchManagementAdminRouterModule],
    declarations: [BatchManagmentAdminComponent, ActionBarComponent, FileUploadTriggerDirective],
    providers: [],
})
export class BatchManagementAdminModule { }
