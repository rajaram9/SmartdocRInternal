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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
var ClassificationOutputService = (function () {
    function ClassificationOutputService(http) {
        this.http = http;
        this.options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        this.batches = [];
    }
    ClassificationOutputService.prototype.getBatches = function () {
        if (this.batches.length > 0) {
            return Observable_1.Observable.from(this.batches);
        }
        else {
            return this.http.get('http://52.173.95.64:8081/api/getBatches')
                .map(this.extractdata)
                .catch(this.errorhandler);
        }
    };
    ClassificationOutputService.prototype.getData = function () {
        var params = new http_1.URLSearchParams();
        params.set('name', 'name');
        params.set('foldername', 'name');
        this.options.search = params;
        return this.http.get('http://52.173.95.64:8081/api/Getfiles', this.options)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ClassificationOutputService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    ClassificationOutputService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    ClassificationOutputService.prototype.getoutData = function (filename, foldername) {
        var params = new http_1.URLSearchParams();
        params.set('name', filename);
        params.set('foldername', foldername);
        this.options.search = params;
        return this.http.get('http://52.173.95.64:8081/api/Getfiles', this.options)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ClassificationOutputService.prototype.getImages = function (filename, foldername) {
        var params = new http_1.URLSearchParams();
        params.set('name', filename);
        params.set('foldername', foldername);
        this.options.search = params;
        return this.http.get('http://52.173.95.64:8081/api/GetImages', this.options)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ClassificationOutputService.prototype.downloadFiles = function (FileCollection) {
        var requests = [];
        $.each(FileCollection, function (index, fileDetails) {
            var req = $.ajax({
                url: 'http://52.173.95.64:8083/' + fileDetails.filepath,
                method: 'GET',
                mimeType: 'text/plain; charset=x-user-defined'
            });
            requests.push(req);
        });
        var defer = $.when.apply($, requests);
        return defer;
    };
    ClassificationOutputService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClassificationOutputService);
    return ClassificationOutputService;
}());
exports.ClassificationOutputService = ClassificationOutputService;
//# sourceMappingURL=classification-upload-batch.service.js.map