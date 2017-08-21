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
var GridTableComponent = (function () {
    function GridTableComponent(helperService) {
        this.helperService = helperService;
        this.gridHeaders = [];
        this.gridData = [];
        this.classification = new core_1.EventEmitter();
        this.extraction = new core_1.EventEmitter();
        this.activeColumn = -1;
        this.mouseOverColumn = -1;
        this.columnWidth = 10;
        this.setColumnWidth(this.gridHeaders);
    }
    GridTableComponent.prototype.ngOnInit = function () {
    };
    GridTableComponent.prototype.addRowToGrid = function (rowData) {
        this.gridData = this.gridData.concat(rowData);
    };
    GridTableComponent.prototype.openColumnTools = function (index) {
        if (this.activeColumn === index) {
            this.activeColumn = -1;
        }
        else {
            this.activeColumn = index;
        }
    };
    GridTableComponent.prototype.addMouseOver = function (index) {
        if (this.activeColumn !== index) {
            this.activeColumn = -1;
        }
        this.mouseOverColumn = index;
    };
    GridTableComponent.prototype.removeMouseOver = function (index) {
        if (this.activeColumn !== index) {
            this.mouseOverColumn = -1;
        }
    };
    GridTableComponent.prototype.setColumnWidth = function (gridHeaders) {
        this.columnWidth = 100 / this.gridHeaders.length;
    };
    GridTableComponent.prototype.getDistinctValueOfProperty = function (array, prop) {
        console.log('grid  distinct value');
        var distinctValueArray = this.helperService.getDistinctValueOfProperty(array, prop);
        var formatedDistinctValueArray = [];
        for (var _i = 0, distinctValueArray_1 = distinctValueArray; _i < distinctValueArray_1.length; _i++) {
            var value = distinctValueArray_1[_i];
            var valueObj = {
                val: value,
                isChecked: false
            };
            formatedDistinctValueArray.push(valueObj);
        }
        return formatedDistinctValueArray;
    };
    GridTableComponent.prototype.onFilterItemChanged = function (filterItemDetails, headerDetails) {
        console.log(filterItemDetails, headerDetails);
    };
    GridTableComponent.prototype.ngOnChanges = function (changes) {
        if (changes.gridHeaders) {
            this.setColumnWidth(changes.gridHeaders.currentValue);
        }
    };
    GridTableComponent.prototype.openClassification = function (batchname) {
        this.classification.emit(batchname);
    };
    GridTableComponent.prototype.openExtraction = function (batchname, batchID) {
        var extractionReq = {
            batchID: batchID,
            batchname: batchname
        };
        this.extraction.emit(extractionReq);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GridTableComponent.prototype, "gridHeaders", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GridTableComponent.prototype, "gridData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridTableComponent.prototype, "classification", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridTableComponent.prototype, "extraction", void 0);
    GridTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'grid',
            templateUrl: 'grid.component.html',
            styleUrls: ['grid.component.css'],
        }), 
        __metadata('design:paramtypes', [helper_service_1.HelperService])
    ], GridTableComponent);
    return GridTableComponent;
}());
exports.GridTableComponent = GridTableComponent;
//# sourceMappingURL=grid.component.js.map