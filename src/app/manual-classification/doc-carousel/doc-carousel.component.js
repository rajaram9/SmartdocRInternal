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
var DocCarouselComponent = (function () {
    function DocCarouselComponent(appConfigService) {
        this.appConfigService = appConfigService;
        this.docTypes = [];
        this.itemSelected = new core_1.EventEmitter();
        this.uniqueDocTypeForMove = [];
        this.selectedPages = [];
        this.imagePath = '';
        this.imagePath = this.appConfigService.getConfig('ocrImageEndPoint');
    }
    DocCarouselComponent.prototype.ngOnInit = function () {
    };
    DocCarouselComponent.prototype.ngOnChanges = function () {
    };
    DocCarouselComponent.prototype.onItemSelect = function (selectedPage) {
        this.itemSelected.emit(selectedPage);
    };
    DocCarouselComponent.prototype.onSelectionChange = function (docTypeIndex, pageIndex, page, event) {
        event.stopPropagation();
        var selectionObject = {
            docTypeIndex: docTypeIndex,
            page: page
        };
        if (event.target.checked) {
            selectionObject.page.selected = true;
            this.selectedPages.push(selectionObject);
        }
        else {
            var selectedPageIndex = this.selectedPages.indexOf(selectionObject);
            this.selectedPages.splice(selectedPageIndex, 1);
            selectionObject.page.selected = false;
        }
    };
    DocCarouselComponent.prototype.movePages = function (targetDocTypeIndex) {
        var _this = this;
        this.selectedPages.map(function (selectedPage) {
            selectedPage.page.selected = false;
            var movingObjIndex = _this.docTypes[selectedPage.docTypeIndex].pages.indexOf(selectedPage.page);
            var movingObj = _this.docTypes[selectedPage.docTypeIndex].pages.splice(movingObjIndex, 1)[0];
            _this.docTypes[targetDocTypeIndex].pages.push(movingObj);
        });
        this.selectedPages = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocCarouselComponent.prototype, "docTypes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocCarouselComponent.prototype, "itemSelected", void 0);
    DocCarouselComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doc-carousel',
            templateUrl: 'doc-carousel.component.html',
            styleUrls: ['doc-carousel.component.css']
        }), 
        __metadata('design:paramtypes', [app_config_service_1.AppConfigService])
    ], DocCarouselComponent);
    return DocCarouselComponent;
}());
exports.DocCarouselComponent = DocCarouselComponent;
//# sourceMappingURL=doc-carousel.component.js.map