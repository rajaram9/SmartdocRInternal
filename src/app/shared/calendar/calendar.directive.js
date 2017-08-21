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
var CalendarDirective = (function () {
    function CalendarDirective(el) {
        this.el = el;
        this.selectedDate = new core_1.EventEmitter();
    }
    CalendarDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(this.el.nativeElement).datepicker({
            format: 'MM/dd/yyyy',
            todayHighlight: true,
        }).on('changeDate', function (event) {
            _this.selectedDate.emit(event.date);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarDirective.prototype, "selectedDate", void 0);
    CalendarDirective = __decorate([
        core_1.Directive({
            selector: '[calendarInit]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CalendarDirective);
    return CalendarDirective;
}());
exports.CalendarDirective = CalendarDirective;
//# sourceMappingURL=calendar.directive.js.map