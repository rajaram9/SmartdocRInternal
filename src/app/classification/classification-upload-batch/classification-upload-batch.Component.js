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
var classification_upload_batch_service_1 = require('./classification-upload-batch.service');
var ClassificationBatchUploadComponent = (function () {
    function ClassificationBatchUploadComponent(classificationOutputService) {
        this.classificationOutputService = classificationOutputService;
    }
    ClassificationBatchUploadComponent.prototype.ngOnInit = function () {
        this.getFiles();
    };
    ClassificationBatchUploadComponent.prototype.onFileUploaded = function (batches) {
        this.files = this.files.concat(batches);
    };
    ClassificationBatchUploadComponent.prototype.getFiles = function () {
        var _this = this;
        this.classificationOutputService.getBatches().subscribe(function (data) { _this.files = data; }, function (error) { });
    };
    ClassificationBatchUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'classificationuploadbatchComponent',
            templateUrl: 'classification-upload-batch.html',
            styleUrls: ['classification-upload-batch.css'],
            providers: [classification_upload_batch_service_1.ClassificationOutputService]
        }), 
        __metadata('design:paramtypes', [classification_upload_batch_service_1.ClassificationOutputService])
    ], ClassificationBatchUploadComponent);
    return ClassificationBatchUploadComponent;
}());
exports.ClassificationBatchUploadComponent = ClassificationBatchUploadComponent;
//# sourceMappingURL=classification-upload-batch.Component.js.map