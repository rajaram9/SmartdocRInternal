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
var Subject_1 = require('rxjs/Subject');
var Observable_1 = require('rxjs/Observable');
var HelperService = (function () {
    function HelperService() {
        this.helpPanel = new Subject_1.Subject();
        this.helpPanel$ = this.helpPanel.asObservable();
    }
    HelperService.prototype.getDistinctValueOfProperty = function (array, prop) {
        var distinctArray = [];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var obj = array_1[_i];
            var propValue = obj[prop];
            if (distinctArray.indexOf(propValue) === -1) {
                distinctArray.push(propValue);
            }
        }
        return distinctArray;
    };
    HelperService.prototype.getFileExtension = function (filename) {
        return filename.substr(filename.lastIndexOf('.') + 1);
    };
    HelperService.prototype.openHelpPanel = function () {
        this.helpPanel.next();
    };
    HelperService.prototype.extractdata = function (res) {
        if (res.status === 200) {
            var body = res.json();
            return body || {};
        }
        return null;
    };
    HelperService.prototype.errorhandler = function (error) {
        return Observable_1.Observable.throw('');
    };
    HelperService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HelperService);
    return HelperService;
}());
exports.HelperService = HelperService;
//# sourceMappingURL=helper.service.js.map