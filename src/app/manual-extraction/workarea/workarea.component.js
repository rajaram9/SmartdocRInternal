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
var ManualExtractionWorkareaComponent = (function () {
    function ManualExtractionWorkareaComponent() {
        this.docTypes = [];
        this.batchData = [];
        //@Input() searchKeyword: string;
        this.currentDocType = [];
        this.currentBatchData = [];
        this.currentdocTypeIndex = new Subject_1.Subject();
        this.currentdocTypeIndex$ = this.currentdocTypeIndex.asObservable();
        this.activeNavItem = 'doc';
        this.extractedFields = [];
        console.log(this.selectedDocType);
    }
    ManualExtractionWorkareaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentdocTypeIndex$.subscribe(function (index) {
            _this.currentDocType = _this.docTypes[index];
            _this.currentActiveDoc = _this.currentDocType.pages[0];
            var documenttypeName = _this.batchData[index].documenttypeName;
            //if(this.currentDocType==this.batchData[index].)
            if (documenttypeName.toUpperCase() == _this.currentDocType.name.toUpperCase()) {
                var jsonString = _this.batchData[index].jsonString;
                _this.currentBatchData = JSON.parse(jsonString);
            }
            //console.log(this.currentDocType);
        });
    };
    ManualExtractionWorkareaComponent.prototype.onNavItemChanged = function (selectedNav) {
        this.activeNavItem = selectedNav;
    };
    ManualExtractionWorkareaComponent.prototype.onDocSelected = function (selectedDoc) {
        this.currentActiveDoc = selectedDoc;
    };
    // life cycle hook
    ManualExtractionWorkareaComponent.prototype.ngOnChanges = function () {
        //console.log(this.selectedDocType);
        if (this.docTypes.length > 0 && this.batchData.length > 0) {
            this.currentdocTypeIndex.next(0);
        }
    };
    ManualExtractionWorkareaComponent.prototype.onsearch = function (keyword) {
        this.selectedDocType = keyword;
        //var searchTerm = "stevie";
        var index = -1;
        var docindex = -1;
        var k = 0;
        for (k = 0; k < this.batchData.length; k++) {
            if (this.batchData[k].batchpath.toUpperCase() === this.selectedDocType.toUpperCase()) {
                index = k;
                break;
            }
        }
        for (k = 0; k < this.docTypes.length; k++) {
            if (this.docTypes[k].nameWithIndex.toUpperCase() === this.selectedDocType.toUpperCase()) {
                docindex = k;
                break;
            }
        }
        this.currentDocType = this.docTypes[docindex];
        this.currentActiveDoc = this.currentDocType.pages[0];
        if (index != -1) {
            var documenttypeName = this.batchData[index].documenttypeName;
            //if(this.currentDocType==this.batchData[index].)
            if (documenttypeName.toUpperCase() == this.currentDocType.name.toUpperCase()) {
                var jsonString = this.batchData[index].jsonString;
                var jsonString1 = JSON.stringify(jsonString).replace(/[\n]/g, '')
                    .replace(/[\r]/g, '');
                this.currentBatchData = JSON.parse(jsonString);
            }
        }
        else {
            this.currentBatchData = [];
        }
        //let ind1= this.batchData.findIndex(this.selectedDocType);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ManualExtractionWorkareaComponent.prototype, "docTypes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ManualExtractionWorkareaComponent.prototype, "batchData", void 0);
    ManualExtractionWorkareaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'extraction-workarea',
            templateUrl: 'workarea.component.html',
            styleUrls: ['workarea.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ManualExtractionWorkareaComponent);
    return ManualExtractionWorkareaComponent;
}());
exports.ManualExtractionWorkareaComponent = ManualExtractionWorkareaComponent;
//# sourceMappingURL=workarea.component.js.map