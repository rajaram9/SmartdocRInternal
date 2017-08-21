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
var csv_service_1 = require('../../core/csv-service/csv.service');
var config_viewer_service_1 = require('./config-viewer.service');
var ConfigViewerComponent = (function () {
    function ConfigViewerComponent(csvService, configViewerService) {
        this.csvService = csvService;
        this.configViewerService = configViewerService;
        this.selectedDocTypes = [];
        this.selectedDocTypeSummary = {};
        this.distinctDocType = [];
        this.selectedDocType = '';
        this.activeIndex = 0;
        this.newClassificationOpen = false;
        this.newClassificationKeywordProperty = {};
    }
    ConfigViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.csvService.CSVSource$.subscribe(function (data) {
            _this.csvdata = data;
            _this.getDistinctDocType(data);
            _this.openDoc(data[0].DocTypeName);
        }, function (error) { });
    };
    ConfigViewerComponent.prototype.getDistinctDocType = function (csvdata) {
        var _this = this;
        csvdata.map(function (csvRow) {
            if (_this.distinctDocType.indexOf(csvRow.DocTypeName) === -1) {
                _this.distinctDocType.push(csvRow.DocTypeName);
            }
        });
    };
    ConfigViewerComponent.prototype.openDoc = function (docType) {
        this.selectedDocTypes = this.csvdata.filter(function (data) {
            return data.DocTypeName === docType;
        });
        this.selectedDocTypeSummary = this.selectedDocTypes[0];
        this.selectedDocType = docType;
    };
    ConfigViewerComponent.prototype.submit = function () {
        this.configViewerService.saveData(this.csvdata).subscribe(function (data) { }, function (error) { });
    };
    ConfigViewerComponent.prototype.onDocTypeChange = function (changeData) {
        this.csvdata.map(function (csvRow) {
            if (csvRow.DocTypeName === changeData.oldValue) {
                csvRow.DocTypeName = changeData.newValue;
            }
        });
    };
    ConfigViewerComponent.prototype.onDocSummaryChange = function (changeData) {
        this.csvdata.map(function (csvRow) {
            if (csvRow.DocTypeName === changeData.docType) {
                csvRow[changeData.property] = changeData.newValue;
            }
        });
        console.log(this.csvdata);
        this.distinctDocType = [];
        this.getDistinctDocType(this.csvdata);
    };
    ConfigViewerComponent.prototype.openNewClassification = function () {
        this.newClassificationOpen = true;
    };
    ConfigViewerComponent.prototype.closeNewKeywordpanel = function (event) {
        this.newKeywordActive = false;
        event.stopPropagation();
    };
    ConfigViewerComponent.prototype.onNewClassificationCreate = function (newClassificationData) {
        this.csvdata.push(newClassificationData);
        this.getDistinctDocType(this.csvdata);
    };
    ConfigViewerComponent.prototype.addNewKeyword = function (selectedDocTypes) {
        var newObj = {};
        if (selectedDocTypes[0].Keyword) {
            newObj = Object.assign({}, selectedDocTypes[0]);
            newObj.Keyword = this.newClassificationKeywordProperty.Keyword;
            newObj.Percentageofsimilarity = this.newClassificationKeywordProperty.Percentageofsimilarity;
            newObj.KeywordThresholdpercetage = this.newClassificationKeywordProperty.KeywordThresholdpercetage;
            newObj.ZoneArea = this.newClassificationKeywordProperty.ZoneArea;
            newObj.PagePosition = this.newClassificationKeywordProperty.PagePosition;
            selectedDocTypes.push(newObj);
        }
        else {
            selectedDocTypes[0].Keyword = this.newClassificationKeywordProperty.Keyword;
            selectedDocTypes[0].Percentageofsimilarity = this.newClassificationKeywordProperty.Percentageofsimilarity;
            selectedDocTypes[0].KeywordThresholdpercetage = this.newClassificationKeywordProperty.KeywordThresholdpercetage;
            selectedDocTypes[0].ZoneArea = this.newClassificationKeywordProperty.ZoneArea;
            selectedDocTypes[0].PagePosition = this.newClassificationKeywordProperty.PagePosition;
        }
        this.newClassificationKeywordProperty = {};
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ConfigViewerComponent.prototype, "searchKeyword", void 0);
    ConfigViewerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'config-viewer',
            templateUrl: 'config-viewer.component.html',
            styleUrls: ['config-viewer.component.css']
        }), 
        __metadata('design:paramtypes', [csv_service_1.CSVService, config_viewer_service_1.ConfigViewerService])
    ], ConfigViewerComponent);
    return ConfigViewerComponent;
}());
exports.ConfigViewerComponent = ConfigViewerComponent;
//# sourceMappingURL=config-viewer.component.js.map