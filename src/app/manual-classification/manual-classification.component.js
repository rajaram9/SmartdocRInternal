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
var manual_classification_service_1 = require('./manual-classification.service');
var batch_image_service_1 = require('../core/batch-image-service/batch-image.service');
var app_config_service_1 = require('../app.config.service');
var ManualClassificationComponent = (function () {
    function ManualClassificationComponent(appConfigService, batchImageService, manualClassificationService, activatedRoute) {
        this.appConfigService = appConfigService;
        this.batchImageService = batchImageService;
        this.manualClassificationService = manualClassificationService;
        this.activatedRoute = activatedRoute;
        this.docTypes = [];
    }
    ManualClassificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.activatedRoute.queryParams.subscribe(function (param) {
            _this.batchName = param['batchName'];
            _this.generateImageFromPdf(_this.batchName);
            console.log(_this.batchName);
        });
    };
    ManualClassificationComponent.prototype.generateImageFromPdf = function (batchName) {
        var _this = this;
        this.manualClassificationService.generateImageFromPdf(batchName)
            .subscribe(function (success) { _this.getBatchImages(_this.batchName); }, function (error) { });
    };
    ManualClassificationComponent.prototype.getBatchImages = function (batchName) {
        var _this = this;
        this.batchImageService.getBatchImages(batchName)
            .subscribe(function (imageBatches) { _this.formatBatchImages(imageBatches); }, function (error) { });
    };
    ManualClassificationComponent.prototype.formatBatchImages = function (imageBatches) {
        var _this = this;
        this.batchImageService.formatBatchImage(imageBatches, this.batchName)
            .subscribe(function (images) { _this.docTypes = images; }, function (error) { });
    };
    ManualClassificationComponent.prototype.saveClassifiedPages = function () {
        this.manualClassificationService.saveClassifiedPages(this.batchName, this.docTypes).subscribe(function (success) { alert('saved'); }, function (error) { });
    };
    ManualClassificationComponent.prototype.onPdfRequest = function (pdfRequest) {
        var _this = this;
        this.manualClassificationService.generatePdf(this.batchName, pdfRequest).subscribe(function (link) {
            var pdfUrl = _this.appConfigService.getConfig('ocrImageEndPoint') + link;
            window.open(pdfUrl);
        }, function (error) { console.log(error); });
    };
    ManualClassificationComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    ManualClassificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manual-classification',
            templateUrl: 'manual-classification.component.html'
        }), 
        __metadata('design:paramtypes', [app_config_service_1.AppConfigService, batch_image_service_1.BatchImageService, manual_classification_service_1.ManualClassificationService, router_1.ActivatedRoute])
    ], ManualClassificationComponent);
    return ManualClassificationComponent;
}());
exports.ManualClassificationComponent = ManualClassificationComponent;
//# sourceMappingURL=manual-classification.component.js.map