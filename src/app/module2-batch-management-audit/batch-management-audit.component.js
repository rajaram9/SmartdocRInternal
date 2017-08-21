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
var grid_mock_data_1 = require('../shared/grid/grid-mock-data');
var BatchManagmentAuditComponent = (function () {
    function BatchManagmentAuditComponent() {
        this.leftNavOpen = true;
        this.gridData = grid_mock_data_1.gridData;
        this.gridHeaders = grid_mock_data_1.gridHeaders;
    }
    BatchManagmentAuditComponent.prototype.ngOnInit = function () { };
    BatchManagmentAuditComponent.prototype.onDateChange = function (dateInfo) {
        console.log(dateInfo);
    };
    BatchManagmentAuditComponent.prototype.toggleLeftNavBar = function () {
        this.leftNavOpen = !this.leftNavOpen;
    };
    BatchManagmentAuditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'batch-managment-audit',
            templateUrl: 'batch-management-audit.component.html',
            styleUrls: ['batch-management-audit.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], BatchManagmentAuditComponent);
    return BatchManagmentAuditComponent;
}());
exports.BatchManagmentAuditComponent = BatchManagmentAuditComponent;
//# sourceMappingURL=batch-management-audit.component.js.map