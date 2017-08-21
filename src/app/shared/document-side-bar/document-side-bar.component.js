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
var helper_service_1 = require('../../core/helper-service/helper.service');
var DocumentSideBarComponent = (function () {
    function DocumentSideBarComponent(helperService) {
        this.helperService = helperService;
        this.docTypes = [];
        this.pagedrag = new core_1.EventEmitter();
        this.docTypeDrag = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
        this.pdf = new core_1.EventEmitter();
        this.selectedDocType = new core_1.EventEmitter();
    }
    DocumentSideBarComponent.prototype.ngOnInit = function () {
    };
    DocumentSideBarComponent.prototype.onDrop = function (eventData) {
        this.pagedrag.emit(eventData);
    };
    DocumentSideBarComponent.prototype.onDocTypeDrop = function (eventData) {
        this.docTypeDrag.emit(eventData);
    };
    DocumentSideBarComponent.prototype.saveDocType = function () {
        this.save.emit();
    };
    DocumentSideBarComponent.prototype.generatePdf = function (pdfSection) {
        // there is no know method for check array so we check array function (concat only available in array)
        if (typeof pdfSection.concat === 'function') {
            var pdfRequest = this.getFileNameFromDocTypesArray(pdfSection);
            this.pdf.emit(pdfRequest);
        }
        else {
            var pdfRequest = this.getFileNameFromDocTypeObject(pdfSection);
            this.pdf.emit(pdfRequest);
        }
    };
    DocumentSideBarComponent.prototype.getFileNameFromDocTypesArray = function (docTypes) {
        var extn = this.helperService.getFileExtension(docTypes[0].pages[0].originalName);
        var pdfReqArray = [];
        docTypes.map(function (docType) {
            docType.pages.map(function (page, index) {
                pdfReqArray.push(docType.nameWithIndex + "~" + (index + 1) + "." + extn);
            });
        });
        return pdfReqArray;
    };
    DocumentSideBarComponent.prototype.getFileNameFromDocTypeObject = function (docType) {
        var extn = this.helperService.getFileExtension(docType.pages[0].originalName);
        var pdfReqArray = [];
        docType.pages.map(function (page, index) {
            pdfReqArray.push(docType.nameWithIndex + "~" + (index + 1) + "." + extn);
        });
        return pdfReqArray;
    };
    DocumentSideBarComponent.prototype.addNewDocType = function () {
        var newDocType = {
            name: 'New Document',
            nameWithIndex: 'New Document',
            isClassified: true,
            isExpanded: true,
            pages: []
        };
        this.docTypes.push(newDocType);
    };
    DocumentSideBarComponent.prototype.onSelectedclick = function (SelectedData) {
        //eventData.isExpanded=!eventData.isExpanded;
        this.selectedDocType.emit(SelectedData);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentSideBarComponent.prototype, "docTypes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentSideBarComponent.prototype, "pagedrag", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentSideBarComponent.prototype, "docTypeDrag", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentSideBarComponent.prototype, "save", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentSideBarComponent.prototype, "pdf", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentSideBarComponent.prototype, "selectedDocType", void 0);
    DocumentSideBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'document-side-bar',
            templateUrl: 'document-side-bar.component.html',
            styleUrls: ['document-side-bar.component.css']
        }), 
        __metadata('design:paramtypes', [helper_service_1.HelperService])
    ], DocumentSideBarComponent);
    return DocumentSideBarComponent;
}());
exports.DocumentSideBarComponent = DocumentSideBarComponent;
//# sourceMappingURL=document-side-bar.component.js.map