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
var WorkAreaComponent = (function () {
    function WorkAreaComponent() {
        this.docTypes = [];
        this.save = new core_1.EventEmitter();
        this.pdf = new core_1.EventEmitter();
        this.activeNavItem = 'doc';
    }
    WorkAreaComponent.prototype.ngOnInit = function () { };
    WorkAreaComponent.prototype.onNavItemChanged = function (selectedNav) {
        this.activeNavItem = selectedNav;
    };
    WorkAreaComponent.prototype.onDocSelected = function (selectedDoc) {
        this.currentActiveDoc = selectedDoc;
    };
    WorkAreaComponent.prototype.onDrag = function (eventData) {
        var sourcePageGroupIndex = eventData.sourceData.pageGroupIndex;
        var sourcePageIndex = eventData.sourceData.pageIndex;
        var destinationPageGroupIndex = eventData.destinationData.pageGroupIndex;
        var destinationPageIndex = eventData.destinationData.pageIndex;
        // Move Object
        this.docTypes[destinationPageGroupIndex].pages
            .splice(destinationPageIndex, 0, this.docTypes[sourcePageGroupIndex].pages.splice(sourcePageIndex, 1)[0]);
    };
    WorkAreaComponent.prototype.onDocTypeDrag = function (eventData) {
        var sourcePageGroupIndex = eventData.sourceData.pageGroupIndex;
        var destinationPageGroupIndex = eventData.destinationData.pageGroupIndex;
        // Move Object
        this.docTypes.splice(destinationPageGroupIndex, 0, this.docTypes.splice(sourcePageGroupIndex, 1)[0]);
    };
    WorkAreaComponent.prototype.onSave = function () {
        this.save.emit();
    };
    WorkAreaComponent.prototype.onPdfRequest = function (pdfRequest) {
        this.pdf.emit(pdfRequest);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], WorkAreaComponent.prototype, "docTypes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkAreaComponent.prototype, "save", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkAreaComponent.prototype, "pdf", void 0);
    WorkAreaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manual-classification-workarea',
            templateUrl: 'workarea.component.html',
            styleUrls: ['workarea.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], WorkAreaComponent);
    return WorkAreaComponent;
}());
exports.WorkAreaComponent = WorkAreaComponent;
//# sourceMappingURL=workarea.component.js.map