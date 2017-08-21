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
var HeaderComponent = (function () {
    function HeaderComponent(helperService) {
        this.helperService = helperService;
        this.isMenuEnabled = false;
        this.toggleLeftNavBar = new core_1.EventEmitter();
        this.isHelpPanelOpen = false;
    }
    HeaderComponent.prototype.ngOnInit = function () { };
    HeaderComponent.prototype.toggleLeftNav = function () {
        this.toggleLeftNavBar.emit();
    };
    HeaderComponent.prototype.toggleHelp = function () {
        this.isHelpPanelOpen = !this.isHelpPanelOpen;
        this.helperService.openHelpPanel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeaderComponent.prototype, "isMenuEnabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeaderComponent.prototype, "toggleLeftNavBar", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'si-header',
            templateUrl: 'header.component.html',
            styleUrls: ['header.component.css']
        }), 
        __metadata('design:paramtypes', [helper_service_1.HelperService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map