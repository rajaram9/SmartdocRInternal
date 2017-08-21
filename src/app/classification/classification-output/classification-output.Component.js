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
var router_1 = require('@angular/router');
var ClassificationOutputComponent = (function () {
    function ClassificationOutputComponent(router) {
        this.router = router;
        this.files = [];
        this.uploadfilename = [];
    }
    ClassificationOutputComponent.prototype.ngOnInit = function () {
        // this.files = [
        //     {
        //         filepath: 'google.com',
        //         filename: 'Test document',
        //         createddate: new Date()
        //     },
        //     {
        //         filepath: 'google.com',
        //         filename: 'Test document1',
        //         createddate: new Date()
        //     }
        // ];
    };
    ClassificationOutputComponent.prototype.ngOnChanges = function () {
        console.log(this.files);
    };
    ClassificationOutputComponent.prototype.openOutputViewer = function (file) {
        this.router.navigate(['/classificationOutputViewer', { batchname: file.batchname }]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClassificationOutputComponent.prototype, "files", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClassificationOutputComponent.prototype, "uploadfilename", void 0);
    ClassificationOutputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'classificationoutput.',
            templateUrl: 'classification-output.html',
            styleUrls: ['classification-output.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ClassificationOutputComponent);
    return ClassificationOutputComponent;
}());
exports.ClassificationOutputComponent = ClassificationOutputComponent;
//# sourceMappingURL=classification-output.Component.js.map