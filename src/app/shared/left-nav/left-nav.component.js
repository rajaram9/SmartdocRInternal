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
var process_filter_mock_data_1 = require('../../shared/process-type-filter/process-filter-mock-data');
var doc_type_filter_mock_1 = require('../doc-type-filter/doc-type-filter.mock');
var LeftNavComponent = (function () {
    function LeftNavComponent() {
        this.docTypeFilter = [];
        this.attentionTypeFilter = [];
        this.autoProcessFilter = process_filter_mock_data_1.autoFilter;
        this.manuvalProcessFilter = process_filter_mock_data_1.autoFilter;
        this.docTypeFilter = doc_type_filter_mock_1.docFilter;
        this.attentionTypeFilter = doc_type_filter_mock_1.attentionFilter;
    }
    LeftNavComponent.prototype.ngOnInit = function () { };
    LeftNavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'leftnav',
            templateUrl: 'left-nav.component.html',
            styleUrls: ['left-nav.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], LeftNavComponent);
    return LeftNavComponent;
}());
exports.LeftNavComponent = LeftNavComponent;
//# sourceMappingURL=left-nav.component.js.map