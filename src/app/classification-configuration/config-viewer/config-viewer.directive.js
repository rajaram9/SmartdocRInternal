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
var CellDirective = (function () {
    function CellDirective(el) {
        this.el = el;
        this.ngModelChange = new core_1.EventEmitter();
    }
    CellDirective.prototype.onKeyUp = function () {
        this.ngModelChange.emit(this.el.nativeElement.innerText);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CellDirective.prototype, "ngModelChange", void 0);
    CellDirective = __decorate([
        core_1.Directive({
            selector: '[cellDirective]',
            host: {
                '(keyup)': 'onKeyUp()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CellDirective);
    return CellDirective;
}());
exports.CellDirective = CellDirective;
var DocTypeDirective = (function () {
    function DocTypeDirective(el) {
        this.el = el;
        this.ngModel = "";
        this.ngModelChange = new core_1.EventEmitter();
        this.docTypeChange = new core_1.EventEmitter();
    }
    DocTypeDirective.prototype.onChange = function () {
        var updatedValue = this.el.nativeElement.innerText.trim();
        var changeData = {};
        changeData.oldValue = this.ngModel;
        changeData.newValue = updatedValue;
        this.docTypeChange.emit(changeData);
        this.ngModelChange.emit(updatedValue);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocTypeDirective.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocTypeDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocTypeDirective.prototype, "docTypeChange", void 0);
    DocTypeDirective = __decorate([
        core_1.Directive({
            selector: '[docTypeDirective]',
            host: {
                '(input)': 'onChange()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DocTypeDirective);
    return DocTypeDirective;
}());
exports.DocTypeDirective = DocTypeDirective;
var DocSummaryDirective = (function () {
    function DocSummaryDirective(el) {
        this.el = el;
        this.ngModel = '';
        this.docType = '';
        this.docProperty = '';
        this.ngModelChange = new core_1.EventEmitter();
        this.docSummaryChange = new core_1.EventEmitter();
    }
    DocSummaryDirective.prototype.onChange = function () {
        var updatedValue = this.el.nativeElement.innerText.trim();
        var changeData = {};
        changeData.oldValue = this.ngModel;
        changeData.newValue = updatedValue;
        changeData.property = this.docProperty;
        changeData.docType = this.docType;
        this.docSummaryChange.emit(changeData);
        this.ngModelChange.emit(updatedValue);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocSummaryDirective.prototype, "ngModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocSummaryDirective.prototype, "docType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocSummaryDirective.prototype, "docProperty", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocSummaryDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocSummaryDirective.prototype, "docSummaryChange", void 0);
    DocSummaryDirective = __decorate([
        core_1.Directive({
            selector: '[docSummaryDirective]',
            host: {
                '(input)': 'onChange()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DocSummaryDirective);
    return DocSummaryDirective;
}());
exports.DocSummaryDirective = DocSummaryDirective;
//# sourceMappingURL=config-viewer.directive.js.map