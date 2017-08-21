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
var ColumnToolsDirective = (function () {
    function ColumnToolsDirective(el) {
        this.el = el;
    }
    ColumnToolsDirective.prototype.ngAfterViewInit = function () {
        $(this.el.nativeElement).mouseover(function (event) {
            $(event.target).addClass('tools-enabled');
        });
        $(this.el.nativeElement).mouseleave(function (event) {
            $(event.target).removeClass('tools-enabled');
        });
    };
    ColumnToolsDirective = __decorate([
        core_1.Directive({
            selector: '[columnTools]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ColumnToolsDirective);
    return ColumnToolsDirective;
}());
exports.ColumnToolsDirective = ColumnToolsDirective;
var GridPropertyDirective = (function () {
    function GridPropertyDirective(el) {
        this.el = el;
        this.gridWidth = new core_1.EventEmitter();
    }
    GridPropertyDirective.prototype.ngAfterViewInit = function () {
        var elementWidth = $(this.el.nativeElement).width();
        this.gridWidth.emit(elementWidth);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridPropertyDirective.prototype, "gridWidth", void 0);
    GridPropertyDirective = __decorate([
        core_1.Directive({
            selector: '[gridProperty]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GridPropertyDirective);
    return GridPropertyDirective;
}());
exports.GridPropertyDirective = GridPropertyDirective;
//# sourceMappingURL=grid-column-tools.directive.js.map