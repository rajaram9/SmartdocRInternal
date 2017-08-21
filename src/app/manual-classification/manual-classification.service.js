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
var app_config_service_1 = require('../app.config.service');
var helper_service_1 = require('../core/helper-service/helper.service');
var ManualClassificationService = (function () {
    function ManualClassificationService(appConfigService, helperService, http) {
        this.appConfigService = appConfigService;
        this.helperService = helperService;
        this.http = http;
        this.apiUrl = this.appConfigService.getConfig('apiUrl');
    }
    ManualClassificationService.prototype.generateImageFromPdf = function (batchName) {
        return this.http.get(this.appConfigService.getConfig('apiUrl') + "api/createImageFromPdf?BatchName=" + batchName)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ManualClassificationService.prototype.saveClassifiedPages = function (batchName, docTypes) {
        var docForSave = this.formatDocTypeForSave(batchName, docTypes);
        return this.http.post(this.apiUrl + "api/SaveManualClassification", docForSave)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ManualClassificationService.prototype.formatDocTypeForSave = function (batchName, docTypes) {
        var docForSave = {};
        var pagesForSave = [];
        var extn = this.helperService.getFileExtension(docTypes[0].pages[0].originalName);
        docTypes.map(function (docType) {
            docType.pages.map(function (page, index) {
                pagesForSave.push({
                    originalName: page.originalName,
                    updatedName: docType.nameWithIndex + "~" + (index + 1) + "." + extn
                });
            });
        });
        docForSave.batchName = batchName;
        docForSave.pages = pagesForSave;
        return docForSave;
    };
    ManualClassificationService.prototype.generatePdf = function (batchName, pdfPages) {
        var pdfRequest = {
            batchName: batchName,
            Images: pdfPages
        };
        return this.http.post(this.apiUrl + "api/CreatePdfFromImages", pdfRequest)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ManualClassificationService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    ManualClassificationService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    ManualClassificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [app_config_service_1.AppConfigService, helper_service_1.HelperService, http_1.Http])
    ], ManualClassificationService);
    return ManualClassificationService;
}());
exports.ManualClassificationService = ManualClassificationService;
//# sourceMappingURL=manual-classification.service.js.map