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
var ConfidenceDirective = (function () {
    function ConfidenceDirective(el) {
        this.el = el;
    }
    ConfidenceDirective.prototype.ngDoCheck = function () {
        if (this.confidence > 70) {
            this.el.nativeElement.className += ' white';
        }
        if (this.confidence < 70 && this.confidence > 50) {
            this.el.nativeElement.className += ' yellow';
        }
        if (this.confidence < 50) {
            this.el.nativeElement.className += ' red';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConfidenceDirective.prototype, "confidence", void 0);
    ConfidenceDirective = __decorate([
        core_1.Directive({
            selector: '[confidence]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ConfidenceDirective);
    return ConfidenceDirective;
}());
exports.ConfidenceDirective = ConfidenceDirective;
//# sourceMappingURL=workarea-confidence.directive.js.map