/// <reference path="../../../typings/globals/underscore/index.d.ts" />
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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var _ = require('underscore');
var app_config_service_1 = require('../../app.config.service');
var helper_service_1 = require('../helper-service/helper.service');
var BatchImageService = (function () {
    function BatchImageService(appConfigService, helperService, http) {
        this.appConfigService = appConfigService;
        this.helperService = helperService;
        this.http = http;
        this.apiUrl = this.appConfigService.getConfig('apiUrl');
    }
    BatchImageService.prototype.getBatchImages = function (batchName) {
        return this.http.get(this.appConfigService.getConfig('apiUrl') + "api/batchImages?BatchName=" + batchName)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    BatchImageService.prototype.formatBatchImage = function (batchImages, batchName) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var pages = _this.constructPages(batchImages, batchName);
            var groupedPages = _this.groupingPages(pages);
            var headeredPages = _this.constructHeaders(groupedPages);
            observer.next(headeredPages);
            observer.complete();
        });
    };
    BatchImageService.prototype.constructPages = function (batchImages, batchName) {
        return batchImages.map(function (image) {
            var imageNameArray = image.split('~');
            var groupName = imageNameArray[0] + "~" + imageNameArray[1];
            var groupDisplayName = "" + imageNameArray[0];
            var displayName = imageNameArray[0] + "-" + imageNameArray[2];
            return {
                originalName: image,
                updatedName: image,
                displayName: displayName,
                groupName: groupName,
                groupDisplayName: groupDisplayName,
                isNameUpdated: false,
                path: ("" + batchName) + "\\Images\\" + ("" + image)
            };
        });
    };
    BatchImageService.prototype.groupingPages = function (pages) {
        return _.groupBy(pages, function (page) { return page.groupName; });
    };
    BatchImageService.prototype.constructHeaders = function (groupedPages) {
        var headeredPages = [];
        for (var key in groupedPages) {
            if (groupedPages.hasOwnProperty(key)) {
                var isClassified = true;
                var pageGroup = groupedPages[key];
                var pageProperty = pageGroup[0];
                if (key.indexOf('unknown') !== -1) {
                    isClassified = false;
                }
                var headerObject = {
                    name: pageProperty.groupDisplayName,
                    nameWithIndex: pageProperty.groupName,
                    isClassified: isClassified,
                    isExpanded: true,
                    pages: pageGroup
                };
                headeredPages.push(headerObject);
            }
        }
        return headeredPages;
    };
    BatchImageService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    BatchImageService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    BatchImageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [app_config_service_1.AppConfigService, helper_service_1.HelperService, http_1.Http])
    ], BatchImageService);
    return BatchImageService;
}());
exports.BatchImageService = BatchImageService;
//# sourceMappingURL=batch-image.service.js.map