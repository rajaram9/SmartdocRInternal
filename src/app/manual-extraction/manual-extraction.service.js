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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var app_config_service_1 = require('../app.config.service');
var helper_service_1 = require('../core/helper-service/helper.service');
var ManualExtractionService = (function () {
    function ManualExtractionService(appConfigService, helperService, http) {
        this.appConfigService = appConfigService;
        this.helperService = helperService;
        this.http = http;
        this.apiUrl = '';
        this.apiUrl = this.appConfigService.getConfig('apiUrl');
    }
    ManualExtractionService.prototype.getExtractedData = function (batchID) {
        return this.http.get(this.appConfigService.getConfig('apiUrl') + "api/getExtractData?BatchID=" + batchID)
            .map(this.helperService.extractdata)
            .catch(this.helperService.errorhandler);
    };
    ManualExtractionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [app_config_service_1.AppConfigService, helper_service_1.HelperService, http_1.Http])
    ], ManualExtractionService);
    return ManualExtractionService;
}());
exports.ManualExtractionService = ManualExtractionService;
//# sourceMappingURL=manual-extraction.service.js.map