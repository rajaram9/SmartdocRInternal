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
var shared_module_1 = require('../shared/shared.module');
var classification_configuration_route_1 = require('./classification-configuration.route');
var classification_config_component_1 = require('./classification-config/classification-config.component');
var uploadtemplate_component_1 = require('./uploadtemplate/uploadtemplate.component');
var docSearch_component_1 = require('./docSearch/docSearch.component');
var config_viewer_component_1 = require('./config-viewer/config-viewer.component');
var new_classification_config_component_1 = require('./new-classification-config/new-classification-config.component');
var config_viewer_directive_1 = require('./config-viewer/config-viewer.directive');
var docSearch_pipe_1 = require('./docSearch/docSearch.pipe');
var config_viewer_pipe_1 = require('./config-viewer/config-viewer.pipe');
var config_viewer_service_1 = require('./config-viewer/config-viewer.service');
var ClassificationConfigurationModule = (function () {
    function ClassificationConfigurationModule() {
    }
    ClassificationConfigurationModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, classification_configuration_route_1.ClassificationConfigurationRouterModule],
            providers: [config_viewer_service_1.ConfigViewerService],
            declarations: [
                classification_config_component_1.ClassificationConfig, docSearch_component_1.DocSearchComponent, docSearch_pipe_1.DocSearchPipe, uploadtemplate_component_1.UploadtemplateComponent, config_viewer_component_1.ConfigViewerComponent,
                new_classification_config_component_1.NewClassificationConfigComponent,
                config_viewer_directive_1.CellDirective, config_viewer_directive_1.DocSummaryDirective, config_viewer_directive_1.DocTypeDirective,
                config_viewer_pipe_1.DocTypePipe
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], ClassificationConfigurationModule);
    return ClassificationConfigurationModule;
}());
exports.ClassificationConfigurationModule = ClassificationConfigurationModule;
//# sourceMappingURL=classification-configuration.module.js.map