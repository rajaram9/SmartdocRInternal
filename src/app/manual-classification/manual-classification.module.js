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
var manual_classification_route_module_1 = require('./manual-classification-route.module');
var manual_classification_service_1 = require('./manual-classification.service');
var shared_module_1 = require('../shared/shared.module');
var manual_classification_component_1 = require('./manual-classification.component');
var workarea_component_1 = require('./workarea/workarea.component');
var doc_viewer_component_1 = require('./doc-viewer/doc-viewer.component');
var doc_carousel_component_1 = require('./doc-carousel/doc-carousel.component');
var doc_carousel_directive_1 = require('./doc-carousel/doc-carousel.directive');
var ManualClassificationModule = (function () {
    function ManualClassificationModule() {
    }
    ManualClassificationModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, manual_classification_route_module_1.ManualClassificationRouteModule],
            declarations: [manual_classification_component_1.ManualClassificationComponent, workarea_component_1.WorkAreaComponent, doc_viewer_component_1.DocViewerComponent, doc_carousel_component_1.DocCarouselComponent, doc_carousel_directive_1.DocCarouselDragDirective],
            providers: [manual_classification_service_1.ManualClassificationService]
        }), 
        __metadata('design:paramtypes', [])
    ], ManualClassificationModule);
    return ManualClassificationModule;
}());
exports.ManualClassificationModule = ManualClassificationModule;
//# sourceMappingURL=manual-classification.module.js.map