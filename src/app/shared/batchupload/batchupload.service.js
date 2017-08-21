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
var batchuploadService = (function () {
    function batchuploadService(http) {
        this.http = http;
    }
    batchuploadService.prototype.uploadFile = function (file) {
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData();
            var formData = new FormData();
            formData.append(file.name, file);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://192.168.101.25:8057/api/upload', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next('Upload done');
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.send(formData);
        });
    };
    batchuploadService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    batchuploadService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    batchuploadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], batchuploadService);
    return batchuploadService;
}());
exports.batchuploadService = batchuploadService;
//# sourceMappingURL=batchupload.service.js.map