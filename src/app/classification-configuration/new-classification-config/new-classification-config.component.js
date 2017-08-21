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
var NewClassificationConfigComponent = (function () {
    function NewClassificationConfigComponent() {
        this.close = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
        this.newClassification = {};
    }
    NewClassificationConfigComponent.prototype.ngOnInit = function () { };
    NewClassificationConfigComponent.prototype.bladeClick = function (event) {
        if (event.offsetX < 0 && this.hasClass(event.srcElement, 'action-blade')) {
            this.closeBlade();
        }
    };
    NewClassificationConfigComponent.prototype.hasClass = function (element, className) {
        if (('' + element.className + '').replace(/[\n\t]/g, '').indexOf(className) > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    NewClassificationConfigComponent.prototype.closeBlade = function () {
        this.close.emit();
    };
    NewClassificationConfigComponent.prototype.onSubmit = function () {
        this.submit.emit(this.newClassification);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewClassificationConfigComponent.prototype, "close", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewClassificationConfigComponent.prototype, "submit", void 0);
    NewClassificationConfigComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new-classification-config',
            templateUrl: 'new-classification-config.component.html',
            styleUrls: ['new-classification-config.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], NewClassificationConfigComponent);
    return NewClassificationConfigComponent;
}());
exports.NewClassificationConfigComponent = NewClassificationConfigComponent;
//# sourceMappingURL=new-classification-config.component.js.map