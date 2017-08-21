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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var BatchManagementAdminService = (function () {
    function BatchManagementAdminService(http) {
        this.http = http;
    }
    BatchManagementAdminService.prototype.getBatches = function () {
        return this.http.get('http://52.173.95.64:8081/api/getBatches')
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    BatchManagementAdminService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    BatchManagementAdminService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    BatchManagementAdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BatchManagementAdminService);
    return BatchManagementAdminService;
}());
exports.BatchManagementAdminService = BatchManagementAdminService;
//# sourceMappingURL=batch-management-admin.service.js.map