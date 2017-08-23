import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routing } from './app.route';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { HotkeyModule } from 'angular2-hotkeys';

// core module
import { CoreModule } from './core/core.module';

// shared module
import { SharedModule } from './shared/shared.module';

// // components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BatchManagmentAuditComponent } from './module2-batch-management-audit/batch-management-audit.component';
import { BatchManagmentComponent } from './module2-batch-management/batch-management.component';
import { UserLeftNavComponent } from './user-left-nav/left-nav.component';
import { AuditActionBarComponent } from './action-bar-audit/action-bar.component';
import { UserActionBarComponent } from './action-bar-user/action-bar.component';
import { ClientDocumentsMappingModule } from './client-documents-mapping/client-documents-mapping.module';

// services
import { AppConfigService } from './app.config.service';


import { LoadingAnimateModule, LoadingAnimateService } from 'ng2-loading-animate';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FirstPageComponent } from './first-page/first-page.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { CompanyIndexComponent } from './company-index/company-index.component';
import { ModuleIndexComponent } from './module-index/module-index.component';
import { OperatorComponent } from './operator/operator.component';
import { PermissionComponent } from './permission/permission.component';
import { ClientComponent } from './client/client.component';
import { ProcessComponent } from './process/process.component';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavLeftProcessComponent } from './nav-left-process/nav-left-process.component';
import { HeaderNewComponent } from './header-new/header-new.component';




@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule,
    routing, CoreModule, SharedModule, ClientDocumentsMappingModule,
    HotkeyModule.forRoot(), LoadingAnimateModule.forRoot(), Ng2DragDropModule.forRoot()
  ],

  declarations: [AppComponent,
    HomeComponent, BatchManagmentAuditComponent, AuditActionBarComponent,
    BatchManagmentComponent, UserLeftNavComponent, UserActionBarComponent, FirstPageComponent, WorkFlowComponent, EditDetailsComponent, CompanyIndexComponent, ModuleIndexComponent, OperatorComponent, PermissionComponent, ClientComponent, ProcessComponent, NavLeftComponent, NavLeftProcessComponent, HeaderNewComponent
  ],
  bootstrap: [AppComponent],
  providers: [AppConfigService, LoadingAnimateService]
})
export class AppModule { }

