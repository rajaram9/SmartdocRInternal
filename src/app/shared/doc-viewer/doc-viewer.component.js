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
var app_config_service_1 = require('../../app.config.service');
var Cropper = require('cropper');
var DocViewerComponent = (function () {
    function DocViewerComponent(appConfigService) {
        this.appConfigService = appConfigService;
        this.doc = {};
        this.imageFolderPath = '';
        this.imagePath = '';
        this.imageFolderPath = this.appConfigService.getConfig('ocrImageEndPoint');
    }
    DocViewerComponent.prototype.ngOnInit = function () {
    };
    DocViewerComponent.prototype.ngAfterViewInit = function () {
        var image = this.imageViewer;
        var cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            crop: function (e) {
                console.log(e.detail.x);
                console.log(e.detail.y);
                console.log(e.detail.width);
                console.log(e.detail.height);
                console.log(e.detail.rotate);
                console.log(e.detail.scaleX);
                console.log(e.detail.scaleY);
            }
        });
    };
    DocViewerComponent.prototype.ngOnChanges = function () {
        if (this.doc) {
            this.imagePath = "" + this.imageFolderPath + this.doc.path;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DocViewerComponent.prototype, "doc", void 0);
    __decorate([
        core_1.ViewChild('imageViewer'), 
        __metadata('design:type', Object)
    ], DocViewerComponent.prototype, "imageViewer", void 0);
    DocViewerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doc-viewer',
            templateUrl: 'doc-viewer.component.html',
            styleUrls: ['doc-viewer.component.css']
        }), 
        __metadata('design:paramtypes', [app_config_service_1.AppConfigService])
    ], DocViewerComponent);
    return DocViewerComponent;
}());
exports.DocViewerComponent = DocViewerComponent;
//# sourceMappingURL=doc-viewer.component.js.map