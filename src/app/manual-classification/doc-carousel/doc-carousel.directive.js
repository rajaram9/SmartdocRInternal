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
var DocCarouselDragDirective = (function () {
    function DocCarouselDragDirective(el) {
        this.el = el;
        this.pageIndex = 0;
        this.pageGroupIndex = 0;
    }
    DocCarouselDragDirective.prototype.onDragStart = function (event) {
        var sourceData = {
            pageIndex: this.pageIndex,
            pageGroupIndex: this.pageGroupIndex
        };
        event.dataTransfer.setData('sourceData', JSON.stringify(sourceData));
    };
    DocCarouselDragDirective.prototype.onDragEnter = function (event) {
        event.preventDefault();
    };
    DocCarouselDragDirective.prototype.onDragLeave = function (event) {
        event.preventDefault();
    };
    DocCarouselDragDirective.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    DocCarouselDragDirective.prototype.onDrop = function (event) {
        event.preventDefault();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DocCarouselDragDirective.prototype, "pageIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DocCarouselDragDirective.prototype, "pageGroupIndex", void 0);
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DocCarouselDragDirective.prototype, "onDragStart", null);
    __decorate([
        core_1.HostListener('dragenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DocCarouselDragDirective.prototype, "onDragEnter", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DocCarouselDragDirective.prototype, "onDragLeave", null);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DocCarouselDragDirective.prototype, "onDragOver", null);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DocCarouselDragDirective.prototype, "onDrop", null);
    DocCarouselDragDirective = __decorate([
        core_1.Directive({
            selector: '[docCarouselDrag]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DocCarouselDragDirective);
    return DocCarouselDragDirective;
}());
exports.DocCarouselDragDirective = DocCarouselDragDirective;
//# sourceMappingURL=doc-carousel.directive.js.map