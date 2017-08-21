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
var IconNavComponent = (function () {
    function IconNavComponent() {
        this.active = '';
        this.navItemChanged = new core_1.EventEmitter();
        this.active = 'doc';
    }
    IconNavComponent.prototype.ngOnInit = function () { };
    IconNavComponent.prototype.selectNavItem = function (selectedItem) {
        if (this.active === selectedItem) {
            this.active = '';
            this.navItemChanged.emit('');
        }
        else {
            this.active = selectedItem;
            this.navItemChanged.emit(selectedItem);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], IconNavComponent.prototype, "navItemChanged", void 0);
    IconNavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'icon-nav',
            templateUrl: 'icon-nav.component.html',
            styleUrls: ['icon-nav.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], IconNavComponent);
    return IconNavComponent;
}());
exports.IconNavComponent = IconNavComponent;
//# sourceMappingURL=icon-nav.component.js.map