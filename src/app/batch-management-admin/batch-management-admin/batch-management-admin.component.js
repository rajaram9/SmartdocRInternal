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
var router_1 = require('@angular/router');
var grid_mock_data_1 = require('../../shared/grid/grid-mock-data');
var grid_component_1 = require('../../shared/grid/grid.component');
var batch_management_admin_service_1 = require('./batch-management-admin.service');
var status_interface_1 = require('../../interfaces/status.interface');
var BatchManagmentAdminComponent = (function () {
    function BatchManagmentAdminComponent(batchManagementAdminService, router) {
        this.batchManagementAdminService = batchManagementAdminService;
        this.router = router;
        this.leftNavOpen = true;
        this.gridData = [];
        this.gridHeaders = grid_mock_data_1.gridHeaders;
    }
    BatchManagmentAdminComponent.prototype.ngOnInit = function () {
        this.getBatches();
    };
    BatchManagmentAdminComponent.prototype.onDateChange = function (dateInfo) {
        console.log(dateInfo);
    };
    BatchManagmentAdminComponent.prototype.toggleLeftNavBar = function () {
        this.leftNavOpen = !this.leftNavOpen;
    };
    BatchManagmentAdminComponent.prototype.onNewBatchAdded = function (batchDetails) {
        this.gridTableComponent.addRowToGrid(this.formatBatchDetails(batchDetails));
    };
    BatchManagmentAdminComponent.prototype.formatBatchDetails = function (batchDetails) {
        var _this = this;
        var batchs = [];
        batchDetails.map(function (batch) {
            var eta = new Date();
            eta.setHours(eta.getHours() + 1);
            var newBatchObj = {};
            newBatchObj['batchid'] = batch['batchid'];
            newBatchObj['statusid'] = status_interface_1.OCRStatus[batch['statusid']];
            newBatchObj['ocrengine'] = batch['ocrengine'];
            newBatchObj['eta'] = _this.formatDate(eta);
            newBatchObj['received'] = _this.formatDate(batch['createddate']);
            newBatchObj['priority'] = '-';
            newBatchObj['queue'] = '-';
            newBatchObj['workflowName'] = '-';
            newBatchObj['operatorName'] = '-';
            newBatchObj['notes'] = '-';
            newBatchObj['batchname'] = batch['batchname'];
            batchs.push(newBatchObj);
        });
        return batchs;
    };
    BatchManagmentAdminComponent.prototype.formatDate = function (date) {
        var options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleDateString('en-IN', options);
    };
    BatchManagmentAdminComponent.prototype.getBatches = function () {
        var _this = this;
        this.batchManagementAdminService.getBatches().subscribe(function (batches) {
            _this.gridTableComponent.addRowToGrid(_this.formatBatchDetails(batches));
        }, function (error) { });
    };
    BatchManagmentAdminComponent.prototype.openClassification = function (batchname) {
        this.router.navigate(['manualClassification'], { queryParams: { batchName: batchname } });
    };
    BatchManagmentAdminComponent.prototype.openExtraction = function (extractionReq) {
        this.router.navigate(['manualExtraction'], {
            queryParams: {
                batchName: extractionReq.batchname,
                batchID: extractionReq.batchID
            }
        });
    };
    __decorate([
        core_1.ViewChild(grid_component_1.GridTableComponent), 
        __metadata('design:type', grid_component_1.GridTableComponent)
    ], BatchManagmentAdminComponent.prototype, "gridTableComponent", void 0);
    BatchManagmentAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'batch-managment-admin',
            templateUrl: 'batch-management-admin.component.html',
            styleUrls: ['batch-management-admin.component.css'],
            providers: [batch_management_admin_service_1.BatchManagementAdminService]
        }), 
        __metadata('design:paramtypes', [batch_management_admin_service_1.BatchManagementAdminService, router_1.Router])
    ], BatchManagmentAdminComponent);
    return BatchManagmentAdminComponent;
}());
exports.BatchManagmentAdminComponent = BatchManagmentAdminComponent;
//# sourceMappingURL=batch-management-admin.component.js.map