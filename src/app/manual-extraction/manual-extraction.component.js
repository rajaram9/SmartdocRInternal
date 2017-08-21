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
var batch_image_service_1 = require('../core/batch-image-service/batch-image.service');
var manual_extraction_service_1 = require('./manual-extraction.service');
var ManualExtractionComponent = (function () {
    //selectedDocType:any;
    function ManualExtractionComponent(activatedRoute, batchImageService, manualExtractionService) {
        this.activatedRoute = activatedRoute;
        this.batchImageService = batchImageService;
        this.manualExtractionService = manualExtractionService;
        this.batchData = [];
        this.docTypes = [];
    }
    ManualExtractionComponent.prototype.getBatchImages = function (batchName) {
        var _this = this;
        this.batchImageService.getBatchImages(batchName)
            .subscribe(function (batchImages) { _this.formatBatchImages(batchImages); }, function (error) { });
    };
    ManualExtractionComponent.prototype.formatBatchImages = function (imageBatches) {
        var _this = this;
        this.batchImageService.formatBatchImage(imageBatches, this.batchName)
            .subscribe(function (images) { _this.docTypes = images; }, function (error) { });
    };
    ManualExtractionComponent.prototype.getExtractedData = function (batchID) {
        var _this = this;
        this.manualExtractionService.getExtractedData(batchID).subscribe(function (extractData) { _this.batchData = extractData; }, function (error) { console.log(error); });
    };
    // life cycle hook
    ManualExtractionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.activatedRoute.queryParams.subscribe(function (param) {
            _this.batchName = param['batchName'];
            _this.batchID = param['batchID'];
            _this.getBatchImages(_this.batchName);
            _this.getExtractedData(_this.batchID);
            console.log(_this.batchName);
        });
    };
    ManualExtractionComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    ManualExtractionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manual-extraction',
            templateUrl: 'manual-extraction.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, batch_image_service_1.BatchImageService, manual_extraction_service_1.ManualExtractionService])
    ], ManualExtractionComponent);
    return ManualExtractionComponent;
}());
exports.ManualExtractionComponent = ManualExtractionComponent;
//# sourceMappingURL=manual-extraction.component.js.map