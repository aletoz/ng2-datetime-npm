/**
 * @license ngx-datetime
 * MIT license
 */

import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Component, HostBinding, HostListener, Input, NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NKDatetime; }),
    multi: true
};
var NKDatetime = (function () {
    function NKDatetime() {
        this.timepickerOptions = {};
        this.datepickerOptions = {};
        this.idDatePicker = uniqueId('q-datepicker_');
        this.idTimePicker = uniqueId('q-timepicker_');
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
    }
    Object.defineProperty(NKDatetime.prototype, "tabindexAttr", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabindex === undefined ? '-1' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NKDatetime.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.init();
        });
    };
    /**
     * @return {?}
     */
    NKDatetime.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.datepicker) {
            this.datepicker.datepicker('destroy');
        }
        if (this.timepicker) {
            this.timepicker.timepicker('remove');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NKDatetime.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes) {
            if (changes['datepickerOptions'] && this.datepicker) {
                this.datepicker.datepicker('destroy');
                if (changes['datepickerOptions'].currentValue) {
                    this.datepicker = null;
                    this.init();
                }
                else if (changes['datepickerOptions'].currentValue === false) {
                    this.datepicker.remove();
                }
            }
            if (changes['timepickerOptions'] && this.timepicker) {
                this.timepicker.timepicker('remove');
                if (changes['timepickerOptions'].currentValue) {
                    this.timepicker = null;
                    this.init();
                }
                else if (changes['timepickerOptions'].currentValue === false) {
                    this.timepicker.parent().remove();
                }
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NKDatetime.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.date !== value) {
            this.date = value;
            if (isDate(this.date)) {
                this.updateModel(this.date);
            }
            else {
                this.clearModels();
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NKDatetime.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NKDatetime.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NKDatetime.prototype.checkEmptyValue = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ value = e.target.value;
        if (value === '' && (this.timepickerOptions === false ||
            this.datepickerOptions === false ||
            (this.timeModel === '' && this.dateModel === ''))) {
            this.onChange(undefined);
        }
    };
    /**
     * @param {?=} updateModel
     * @return {?}
     */
    NKDatetime.prototype.clearModels = /**
     * @param {?=} updateModel
     * @return {?}
     */
    function (updateModel) {
        if (updateModel) {
            this.onChange(undefined);
        }
        if (this.timepicker) {
            this.timepicker.timepicker('setTime', null);
        }
        this.updateDatepicker(null);
    };
    /**
     * @return {?}
     */
    NKDatetime.prototype.showTimepicker = /**
     * @return {?}
     */
    function () {
        this.timepicker.timepicker('showWidget');
    };
    /**
     * @return {?}
     */
    NKDatetime.prototype.showDatepicker = /**
     * @return {?}
     */
    function () {
        this.datepicker.datepicker('show');
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NKDatetime.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.readonly = isDisabled;
    };
    /**
     * @return {?}
     */
    NKDatetime.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.datepicker && this.datepickerOptions !== false) {
            var /** @type {?} */ options = jQuery.extend({ enableOnReadonly: this.readonly }, this.datepickerOptions);
            this.datepicker = (/** @type {?} */ ($('#' + this.idDatePicker))).datepicker(options);
            this.datepicker
                .on('changeDate', function (e) {
                var /** @type {?} */ newDate = e.date;
                if (isDate(_this.date) && isDate(newDate)) {
                    // get hours/minutes
                    newDate.setHours(_this.date.getHours());
                    newDate.setMinutes(_this.date.getMinutes());
                    newDate.setSeconds(_this.date.getSeconds());
                }
                _this.date = newDate;
                _this.onChange(newDate);
            });
        }
        else if (this.datepickerOptions === false) {
            (/** @type {?} */ ($('#' + this.idDatePicker))).remove();
        }
        if (!this.timepicker && this.timepickerOptions !== false) {
            var /** @type {?} */ options = jQuery.extend({ defaultTime: false }, this.timepickerOptions);
            this.timepicker = (/** @type {?} */ ($('#' + this.idTimePicker))).timepicker(options);
            this.timepicker
                .on('changeTime.timepicker', function (e) {
                var _a = e.time, meridian = _a.meridian, hours = _a.hours;
                if (meridian) {
                    // has meridian -> convert 12 to 24h
                    if (meridian === 'PM' && hours < 12) {
                        hours = hours + 12;
                    }
                    if (meridian === 'AM' && hours === 12) {
                        hours = hours - 12;
                    }
                    hours = parseInt(_this.pad(hours), 10);
                }
                if (!isDate(_this.date)) {
                    _this.date = new Date();
                    _this.updateDatepicker(_this.date);
                }
                _this.date.setHours(hours);
                _this.date.setMinutes(e.time.minutes);
                _this.date.setSeconds(e.time.seconds);
                _this.onChange(_this.date);
            });
        }
        else if (this.timepickerOptions === false) {
            (/** @type {?} */ ($('#' + this.idTimePicker))).parent().remove();
        }
        if (isDate(this.date)) {
            this.updateModel(this.date);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NKDatetime.prototype.updateModel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.updateDatepicker(date);
        // update timepicker
        if (this.timepicker !== undefined && isDate(date)) {
            var /** @type {?} */ hours = date.getHours();
            if (this.timepickerOptions.showMeridian) {
                // Convert 24 to 12 hour system
                hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
            }
            var /** @type {?} */ meridian = date.getHours() >= 12 ? ' PM' : ' AM';
            var /** @type {?} */ time = this.pad(hours) + ':' +
                this.pad(this.date.getMinutes()) + ':' +
                this.pad(this.date.getSeconds()) +
                (this.timepickerOptions.showMeridian || this.timepickerOptions.showMeridian === undefined
                    ? meridian : '');
            this.timepicker.timepicker('setTime', time);
            this.timeModel = time; // fix initial empty timeModel bug
        }
    };
    /**
     * @param {?=} date
     * @return {?}
     */
    NKDatetime.prototype.updateDatepicker = /**
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        if (this.datepicker !== undefined) {
            this.datepicker.datepicker('update', date);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NKDatetime.prototype.pad = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value.toString().length < 2 ? '0' + value : value.toString();
    };
    NKDatetime.decorators = [
        { type: Component, args: [{
                    selector: 'datetime',
                    providers: [CUSTOM_ACCESSOR],
                    template: "\n        <div class=\"ng2-datetime\">\n            <div [ngClass]=\"{ 'input-group': !datepickerOptions.hideIcon, 'date': true }\"\n                 [hidden]=\"!datepickerOptions\">\n                <input id=\"{{idDatePicker}}\" type=\"text\" class=\"form-control\" autocomplete=\"off\"\n                       [attr.readonly]=\"readonly || null\"\n                       [attr.required]=\"required || null\"\n                       [attr.placeholder]=\"datepickerOptions.placeholder || 'Choose date'\"\n                       [attr.tabindex]=\"tabindex\"\n                       [(ngModel)]=\"dateModel\"\n                       (blur)=\"onTouched()\"\n                       (keyup)=\"checkEmptyValue($event)\"/>\n                <div [hidden]=\"datepickerOptions.hideIcon || datepickerOptions === false\"\n                     (click)=\"showDatepicker()\"\n                     class=\"input-group-addon\">\n                    <span [ngClass]=\"datepickerOptions.icon || 'glyphicon glyphicon-th'\"></span>\n                </div>\n            </div>\n            <div [ngClass]=\"{ 'input-group': !timepickerOptions.hideIcon, 'bootstrap-timepicker timepicker': true }\"\n                 [hidden]=\"!timepickerOptions\">\n                <input id=\"{{idTimePicker}}\" type=\"text\" class=\"form-control input-small\" autocomplete=\"off\"\n                       [attr.readonly]=\"readonly || null\"\n                       [attr.required]=\"required || null\"\n                       [attr.placeholder]=\"timepickerOptions.placeholder || 'Set time'\"\n                       [attr.tabindex]=\"tabindex\"\n                       [(ngModel)]=\"timeModel\"\n                       (focus)=\"showTimepicker()\"\n                       (blur)=\"onTouched()\"\n                       (keyup)=\"checkEmptyValue($event)\">\n                <span [hidden]=\"timepickerOptions.hideIcon || false\" class=\"input-group-addon\">\n                    <i [ngClass]=\"timepickerOptions.icon || 'glyphicon glyphicon-time'\"></i>\n                </span>\n            </div>\n            <button *ngIf=\"hasClearButton\" type=\"button\" (click)=\"clearModels(true)\">Clear</button>\n        </div>\n    ",
                    styles: [
                        '.ng2-datetime *[hidden] { display: none; }'
                    ]
                },] },
    ];
    /** @nocollapse */
    NKDatetime.ctorParameters = function () { return []; };
    NKDatetime.propDecorators = {
        "timepickerOptions": [{ type: Input, args: ['timepicker',] },],
        "datepickerOptions": [{ type: Input, args: ['datepicker',] },],
        "hasClearButton": [{ type: Input, args: ['hasClearButton',] },],
        "readonly": [{ type: Input },],
        "required": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "onTouched": [{ type: HostListener, args: ['blur',] },],
        "tabindexAttr": [{ type: HostBinding, args: ['attr.tabindex',] },],
    };
    return NKDatetime;
}());
var id = 0;
/**
 * @param {?} prefix
 * @return {?}
 */
function uniqueId(prefix) {
    return prefix + ++id;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NKDatetimeModule = (function () {
    function NKDatetimeModule() {
    }
    /**
     * Use in AppModule: new instance of SumService.
     * @return {?}
     */
    NKDatetimeModule.forRoot = /**
     * Use in AppModule: new instance of SumService.
     * @return {?}
     */
    function () {
        return {
            ngModule: NKDatetimeModule,
            providers: []
        };
    };
    /**
     * Use in features modules with lazy loading: new instance of SumService.
     * @return {?}
     */
    NKDatetimeModule.forChild = /**
     * Use in features modules with lazy loading: new instance of SumService.
     * @return {?}
     */
    function () {
        return {
            ngModule: NKDatetimeModule,
            providers: []
        };
    };
    NKDatetimeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        NKDatetime
                    ],
                    exports: [
                        NKDatetime
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NKDatetimeModule.ctorParameters = function () { return []; };
    return NKDatetimeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Angular library starter
 * Build an Angular library compatible with AoT compilation & Tree shaking
 * Copyright Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/ngx-datetime
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NKDatetime, NKDatetimeModule };
//# sourceMappingURL=ngx-datetime.js.map
