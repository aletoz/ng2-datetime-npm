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
const CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NKDatetime),
    multi: true
};
class NKDatetime {
    constructor() {
        this.timepickerOptions = {};
        this.datepickerOptions = {};
        this.idDatePicker = uniqueId('q-datepicker_');
        this.idTimePicker = uniqueId('q-timepicker_');
        this.onChange = (_) => {
        };
        this.onTouched = () => {
        };
    }
    /**
     * @return {?}
     */
    get tabindexAttr() {
        return this.tabindex === undefined ? '-1' : undefined;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this.init();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.datepicker) {
            this.datepicker.datepicker('destroy');
        }
        if (this.timepicker) {
            this.timepicker.timepicker('remove');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.date !== value) {
            this.date = value;
            if (isDate(this.date)) {
                this.updateModel(this.date);
            }
            else {
                this.clearModels();
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    checkEmptyValue(e) {
        const /** @type {?} */ value = e.target.value;
        if (value === '' && (this.timepickerOptions === false ||
            this.datepickerOptions === false ||
            (this.timeModel === '' && this.dateModel === ''))) {
            this.onChange(undefined);
        }
    }
    /**
     * @param {?=} updateModel
     * @return {?}
     */
    clearModels(updateModel) {
        if (updateModel) {
            this.onChange(undefined);
        }
        if (this.timepicker) {
            this.timepicker.timepicker('setTime', null);
        }
        this.updateDatepicker(null);
    }
    /**
     * @return {?}
     */
    showTimepicker() {
        this.timepicker.timepicker('showWidget');
    }
    /**
     * @return {?}
     */
    showDatepicker() {
        this.datepicker.datepicker('show');
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.readonly = isDisabled;
    }
    /**
     * @return {?}
     */
    init() {
        if (!this.datepicker && this.datepickerOptions !== false) {
            let /** @type {?} */ options = jQuery.extend({ enableOnReadonly: this.readonly }, this.datepickerOptions);
            this.datepicker = (/** @type {?} */ ($('#' + this.idDatePicker))).datepicker(options);
            this.datepicker
                .on('changeDate', (e) => {
                let /** @type {?} */ newDate = e.date;
                if (isDate(this.date) && isDate(newDate)) {
                    // get hours/minutes
                    newDate.setHours(this.date.getHours());
                    newDate.setMinutes(this.date.getMinutes());
                    newDate.setSeconds(this.date.getSeconds());
                }
                this.date = newDate;
                this.onChange(newDate);
            });
        }
        else if (this.datepickerOptions === false) {
            (/** @type {?} */ ($('#' + this.idDatePicker))).remove();
        }
        if (!this.timepicker && this.timepickerOptions !== false) {
            let /** @type {?} */ options = jQuery.extend({ defaultTime: false }, this.timepickerOptions);
            this.timepicker = (/** @type {?} */ ($('#' + this.idTimePicker))).timepicker(options);
            this.timepicker
                .on('changeTime.timepicker', (e) => {
                let { meridian, hours } = e.time;
                if (meridian) {
                    // has meridian -> convert 12 to 24h
                    if (meridian === 'PM' && hours < 12) {
                        hours = hours + 12;
                    }
                    if (meridian === 'AM' && hours === 12) {
                        hours = hours - 12;
                    }
                    hours = parseInt(this.pad(hours), 10);
                }
                if (!isDate(this.date)) {
                    this.date = new Date();
                    this.updateDatepicker(this.date);
                }
                this.date.setHours(hours);
                this.date.setMinutes(e.time.minutes);
                this.date.setSeconds(e.time.seconds);
                this.onChange(this.date);
            });
        }
        else if (this.timepickerOptions === false) {
            (/** @type {?} */ ($('#' + this.idTimePicker))).parent().remove();
        }
        if (isDate(this.date)) {
            this.updateModel(this.date);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    updateModel(date) {
        this.updateDatepicker(date);
        // update timepicker
        if (this.timepicker !== undefined && isDate(date)) {
            let /** @type {?} */ hours = date.getHours();
            if (this.timepickerOptions.showMeridian) {
                // Convert 24 to 12 hour system
                hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
            }
            const /** @type {?} */ meridian = date.getHours() >= 12 ? ' PM' : ' AM';
            const /** @type {?} */ time = this.pad(hours) + ':' +
                this.pad(this.date.getMinutes()) + ':' +
                this.pad(this.date.getSeconds()) +
                (this.timepickerOptions.showMeridian || this.timepickerOptions.showMeridian === undefined
                    ? meridian : '');
            this.timepicker.timepicker('setTime', time);
            this.timeModel = time; // fix initial empty timeModel bug
        }
    }
    /**
     * @param {?=} date
     * @return {?}
     */
    updateDatepicker(date) {
        if (this.datepicker !== undefined) {
            this.datepicker.datepicker('update', date);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    pad(value) {
        return value.toString().length < 2 ? '0' + value : value.toString();
    }
}
NKDatetime.decorators = [
    { type: Component, args: [{
                selector: 'datetime',
                providers: [CUSTOM_ACCESSOR],
                template: `
        <div class="ng2-datetime">
            <div [ngClass]="{ 'input-group': !datepickerOptions.hideIcon, 'date': true }"
                 [hidden]="!datepickerOptions">
                <input id="{{idDatePicker}}" type="text" class="form-control" autocomplete="off"
                       [attr.readonly]="readonly || null"
                       [attr.required]="required || null"
                       [attr.placeholder]="datepickerOptions.placeholder || 'Choose date'"
                       [attr.tabindex]="tabindex"
                       [(ngModel)]="dateModel"
                       (blur)="onTouched()"
                       (keyup)="checkEmptyValue($event)"/>
                <div [hidden]="datepickerOptions.hideIcon || datepickerOptions === false"
                     (click)="showDatepicker()"
                     class="input-group-addon">
                    <span [ngClass]="datepickerOptions.icon || 'glyphicon glyphicon-th'"></span>
                </div>
            </div>
            <div [ngClass]="{ 'input-group': !timepickerOptions.hideIcon, 'bootstrap-timepicker timepicker': true }"
                 [hidden]="!timepickerOptions">
                <input id="{{idTimePicker}}" type="text" class="form-control input-small" autocomplete="off"
                       [attr.readonly]="readonly || null"
                       [attr.required]="required || null"
                       [attr.placeholder]="timepickerOptions.placeholder || 'Set time'"
                       [attr.tabindex]="tabindex"
                       [(ngModel)]="timeModel"
                       (focus)="showTimepicker()"
                       (blur)="onTouched()"
                       (keyup)="checkEmptyValue($event)">
                <span [hidden]="timepickerOptions.hideIcon || false" class="input-group-addon">
                    <i [ngClass]="timepickerOptions.icon || 'glyphicon glyphicon-time'"></i>
                </span>
            </div>
            <button *ngIf="hasClearButton" type="button" (click)="clearModels(true)">Clear</button>
        </div>
    `,
                styles: [
                    '.ng2-datetime *[hidden] { display: none; }'
                ]
            },] },
];
/** @nocollapse */
NKDatetime.ctorParameters = () => [];
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
let id = 0;
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
class NKDatetimeModule {
    /**
     * Use in AppModule: new instance of SumService.
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NKDatetimeModule,
            providers: []
        };
    }
    /**
     * Use in features modules with lazy loading: new instance of SumService.
     * @return {?}
     */
    static forChild() {
        return {
            ngModule: NKDatetimeModule,
            providers: []
        };
    }
}
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
NKDatetimeModule.ctorParameters = () => [];

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
