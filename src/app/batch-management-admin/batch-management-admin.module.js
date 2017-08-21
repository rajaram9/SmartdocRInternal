"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var batch_management_admin_router_1 = require('./batch-management-admin.router');
var shared_module_1 = require('../shared/shared.module');
var action_bar_component_1 = require('./action-bar-admin/action-bar.component');
var batch_management_admin_component_1 = require('./batch-management-admin/batch-management-admin.component');
var fileUploadTrigger_directive_1 = require('./action-bar-admin/fileUploadTrigger.directive');
var BatchManagementAdminModule = (function () {
    function BatchManagementAdminModule() {
    }
    BatchManagementAdminModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, batch_management_admin_router_1.BatchManagementAdminRouterModule],
            declarations: [batch_management_admin_component_1.BatchManagmentAdminComponent, action_bar_component_1.ActionBarComponent, fileUploadTrigger_directive_1.FileUploadTriggerDirective],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], BatchManagementAdminModule);
    return BatchManagementAdminModule;
}());
exports.BatchManagementAdminModule = BatchManagementAdminModule;
//# sourceMappingURL=batch-management-admin.module.js.map