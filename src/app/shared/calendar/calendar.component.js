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
var CalendarComponent = (function () {
    function CalendarComponent() {
        this.fromDate = new Date();
        this.toDate = new Date();
        this.active = false;
        this.dateSelected = new core_1.EventEmitter();
    }
    CalendarComponent.prototype.ngOnInit = function () { };
    CalendarComponent.prototype.onFromDateChange = function (date) {
        this.fromDate = date;
    };
    CalendarComponent.prototype.onToDateChange = function (date) {
        this.toDate = date;
    };
    CalendarComponent.prototype.onDateSelected = function () {
        var dateInfo = {};
        dateInfo.fromDate = this.fromDate;
        dateInfo.toDate = this.toDate;
        this.dateSelected.emit(dateInfo);
        this.active = false;
    };
    CalendarComponent.prototype.close = function () {
        this.active = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "dateSelected", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'calendar',
            templateUrl: 'calendar.component.html',
            styleUrls: ['calendar.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map