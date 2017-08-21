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
var DragAndDropDirective = (function () {
    function DragAndDropDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.pageIndex = 0;
        this.pageGroupIndex = 0;
        this.dragItemType = '';
        this.pageDrop = new core_1.EventEmitter();
        this.docTypeDrop = new core_1.EventEmitter();
    }
    DragAndDropDirective.prototype.onDragStart = function (event) {
        event.stopPropagation();
        event.dataTransfer.clearData();
        var sourceData = {};
        if (this.dragItemType === 'docType') {
            sourceData = {
                pageGroupIndex: this.pageGroupIndex
            };
            event.dataTransfer.setData('doctype', 'doctype');
        }
        else {
            sourceData = {
                pageIndex: this.pageIndex,
                pageGroupIndex: this.pageGroupIndex
            };
        }
        event.dataTransfer.setData('sourceData', JSON.stringify(sourceData));
    };
    DragAndDropDirective.prototype.onDragEnter = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.manageDragAndDropClass(event, true);
    };
    DragAndDropDirective.prototype.onDragLeave = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.manageDragAndDropClass(event, false);
    };
    DragAndDropDirective.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    DragAndDropDirective.prototype.onDrop = function (event) {
        // to prevent the drag event to bubble up 
        event.stopPropagation();
        this.manageDragAndDropClass(event, false);
        var sourceData = JSON.parse(event.dataTransfer.getData('sourceData'));
        if (event.dataTransfer.types.indexOf('doctype') !== -1) {
            var destinationData = {
                pageGroupIndex: this.pageGroupIndex
            };
            var eventData = {
                sourceData: sourceData,
                destinationData: destinationData
            };
            this.docTypeDrop.emit(eventData);
        }
        else if (sourceData.pageIndex) {
            var destinationData = {
                pageIndex: this.pageIndex,
                pageGroupIndex: this.pageGroupIndex
            };
            var eventData = {
                sourceData: sourceData,
                destinationData: destinationData
            };
            this.pageDrop.emit(eventData);
        }
    };
    DragAndDropDirective.prototype.manageDragAndDropClass = function (event, isAdd) {
        if (event.dataTransfer.types.indexOf('doctype') !== -1) {
            this.renderer.setElementClass(event.target, 'doctype-drag-enter', isAdd);
        }
        else {
            this.renderer.setElementClass(event.target, 'page-drag-enter', isAdd);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DragAndDropDirective.prototype, "pageIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DragAndDropDirective.prototype, "pageGroupIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DragAndDropDirective.prototype, "dragItemType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DragAndDropDirective.prototype, "pageDrop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DragAndDropDirective.prototype, "docTypeDrop", void 0);
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DragAndDropDirective.prototype, "onDragStart", null);
    __decorate([
        core_1.HostListener('dragenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DragAndDropDirective.prototype, "onDragEnter", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DragAndDropDirective.prototype, "onDragLeave", null);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DragAndDropDirective.prototype, "onDragOver", null);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DragAndDropDirective.prototype, "onDrop", null);
    DragAndDropDirective = __decorate([
        core_1.Directive({
            selector: '[dragAndDrop]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DragAndDropDirective);
    return DragAndDropDirective;
}());
exports.DragAndDropDirective = DragAndDropDirective;
var DocNameUpdateDirective = (function () {
    function DocNameUpdateDirective(el) {
        this.el = el;
        this.ngModelChange = new core_1.EventEmitter();
    }
    DocNameUpdateDirective.prototype.onChange = function () {
        var updatedValue = this.el.nativeElement.innerText.trim();
        this.ngModelChange.emit(updatedValue);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocNameUpdateDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.HostListener('input'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DocNameUpdateDirective.prototype, "onChange", null);
    DocNameUpdateDirective = __decorate([
        core_1.Directive({
            selector: '[docNameUpdate]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DocNameUpdateDirective);
    return DocNameUpdateDirective;
}());
exports.DocNameUpdateDirective = DocNameUpdateDirective;
//# sourceMappingURL=document-side-bar.directive.js.map