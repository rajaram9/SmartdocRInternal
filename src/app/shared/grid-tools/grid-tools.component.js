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
var GridToolsComponent = (function () {
    function GridToolsComponent() {
        this.filterItemChanged = new core_1.EventEmitter();
        this.active = 1;
    }
    GridToolsComponent.prototype.ngOnInit = function () {
    };
    GridToolsComponent.prototype.filterItemClick = function (filterItem, status) {
        var filterItemDetails = {
            item: filterItem,
            status: status
        };
        this.filterItemChanged.emit(filterItemDetails);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GridToolsComponent.prototype, "filterArray", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridToolsComponent.prototype, "filterItemChanged", void 0);
    GridToolsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'grid-tools',
            templateUrl: 'grid-tools.component.html',
            styleUrls: ['grid-tools.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], GridToolsComponent);
    return GridToolsComponent;
}());
exports.GridToolsComponent = GridToolsComponent;
//# sourceMappingURL=grid-tools.component.js.map