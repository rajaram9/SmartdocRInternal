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
var classification_config_mock_1 = require('../../mock-datas/classification-config.mock');
var UploadtemplateComponent = (function () {
    function UploadtemplateComponent(csvService) {
        this.csvService = csvService;
    }
    UploadtemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        var dataRow = classification_config_mock_1.jsondata.split('\n');
        var formatedData = this.formatCSVData(dataRow);
        setTimeout(function () {
            _this.csvService.AddCSVData(formatedData);
        }, 1000);
    };
    UploadtemplateComponent.prototype.onChange = function (event) {
        var _this = this;
        var file = event.srcElement.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var dataRow = e.target.result.split('\n');
            var formatedData = _this.formatCSVData(dataRow);
            _this.csvService.AddCSVData(formatedData);
        };
        reader.readAsText(file);
    };
    UploadtemplateComponent.prototype.BtClick = function (event) {
    };
    UploadtemplateComponent.prototype.formatCSVData = function (csvData) {
        var fieldDatas = [];
        for (var i = 1; i < csvData.length; i++) {
            var fieldData = {};
            var fields = csvData[i].split(',');
            fieldData.DocTypeName = fields[0];
            fieldData.MinPages = fields[1];
            fieldData.MaxPages = fields[2];
            fieldData.HavingPageNumbers = fields[3];
            fieldData.PageNumberFormat = fields[4];
            fieldData.AddIfPrevTypeisSame = fields[5];
            fieldData.Priority = fields[6];
            fieldData.Keyword = fields[7];
            fieldData.PagePosition = fields[8];
            fieldData.Percentageofsimilarity = fields[9];
            fieldData.KeywordThresholdpercetage = fields[10];
            fieldData.ZoneArea = fields[11];
            fieldData.Casesensitive = fields[12];
            fieldDatas.push(fieldData);
        }
        return fieldDatas;
    };
    UploadtemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'uploadtemplate',
            templateUrl: 'uploadtemplate.component.html',
            styleUrls: ['uploadtemplate.component.css']
        }), 
        __metadata('design:paramtypes', [csv_service_1.CSVService])
    ], UploadtemplateComponent);
    return UploadtemplateComponent;
}());
exports.UploadtemplateComponent = UploadtemplateComponent;
//# sourceMappingURL=uploadtemplate.component.js.map