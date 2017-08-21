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
var fileUploadTrigger_directive_1 = require('./fileUploadTrigger.directive');
var upload_service_1 = require('../../core/upload-service/upload.service');
var ActionBarComponent = (function () {
    function ActionBarComponent(uploadService) {
        this.uploadService = uploadService;
        this.newBatch = new core_1.EventEmitter();
    }
    ActionBarComponent.prototype.ngOnInit = function () { };
    ActionBarComponent.prototype.triggerUpload = function () {
        this.fileUploadTriggerDirective.openFileDialog();
    };
    ActionBarComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var files = event.target.files;
        var uploadUrl = 'http://52.173.95.64:8081/api/upload';
        this.uploadService.uploadFilesToServer(files, uploadUrl).subscribe(function (successResponse) {
            var response = successResponse;
            _this.newBatch.emit(response);
        }, function (error) { });
    };
    __decorate([
        core_1.ViewChild(fileUploadTrigger_directive_1.FileUploadTriggerDirective), 
        __metadata('design:type', fileUploadTrigger_directive_1.FileUploadTriggerDirective)
    ], ActionBarComponent.prototype, "fileUploadTriggerDirective", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionBarComponent.prototype, "newBatch", void 0);
    ActionBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'action-bar',
            templateUrl: 'action-bar.component.html',
            styleUrls: ['action-bar.component.css']
        }), 
        __metadata('design:paramtypes', [upload_service_1.UploadService])
    ], ActionBarComponent);
    return ActionBarComponent;
}());
exports.ActionBarComponent = ActionBarComponent;
//# sourceMappingURL=action-bar.component.js.map