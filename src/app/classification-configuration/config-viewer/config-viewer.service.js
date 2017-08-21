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
var ConfigViewerService = (function () {
    function ConfigViewerService(http) {
        this.http = http;
    }
    ConfigViewerService.prototype.saveData = function (data) {
        var body = JSON.stringify(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://192.168.101.25:8057/api/SaveData', body, options)
            .map(this.extractdata)
            .catch(this.errorhandler);
    };
    ConfigViewerService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    ConfigViewerService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    ConfigViewerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConfigViewerService);
    return ConfigViewerService;
}());
exports.ConfigViewerService = ConfigViewerService;
//# sourceMappingURL=config-viewer.service.js.map