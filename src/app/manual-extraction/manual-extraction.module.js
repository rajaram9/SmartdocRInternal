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
var manual_extraction_route_module_1 = require('./manual-extraction-route.module');
var shared_module_1 = require('../shared/shared.module');
var manual_extraction_component_1 = require('./manual-extraction.component');
var workarea_component_1 = require('./workarea/workarea.component');
var workarea_confidence_directive_1 = require('./workarea/workarea-confidence.directive');
var doc_carousel_component_1 = require('./extraction-doc-carousel/doc-carousel.component');
var doc_viewer_component_1 = require('./extraction-doc-viewer/doc-viewer.component');
var manual_extraction_service_1 = require('./manual-extraction.service');
var ManualExtractionModule = (function () {
    function ManualExtractionModule() {
    }
    ManualExtractionModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, manual_extraction_route_module_1.ManualExtractionRouteModule],
            declarations: [manual_extraction_component_1.ManualExtractionComponent, workarea_component_1.ManualExtractionWorkareaComponent, workarea_confidence_directive_1.ConfidenceDirective,
                doc_carousel_component_1.ExtractionDocCarouselComponent, doc_viewer_component_1.ExtractionDocViewerComponent],
            providers: [manual_extraction_service_1.ManualExtractionService]
        }), 
        __metadata('design:paramtypes', [])
    ], ManualExtractionModule);
    return ManualExtractionModule;
}());
exports.ManualExtractionModule = ManualExtractionModule;
//# sourceMappingURL=manual-extraction.module.js.map