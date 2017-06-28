webpackJsonp([1],{

/***/ "../../ng2-admin/src/framework/theme/components/actions/actions.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  :host /deep/ nga-action {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    :host /deep/ nga-action:first-child {\n      border-left: none !important; }\n    :host /deep/ nga-action i.control-icon:hover {\n      cursor: pointer; }\n    :host /deep/ nga-action.disabled {\n      opacity: 0.5;\n      cursor: not-allowed; }\n      :host /deep/ nga-action.disabled a, :host /deep/ nga-action.disabled i {\n        cursor: not-allowed !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/actions/actions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaActionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaActionsComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Action item, display a link with an icon, or any other content provided instead.
 */
var NgaActionComponent = (function () {
    function NgaActionComponent() {
        this.disabledValue = false;
    }
    Object.defineProperty(NgaActionComponent.prototype, "disabled", {
        /**
         * Disables the item (changes item opacity and mouse cursor)
         * @type boolean
         */
        set: function (val) {
            this.disabledValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    return NgaActionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.disabled'),
    __metadata("design:type", Boolean)
], NgaActionComponent.prototype, "disabledValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaActionComponent.prototype, "icon", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaActionComponent.prototype, "disabled", null);
NgaActionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-action',
        template: "\n    <a href=\"#\" *ngIf=\"icon; else showContent\" (click)=\"$event.preventDefault()\">\n      <i class=\"control-icon {{ icon }}\"></i>\n    </a>\n    <ng-template #showContent>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
    })
], NgaActionComponent);

/**
 * Shows a a horizontal list of actions, available in multiple sizes
 * Aligns items vertically.
 *
 * @theme
 * $nga-actions-size-small: 1.5rem !default;
 * $nga-actions-size-medium: 2.5rem !default;
 * $nga-actions-size-large: 4rem !default;
 * $nga-actions-color: $nga-color-inverse !default;
 * $nga-actions-background: transparent !default;
 * $nga-actions-color-inverse: $nga-color-default !default;
 * $nga-actions-background-inverse: $nga-background-inverse !default;
 */
var NgaActionsComponent = NgaActionsComponent_1 = (function () {
    function NgaActionsComponent() {
    }
    Object.defineProperty(NgaActionsComponent.prototype, "small", {
        get: function () {
            return this.sizeValue === NgaActionsComponent_1.SIZE_SMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaActionsComponent.prototype, "medium", {
        get: function () {
            return this.sizeValue === NgaActionsComponent_1.SIZE_MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaActionsComponent.prototype, "large", {
        get: function () {
            return this.sizeValue === NgaActionsComponent_1.SIZE_LARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaActionsComponent.prototype, "size", {
        /**
         * Size of the component, small|medium|large
         * @type string
         */
        set: function (val) {
            this.sizeValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaActionsComponent.prototype, "inverse", {
        /**
         * Makes colors inverse based on current theme
         * @type boolean
         */
        set: function (val) {
            this.inverseValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    return NgaActionsComponent;
}());
NgaActionsComponent.SIZE_SMALL = 'small';
NgaActionsComponent.SIZE_MEDIUM = 'medium';
NgaActionsComponent.SIZE_LARGE = 'large';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.inverse'),
    __metadata("design:type", Boolean)
], NgaActionsComponent.prototype, "inverseValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.small'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaActionsComponent.prototype, "small", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.medium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaActionsComponent.prototype, "medium", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.large'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaActionsComponent.prototype, "large", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NgaActionsComponent.prototype, "size", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaActionsComponent.prototype, "inverse", null);
NgaActionsComponent = NgaActionsComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-actions',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/actions/actions.component.scss")],
        template: "\n    <ng-content select=\"nga-action\"></ng-content>\n  ",
    })
], NgaActionsComponent);

var NgaActionsComponent_1;
//# sourceMappingURL=actions.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/actions/actions.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/actions/actions.component.ts");
/* unused harmony export NgaActionsModule */
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NGA_ACTIONS_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__actions_component__["a" /* NgaActionComponent */],
    __WEBPACK_IMPORTED_MODULE_2__actions_component__["b" /* NgaActionsComponent */],
];
var NgaActionsModule = (function () {
    function NgaActionsModule() {
    }
    return NgaActionsModule;
}());
NgaActionsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: NGA_ACTIONS_COMPONENTS.slice(),
        exports: NGA_ACTIONS_COMPONENTS.slice(),
    })
], NgaActionsModule);

//# sourceMappingURL=actions.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/card/card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  overflow: hidden; }\n  :host nga-card-body {\n    overflow: auto;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/card/card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NgaCardHeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaCardBodyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NgaCardFooterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaCardComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Component intended to be used within  the `<nga-card>` component.
 * It adds styles for a preset header section.
 */
var NgaCardHeaderComponent = (function () {
    function NgaCardHeaderComponent() {
    }
    return NgaCardHeaderComponent;
}());
NgaCardHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-card-header',
        template: "<ng-content></ng-content>",
    })
], NgaCardHeaderComponent);

/**
 * Component intended to be used within  the `<nga-card>` component.
 * It adds styles for a preset body section.
 */
var NgaCardBodyComponent = (function () {
    function NgaCardBodyComponent() {
    }
    return NgaCardBodyComponent;
}());
NgaCardBodyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-card-body',
        template: "<ng-content></ng-content>",
    })
], NgaCardBodyComponent);

/**
 * Component intended to be used within  the `<nga-card>` component.
 * It adds styles for a preset footer section.
 */
var NgaCardFooterComponent = (function () {
    function NgaCardFooterComponent() {
    }
    return NgaCardFooterComponent;
}());
NgaCardFooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-card-footer',
        template: "<ng-content></ng-content>",
    })
], NgaCardFooterComponent);

/**
 * A basic content container component
 *
 * While this component can be used alone, it also provides a number
 * of child components for common card sections, including:
 * - nga-card-header
 * - nga-card-body
 * - nga-card-footer
 */
var NgaCardComponent = NgaCardComponent_1 = (function () {
    function NgaCardComponent() {
    }
    Object.defineProperty(NgaCardComponent.prototype, "small", {
        get: function () {
            return this.size === NgaCardComponent_1.SIZE_SMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "xsmall", {
        get: function () {
            return this.size === NgaCardComponent_1.SIZE_XSMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "medium", {
        get: function () {
            return this.size === NgaCardComponent_1.SIZE_MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "xmedium", {
        get: function () {
            return this.size === NgaCardComponent_1.SIZE_XMEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "large", {
        get: function () {
            return this.size === NgaCardComponent_1.SIZE_LARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "active", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_ACTIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "disabled", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_DISABLED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "primary", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_PRIMARY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "info", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_INFO;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "success", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_SUCCESS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "warning", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_WARNING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "danger", {
        get: function () {
            return this.status === NgaCardComponent_1.STATUS_DANGER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "setSize", {
        set: function (val) {
            this.size = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaCardComponent.prototype, "setStatus", {
        set: function (val) {
            this.status = val;
        },
        enumerable: true,
        configurable: true
    });
    return NgaCardComponent;
}());
NgaCardComponent.SIZE_SMALL = 'small';
NgaCardComponent.SIZE_XSMALL = 'xsmall';
NgaCardComponent.SIZE_MEDIUM = 'medium';
NgaCardComponent.SIZE_XMEDIUM = 'xmedium';
NgaCardComponent.SIZE_LARGE = 'large';
NgaCardComponent.STATUS_ACTIVE = 'active';
NgaCardComponent.STATUS_DISABLED = 'disabled';
NgaCardComponent.STATUS_PRIMARY = 'primary';
NgaCardComponent.STATUS_INFO = 'info';
NgaCardComponent.STATUS_SUCCESS = 'success';
NgaCardComponent.STATUS_WARNING = 'warning';
NgaCardComponent.STATUS_DANGER = 'danger';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.small-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "small", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.xsmall-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "xsmall", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.medium-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "medium", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.xmedium-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "xmedium", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.large-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "large", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.active-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "active", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.disabled-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "disabled", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.primary-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "primary", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.info-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "info", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.success-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "success", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.warning-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "warning", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.danger-card'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaCardComponent.prototype, "danger", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])('size'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NgaCardComponent.prototype, "setSize", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])('status'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NgaCardComponent.prototype, "setStatus", null);
NgaCardComponent = NgaCardComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-card',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/card/card.component.scss")],
        template: "\n    <ng-content></ng-content>\n    <ng-content select=\"nga-card-header\"></ng-content>\n    <ng-content select=\"nga-card-body\"></ng-content>\n    <ng-content select=\"nga-card-footer\"></ng-content>\n  ",
    })
], NgaCardComponent);

var NgaCardComponent_1;
//# sourceMappingURL=card.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/card/card.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/card/card.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaCardModule; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NGA_CARD_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__card_component__["a" /* NgaCardComponent */],
    __WEBPACK_IMPORTED_MODULE_2__card_component__["b" /* NgaCardBodyComponent */],
    __WEBPACK_IMPORTED_MODULE_2__card_component__["c" /* NgaCardFooterComponent */],
    __WEBPACK_IMPORTED_MODULE_2__card_component__["d" /* NgaCardHeaderComponent */],
];
var NgaCardModule = (function () {
    function NgaCardModule() {
    }
    return NgaCardModule;
}());
NgaCardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: NGA_CARD_COMPONENTS.slice(),
        exports: NGA_CARD_COMPONENTS.slice(),
    })
], NgaCardModule);

//# sourceMappingURL=card.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/helpers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = convertToBoolProperty;
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */ function convertToBoolProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === '');
    }
    return !!val;
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/layout/layout.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host .layout {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n:host /deep/ nga-layout-header {\n  display: block; }\n  :host /deep/ nga-layout-header nav {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  :host /deep/ nga-layout-header.fixed {\n    position: fixed;\n    left: 0;\n    right: 0;\n    z-index: 100; }\n\n:host .layout-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row; }\n  :host .layout-container /deep/ nga-sidebar {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n    :host .layout-container /deep/ nga-sidebar.right {\n      -webkit-box-ordinal-group: 3;\n          -ms-flex-order: 2;\n              order: 2; }\n    :host .layout-container /deep/ nga-sidebar .fixed {\n      position: fixed;\n      width: 100%;\n      overflow-y: auto;\n      height: 100%; }\n  :host .layout-container .content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    :host .layout-container .content.center {\n      max-width: 100%;\n      position: relative;\n      margin-left: auto;\n      margin-right: auto; }\n    :host .layout-container .content .columns {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1; }\n      :host .layout-container .content .columns /deep/ nga-layout-column {\n        -webkit-box-ordinal-group: 3;\n            -ms-flex-order: 2;\n                order: 2;\n        -webkit-box-flex: 1;\n            -ms-flex: 1 0;\n                flex: 1 0; }\n        :host .layout-container .content .columns /deep/ nga-layout-column.left {\n          -webkit-box-ordinal-group: 2;\n              -ms-flex-order: 1;\n                  order: 1; }\n    :host .layout-container .content /deep/ nga-layout-footer {\n      display: block;\n      margin-top: auto; }\n      :host .layout-container .content /deep/ nga-layout-footer nav {\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_theme_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/theme.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/spinner.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaLayoutColumnComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NgaLayoutHeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NgaLayoutFooterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaLayoutComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Component intended to be used within  the `<nga-layout>` component.
 * It adds styles for a preset column section.
 */
var NgaLayoutColumnComponent = (function () {
    function NgaLayoutColumnComponent() {
    }
    Object.defineProperty(NgaLayoutColumnComponent.prototype, "left", {
        set: function (val) {
            this.leftValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    return NgaLayoutColumnComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.left'),
    __metadata("design:type", Boolean)
], NgaLayoutColumnComponent.prototype, "leftValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaLayoutColumnComponent.prototype, "left", null);
NgaLayoutColumnComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-layout-column',
        template: "\n    <ng-content></ng-content>\n  ",
    })
], NgaLayoutColumnComponent);

/**
 * Component intended to be used within  the `<nga-layout>` component.
 * It adds styles for a preset header section.
 */
var NgaLayoutHeaderComponent = (function () {
    function NgaLayoutHeaderComponent() {
    }
    Object.defineProperty(NgaLayoutHeaderComponent.prototype, "fixed", {
        set: function (val) {
            this.fixedValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    return NgaLayoutHeaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.fixed'),
    __metadata("design:type", Boolean)
], NgaLayoutHeaderComponent.prototype, "fixedValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaLayoutHeaderComponent.prototype, "fixed", null);
NgaLayoutHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-layout-header',
        template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  ",
    })
], NgaLayoutHeaderComponent);

/**
 * Component intended to be used within  the `<nga-layout>` component.
 * It adds styles for a preset footer section.
 */
var NgaLayoutFooterComponent = (function () {
    function NgaLayoutFooterComponent() {
    }
    Object.defineProperty(NgaLayoutFooterComponent.prototype, "fixed", {
        set: function (val) {
            this.fixedValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    return NgaLayoutFooterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.fixed'),
    __metadata("design:type", Boolean)
], NgaLayoutFooterComponent.prototype, "fixedValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaLayoutFooterComponent.prototype, "fixed", null);
NgaLayoutFooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-layout-footer',
        template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  ",
    })
], NgaLayoutFooterComponent);

/**
 * A basic content container component
 *
 * While this component can be used alone, it also provides a number
 * of child components for common layout sections, including:
 * - nga-sidebar
 * - nga-layout-column
 * - nga-layout-content
 * - nga-layout-header
 * - nga-layout-footer
 */
var NgaLayoutComponent = (function () {
    function NgaLayoutComponent(themeService, spinnerService, componentFactoryResolver, elementRef, renderer) {
        var _this = this;
        this.themeService = themeService;
        this.spinnerService = spinnerService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = elementRef;
        this.renderer = renderer;
        // TODO: can we remove this?
        this.centerValue = false;
        this.afterViewInit$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.themeSubscription = this.themeService.onThemeChange().subscribe(function (theme) {
            if (theme.previous) {
                _this.renderer.removeClass(_this.elementRef.nativeElement, "nga-theme-" + theme.previous);
            }
            _this.renderer.addClass(_this.elementRef.nativeElement, "nga-theme-" + theme.name);
        });
        this.appendClassSubscription = this.themeService.onAppendLayoutClass().subscribe(function (className) {
            _this.renderer.addClass(_this.elementRef.nativeElement, className);
        });
        this.removeClassSubscription = this.themeService.onRemoveLayoutClass().subscribe(function (className) {
            _this.renderer.removeClass(_this.elementRef.nativeElement, className);
        });
        this.spinnerService.registerLoader(new Promise(function (resolve, reject) {
            _this.afterViewInit$.subscribe(function (_) { return resolve(); });
        }));
        this.spinnerService.load();
    }
    Object.defineProperty(NgaLayoutComponent.prototype, "center", {
        set: function (val) {
            this.centerValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    NgaLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.appendSubscription = this.themeService.onAppendToTop()
            .subscribe(function (data) {
            var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(data.component);
            var componentRef = _this.veryTopRef.createComponent(componentFactory);
            data.listener.next(componentRef);
        });
        this.clearSubscription = this.themeService.onClearLayoutTop()
            .subscribe(function (data) {
            _this.veryTopRef.clear();
            data.listener.next(true);
        });
        this.afterViewInit$.next(true);
    };
    NgaLayoutComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
        this.appendClassSubscription.unsubscribe();
        this.removeClassSubscription.unsubscribe();
        this.appendSubscription.unsubscribe();
        this.clearSubscription.unsubscribe();
    };
    return NgaLayoutComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.center'),
    __metadata("design:type", Boolean)
], NgaLayoutComponent.prototype, "centerValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaLayoutComponent.prototype, "center", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('layoutTopDynamicArea', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ViewContainerRef */] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ViewContainerRef */]) === "function" && _a || Object)
], NgaLayoutComponent.prototype, "veryTopRef", void 0);
NgaLayoutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-layout',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/layout/layout.component.scss")],
        template: "\n    <ng-template #layoutTopDynamicArea></ng-template>\n    <div class=\"layout\">\n      <ng-content select=\"nga-layout-header\"></ng-content>\n      <div class=\"layout-container\">\n        <ng-content select=\"nga-sidebar\"></ng-content>\n        <ng-content select=\"nga-sidebar[left]\"></ng-content>\n        <div class=\"content\" [class.center]=\"centerValue\">\n          <div class=\"columns\">\n            <ng-content select=\"nga-layout-column\"></ng-content>\n          </div>\n          <ng-content select=\"nga-layout-footer\"></ng-content>\n        </div>\n        <ng-content select=\"nga-sidebar[right]\"></ng-content>\n      </div>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_theme_service__["a" /* NgaThemeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_theme_service__["a" /* NgaThemeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* NgaSpinnerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_spinner_service__["a" /* NgaSpinnerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ComponentFactoryResolver */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */]) === "function" && _f || Object])
], NgaLayoutComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/layout/layout.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaLayoutModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */



var NGA_LAYOUT_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__layout_component__["a" /* NgaLayoutComponent */],
    __WEBPACK_IMPORTED_MODULE_2__layout_component__["b" /* NgaLayoutColumnComponent */],
    __WEBPACK_IMPORTED_MODULE_2__layout_component__["c" /* NgaLayoutFooterComponent */],
    __WEBPACK_IMPORTED_MODULE_2__layout_component__["d" /* NgaLayoutHeaderComponent */],
];
var NgaLayoutModule = (function () {
    function NgaLayoutModule() {
    }
    return NgaLayoutModule;
}());
NgaLayoutModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: NGA_LAYOUT_COMPONENTS.slice(),
        exports: NGA_LAYOUT_COMPONENTS.slice(),
    })
], NgaLayoutModule);

//# sourceMappingURL=layout.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/menu/menu-item.component.html":
/***/ (function(module, exports) {

module.exports = "<span *ngIf=\"menuItem.group\" class=\"menu-group\">\n  <i class=\"{{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i>\n  {{ menuItem.title }}\n</span>\n<a *ngIf=\"menuItem.link && !menuItem.url && !menuItem.children && !menuItem.group\"\n        [class.active]=\"menuItem.selected\"\n        [routerLink]=\"menuItem.link\"\n        [attr.target]=\"menuItem.target\"\n        [attr.title]=\"menuItem.title\"\n        (mouseenter)=\"onHoverItem(menuItem)\"\n        (click)=\"onSelectItem(menuItem)\">\n  <i class=\"{{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i>\n  <span>{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"menuItem.url && !menuItem.children && !menuItem.link && !menuItem.group\"\n        [class.active]=\"menuItem.selected\"\n        [attr.href]=\"menuItem.url\"\n        [attr.target]=\"menuItem.target\"\n        [attr.title]=\"menuItem.title\"\n        (mouseenter)=\"onHoverItem(menuItem)\"\n        (click)=\"onSelectItem(menuItem)\">\n  <i class=\"{{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i>\n  <span>{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"!menuItem.children && !menuItem.link && !menuItem.url && !menuItem.group\"\n   [class.active]=\"menuItem.selected\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"$event.preventDefault();onItemClick(menuItem)\">\n  <i class=\"{{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i>\n  <span>{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"menuItem.children\"\n   [class.active]=\"menuItem.selected\"\n   (click)=\"$event.preventDefault();onToggleSubMenu(menuItem)\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   href=\"#\">\n  <i class=\"{{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i>\n  <span>{{ menuItem.title }}</span>\n  <i class=\"ion\" [class.ion-chevron-right]=\"!menuItem.expanded\"\n                 [class.ion-chevron-up]=\"menuItem.expanded\"></i>\n</a>\n<ul *ngIf=\"menuItem.children\"\n    [class.menu-collapsed]=\"!(menuItem.children && menuItem.expanded)\"\n    [class.menu-expanded]=\"menuItem.expanded\">\n  <li ngaMenuItem *ngFor=\"let item of menuItem.children\"\n                  [menuItem]=\"item\"\n                  [class.expanded]=\"item.expanded\"\n                  [class.collapsed]=\"!item.expanded\"\n                  (hoverItem)=\"onHoverItem($event)\"\n                  (toggleSubMenu)=\"onToggleSubMenu($event)\"\n                  (selectItem)=\"onSelectItem($event)\"\n                  (itemClick)=\"onItemClick($event)\"></li>\n</ul>\n"

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/menu/menu.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host /deep/ {\n  display: block; }\n  :host /deep/ ul {\n    list-style-type: none;\n    padding: 0;\n    transition: visibility 0s, opacity 0.2s linear; }\n    :host /deep/ ul li .menu-group {\n      display: block; }\n    :host /deep/ ul li > ul > li > a {\n      padding-left: 2rem; }\n    :host /deep/ ul li a {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      text-decoration: none;\n      font-size: 1em;\n      line-height: 1em; }\n      :host /deep/ ul li a i:first-child {\n        margin-right: 1.25rem;\n        font-size: 2rem; }\n      :host /deep/ ul li a i {\n        display: block; }\n      :host /deep/ ul li a span {\n        display: block;\n        -webkit-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1; }\n    :host /deep/ ul.menu-collapsed {\n      visibility: hidden;\n      opacity: 0;\n      height: 0; }\n    :host /deep/ ul.menu-expanded {\n      visibility: visible;\n      opacity: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/menu/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaMenuItemComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaMenuComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NgaMenuItemComponent = (function () {
    function NgaMenuItemComponent(router) {
        this.router = router;
        this.menuItem = null;
        this.hoverItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
        this.toggleSubMenu = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
        this.selectItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
        this.itemClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
    }
    NgaMenuItemComponent.prototype.onToggleSubMenu = function (item) {
        this.toggleSubMenu.emit(item);
    };
    NgaMenuItemComponent.prototype.onHoverItem = function (item) {
        this.hoverItem.emit(item);
    };
    NgaMenuItemComponent.prototype.onSelectItem = function (item) {
        this.selectItem.emit(item);
    };
    NgaMenuItemComponent.prototype.onItemClick = function (item) {
        this.itemClick.emit(item);
    };
    return NgaMenuItemComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], NgaMenuItemComponent.prototype, "menuItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaMenuItemComponent.prototype, "hoverItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaMenuItemComponent.prototype, "toggleSubMenu", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaMenuItemComponent.prototype, "selectItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaMenuItemComponent.prototype, "itemClick", void 0);
NgaMenuItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        // tslint:disable-next-line:component-selector
        selector: '[ngaMenuItem]',
        template: __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu-item.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], NgaMenuItemComponent);

var NgaMenuComponent = (function () {
    function NgaMenuComponent(menuInternalService, router) {
        this.menuInternalService = menuInternalService;
        this.router = router;
        this.items = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_immutable__["List"])();
        this.stack = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_immutable__["List"])();
    }
    Object.defineProperty(NgaMenuComponent.prototype, "inverse", {
        /**
         * Makes colors inverse based on current theme
         * @type boolean
         */
        set: function (val) {
            this.inverseValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    NgaMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addItemSubscription = this.menuInternalService.onAddItem()
            .subscribe(function (data) {
            if (_this.compareTag(data.tag)) {
                _this.items = (_a = _this.items).push.apply(_a, data.items.toJS());
                _this.menuInternalService.prepareItems(_this.items);
            }
            var _a;
        });
        this.navigateHomeSubscription = this.menuInternalService.onNavigateHome()
            .subscribe(function (data) {
            if (_this.compareTag(data.tag)) {
                _this.navigateHome();
            }
        });
        this.getSelectedItemSubscription = this.menuInternalService.onGetSelectedItem()
            .subscribe(function (data) {
            var selectedItem;
            _this.items.forEach(function (i) {
                var result = _this.getSelectedItem(i);
                if (result) {
                    selectedItem = result;
                    return;
                }
            });
            _this.clearStack();
            data.listener.next({ tag: _this.tag, item: selectedItem });
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                _this.menuInternalService.prepareItems(_this.items);
            }
        });
        this.items = (_a = this.items).push.apply(_a, this.menuInternalService.getItems().toJS());
        this.menuInternalService.prepareItems(this.items);
        var _a;
    };
    NgaMenuComponent.prototype.ngOnDestroy = function () {
        this.addItemSubscription.unsubscribe();
        this.navigateHomeSubscription.unsubscribe();
        this.getSelectedItemSubscription.unsubscribe();
    };
    NgaMenuComponent.prototype.onHoverItem = function (item) {
        this.menuInternalService.itemHover(item, this.tag);
    };
    NgaMenuComponent.prototype.onToggleSubMenu = function (item) {
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    };
    // TODO: is not fired on page reload
    NgaMenuComponent.prototype.onSelectItem = function (item) {
        this.menuInternalService.resetItems(this.items);
        item.selected = true;
        this.menuInternalService.itemSelect(item, this.tag);
    };
    NgaMenuComponent.prototype.onItemClick = function (item) {
        this.menuInternalService.itemClick(item, this.tag);
    };
    NgaMenuComponent.prototype.navigateHome = function () {
        var _this = this;
        var homeItem;
        this.items.forEach(function (i) {
            var result = _this.getHomeItem(i);
            if (result) {
                homeItem = result;
            }
        });
        this.clearStack();
        if (homeItem) {
            this.menuInternalService.resetItems(this.items);
            homeItem.selected = true;
            if (homeItem.link) {
                this.router.navigate([homeItem.link]);
            }
            if (homeItem.url) {
                window.location.href = homeItem.url;
            }
        }
    };
    NgaMenuComponent.prototype.getHomeItem = function (parent) {
        var _this = this;
        this.stack = this.stack.push(parent);
        if (parent.home) {
            return parent;
        }
        if (parent.children && parent.children.size > 0) {
            var first = parent.children.filter(function (c) { return !_this.stack.contains(c); }).first();
            if (first) {
                return this.getHomeItem(first);
            }
        }
        if (parent.parent) {
            return this.getHomeItem(parent.parent);
        }
    };
    NgaMenuComponent.prototype.clearStack = function () {
        this.stack = this.stack.clear();
    };
    NgaMenuComponent.prototype.compareTag = function (tag) {
        return !tag || tag === this.tag;
    };
    NgaMenuComponent.prototype.getSelectedItem = function (parent) {
        var _this = this;
        this.stack = this.stack.push(parent);
        if (parent.selected) {
            return parent;
        }
        if (parent.children && parent.children.size > 0) {
            var first = parent.children.filter(function (c) { return !_this.stack.contains(c); }).first();
            if (first) {
                return this.getSelectedItem(first);
            }
        }
        if (parent.parent) {
            return this.getSelectedItem(parent.parent);
        }
    };
    return NgaMenuComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.inverse'),
    __metadata("design:type", Boolean)
], NgaMenuComponent.prototype, "inverseValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaMenuComponent.prototype, "tag", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], NgaMenuComponent.prototype, "items", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaMenuComponent.prototype, "inverse", null);
NgaMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-menu',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.component.scss")],
        template: "\n    <ul>\n      <li ngaMenuItem *ngFor=\"let item of items\"\n                      [menuItem]=\"item\"\n                      [class.expanded]=\"item.expanded\"\n                      [class.collapsed]=\"!item.expanded\"\n                      (hoverItem)=\"onHoverItem($event)\"\n                      (toggleSubMenu)=\"onToggleSubMenu($event)\"\n                      (selectItem)=\"onSelectItem($event)\"\n                      (itemClick)=\"onItemClick($event)\"></li>\n    </ul>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__menu_service__["b" /* NgaMenuInternalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__menu_service__["b" /* NgaMenuInternalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], NgaMenuComponent);

var _a, _b, _c;
//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/menu/menu.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaMenuModule; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ngaMenuComponents = [
    __WEBPACK_IMPORTED_MODULE_2__menu_component__["a" /* NgaMenuComponent */],
    __WEBPACK_IMPORTED_MODULE_2__menu_component__["b" /* NgaMenuItemComponent */],
];
var NGA_MENU_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_3__menu_service__["a" /* NgaMenuService */],
    __WEBPACK_IMPORTED_MODULE_3__menu_service__["b" /* NgaMenuInternalService */],
];
var NgaMenuModule = NgaMenuModule_1 = (function () {
    function NgaMenuModule() {
    }
    NgaMenuModule.forRoot = function (ngaMenuOptions) {
        return {
            ngModule: NgaMenuModule_1,
            providers: NGA_MENU_PROVIDERS.concat([
                { provide: __WEBPACK_IMPORTED_MODULE_3__menu_service__["c" /* ngaMenuOptionsToken */], useValue: ngaMenuOptions },
            ]),
        };
    };
    return NgaMenuModule;
}());
NgaMenuModule = NgaMenuModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: ngaMenuComponents.slice(),
        exports: ngaMenuComponents.slice(),
    })
], NgaMenuModule);

var NgaMenuModule_1;
//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/menu/menu.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__ = __webpack_require__("./node_modules/rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_publish__ = __webpack_require__("./node_modules/rxjs/add/operator/publish.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_publish__);
/* unused harmony export NgaMenuItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ngaMenuOptionsToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaMenuService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaMenuInternalService; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var itemClick$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var addItems$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var navigateHome$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var getSelectedItem$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var itemSelect$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var itemHover$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var submenuToggle$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_ReplaySubject__["ReplaySubject"](1);
var NgaMenuItem = (function () {
    function NgaMenuItem() {
        this.pathMath = 'full'; // TODO: is not set if item is initialized by default, should be set anyway
    }
    return NgaMenuItem;
}());

var ngaMenuOptionsToken = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* InjectionToken */]('NGA_MENU_OPTIONS');
// TODO: map select events to router change events
var NgaMenuService = (function () {
    function NgaMenuService() {
    }
    NgaMenuService.prototype.addItems = function (items, tag) {
        addItems$.next({ tag: tag, items: items });
    };
    NgaMenuService.prototype.navigateHome = function (tag) {
        navigateHome$.next({ tag: tag });
    };
    NgaMenuService.prototype.getSelectedItem = function (tag) {
        var listener = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        getSelectedItem$.next({ tag: tag, listener: listener });
        return listener.asObservable();
    };
    NgaMenuService.prototype.onItemClick = function () {
        return itemClick$.publish().refCount();
    };
    NgaMenuService.prototype.onItemSelect = function () {
        return itemSelect$.publish().refCount();
    };
    NgaMenuService.prototype.onItemHover = function () {
        return itemHover$.publish().refCount();
    };
    NgaMenuService.prototype.onSubmenuToggle = function () {
        return submenuToggle$.publish().refCount();
    };
    return NgaMenuService;
}());
NgaMenuService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], NgaMenuService);

var NgaMenuInternalService = (function () {
    function NgaMenuInternalService(router, location, options) {
        this.router = router;
        this.location = location;
        this.options = options;
        this.stack = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_immutable__["List"])();
        this.items = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_immutable__["List"])();
        if (options && options.items) {
            this.items = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_immutable__["List"])(this.options.items);
        }
        else {
            this.items = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_immutable__["List"])();
        }
    }
    NgaMenuInternalService.prototype.getItems = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_immutable__["List"])(this.items);
    };
    NgaMenuInternalService.prototype.prepareItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.setParent(i); });
        items.forEach(function (i) { return _this.prepareItem(i); });
        this.clearStack();
    };
    NgaMenuInternalService.prototype.onAddItem = function () {
        return addItems$.publish().refCount();
    };
    NgaMenuInternalService.prototype.onNavigateHome = function () {
        return navigateHome$.publish().refCount();
    };
    NgaMenuInternalService.prototype.onGetSelectedItem = function () {
        return getSelectedItem$.publish().refCount();
    };
    NgaMenuInternalService.prototype.itemHover = function (item, tag) {
        itemHover$.next({
            tag: tag,
            item: item,
        });
    };
    NgaMenuInternalService.prototype.submenuToggle = function (item, tag) {
        submenuToggle$.next({
            tag: tag,
            item: item,
        });
    };
    NgaMenuInternalService.prototype.resetItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.resetItem(i); });
        this.clearStack();
    };
    NgaMenuInternalService.prototype.itemSelect = function (item, tag) {
        itemSelect$.next({
            tag: tag,
            item: item,
        });
    };
    NgaMenuInternalService.prototype.itemClick = function (item, tag) {
        itemClick$.next({
            tag: tag,
            item: item,
        });
    };
    NgaMenuInternalService.prototype.resetItem = function (parent) {
        var _this = this;
        parent.selected = false;
        this.stack = this.stack.push(parent);
        if (parent.children && parent.children.size > 0) {
            var firstSelected = parent.children.filter(function (c) { return !_this.stack.contains(c); }).first();
            if (firstSelected) {
                firstSelected.selected = false;
                this.resetItem(firstSelected);
            }
        }
        if (parent.parent) {
            this.resetItem(parent.parent);
        }
    };
    NgaMenuInternalService.prototype.setParent = function (parent) {
        if (parent.children && parent.children.size > 0) {
            var firstItemWithoutParent = parent.children.filter(function (c) { return c.parent === null || c.parent === undefined; }).first();
            if (firstItemWithoutParent) {
                firstItemWithoutParent.parent = parent;
                this.setParent(firstItemWithoutParent);
            }
        }
        if (parent.parent) {
            this.setParent(parent.parent);
        }
    };
    NgaMenuInternalService.prototype.prepareItem = function (parent) {
        var _this = this;
        parent.selected = false;
        this.stack = this.stack.push(parent);
        if (parent.expanded) {
            if (parent.parent) {
                parent.parent.expanded = true;
            }
        }
        var exact = parent.pathMath === 'full';
        if ((exact && this.location.path() === parent.link) || (!exact && this.location.path().includes(parent.link))) {
            parent.selected = true;
            if (parent.parent) {
                parent.parent.expanded = true;
            }
        }
        if (parent.children && parent.children.size > 0) {
            var firstUnchecked = parent.children.filter(function (c) { return !_this.stack.contains(c); }).first();
            if (firstUnchecked) {
                this.prepareItem(firstUnchecked);
            }
        }
        if (parent.parent) {
            this.prepareItem(parent.parent);
        }
    };
    NgaMenuInternalService.prototype.clearStack = function () {
        this.stack = this.stack.clear();
    };
    return NgaMenuInternalService;
}());
NgaMenuInternalService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Inject */])(ngaMenuOptionsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* Location */]) === "function" && _b || Object, Object])
], NgaMenuInternalService);

var _a, _b;
//# sourceMappingURL=menu.service.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/route-tabset/route-tabset.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\nul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  list-style-type: none;\n  margin: 0; }\n  ul li {\n    cursor: pointer;\n    margin-bottom: -1px;\n    text-align: center; }\n    ul li.active a::before {\n      display: block; }\n    ul li a {\n      position: relative;\n      text-decoration: none;\n      display: inline-block; }\n      ul li a::before {\n        display: none;\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 6px;\n        border-radius: 3px;\n        bottom: -2px;\n        left: 0; }\n\n:host.full-width ul li {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/route-tabset/route-tabset.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaRouteTabsetComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NgaRouteTabsetComponent = (function () {
    function NgaRouteTabsetComponent(router) {
        this.router = router;
        this.fullWidthValue = false;
        this.changeTab = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
    }
    Object.defineProperty(NgaRouteTabsetComponent.prototype, "fullWidth", {
        set: function (val) {
            this.fullWidthValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    NgaRouteTabsetComponent.prototype.selectTab = function (tab) {
        this.changeTab.emit(tab);
        this.router.navigate([tab.route]);
    };
    return NgaRouteTabsetComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.full-width'),
    __metadata("design:type", Boolean)
], NgaRouteTabsetComponent.prototype, "fullWidthValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Array)
], NgaRouteTabsetComponent.prototype, "tabs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaRouteTabsetComponent.prototype, "fullWidth", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaRouteTabsetComponent.prototype, "changeTab", void 0);
NgaRouteTabsetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-route-tabset',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/route-tabset/route-tabset.component.scss")],
        template: "\n    <ul>\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"$event.preventDefault(); selectTab(tab)\"\n          routerLink=\"{{tab.route}}\"\n          routerLinkActive=\"active\"\n          [routerLinkActiveOptions]=\"{ exact: true }\">\n        <a href>{{tab.title}}</a>\n      </li>\n    </ul>\n    <router-outlet></router-outlet>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], NgaRouteTabsetComponent);

var _a;
//# sourceMappingURL=route-tabset.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/route-tabset/route-tabset.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route_tabset_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/route-tabset/route-tabset.component.ts");
/* unused harmony export NgaRouteTabsetModule */
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NgaRouteTabsetModule = (function () {
    function NgaRouteTabsetModule() {
    }
    return NgaRouteTabsetModule;
}());
NgaRouteTabsetModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__route_tabset_component__["a" /* NgaRouteTabsetComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__route_tabset_component__["a" /* NgaRouteTabsetComponent */],
        ],
    })
], NgaRouteTabsetModule);

//# sourceMappingURL=route-tabset.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/search/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_theme_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/theme.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__("./node_modules/rxjs/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaSearchFieldComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSearchComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * search-field-component is used under the hood by nga-search component
 * can't be used itself
 */
var NgaSearchFieldComponent = NgaSearchFieldComponent_1 = (function () {
    function NgaSearchFieldComponent() {
        this.searchClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
        this.search = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
        this.showSearch = false;
    }
    Object.defineProperty(NgaSearchFieldComponent.prototype, "modalZoomin", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_MODAL_ZOOMIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "rotateLayout", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_ROTATE_LAYOUT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "modalMove", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_MODAL_MOVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "curtain", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_CURTAIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "columnCurtain", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_COLUMN_CURTAIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "modalDrop", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_MODAL_DROP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "modalHalf", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_MODAL_HALF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "simpleSearch", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent_1.TYPE_SIMPLE_SEARCH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchFieldComponent.prototype, "type", {
        set: function (val) {
            this.searchType = val;
        },
        enumerable: true,
        configurable: true
    });
    NgaSearchFieldComponent.prototype.closeSearch = function () {
        this.searchClose.emit(true);
    };
    NgaSearchFieldComponent.prototype.submitSearch = function (term) {
        if (term) {
            this.search.emit(term);
        }
    };
    NgaSearchFieldComponent.prototype.onBlur = function () {
        if (this.searchType === NgaSearchFieldComponent_1.TYPE_SIMPLE_SEARCH && this.showSearch) {
            this.closeSearch();
        }
    };
    return NgaSearchFieldComponent;
}());
NgaSearchFieldComponent.TYPE_MODAL_ZOOMIN = 'modal-zoomin';
NgaSearchFieldComponent.TYPE_ROTATE_LAYOUT = 'rotate-layout';
NgaSearchFieldComponent.TYPE_MODAL_MOVE = 'modal-move';
NgaSearchFieldComponent.TYPE_CURTAIN = 'curtain';
NgaSearchFieldComponent.TYPE_COLUMN_CURTAIN = 'column-curtain';
NgaSearchFieldComponent.TYPE_MODAL_DROP = 'modal-drop';
NgaSearchFieldComponent.TYPE_MODAL_HALF = 'modal-half';
NgaSearchFieldComponent.TYPE_SIMPLE_SEARCH = 'simple-search';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaSearchFieldComponent.prototype, "searchType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaSearchFieldComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaSearchFieldComponent.prototype, "searchClose", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaSearchFieldComponent.prototype, "search", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('searchInput'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */]) === "function" && _a || Object)
], NgaSearchFieldComponent.prototype, "inputElement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.show'),
    __metadata("design:type", Boolean)
], NgaSearchFieldComponent.prototype, "showSearch", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.modal-zoomin'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "modalZoomin", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.rotate-layout'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "rotateLayout", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.modal-move'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "modalMove", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.curtain'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "curtain", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.column-curtain'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "columnCurtain", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.modal-drop'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "modalDrop", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.modal-half'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "modalHalf", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.simple-search'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchFieldComponent.prototype, "simpleSearch", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgaSearchFieldComponent.prototype, "type", null);
NgaSearchFieldComponent = NgaSearchFieldComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-search-field',
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ChangeDetectionStrategy */].OnPush,
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-zoomin.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.layout-rotate.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-move.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.curtain.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.column-curtain.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-drop.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-half.scss"), __webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.simple-search.scss")],
        template: "\n    <div class=\"wrapper\">\n      <div class=\"search\" (keyup.esc)=\"closeSearch()\" >\n      \n        <button (click)=\"closeSearch()\">\n          <i class=\"ion-ios-close-outline icon\"></i>\n        </button>\n        <div class=\"form-wrapper\">\n          <form class=\"form\" (keyup.enter)=\"submitSearch(searchInput.value)\">\n            <div class=\"form-content\">\n              <input class=\"search-input\" #searchInput autocomplete=\"off\" [attr.placeholder]=\"placeholder\"\n              (blur)=\"onBlur()\"/>\n            </div>\n            <span class=\"info\">Hit enter to search</span>\n          </form>\n        </div>\n        \n      </div>\n    </div>\n    ",
    })
], NgaSearchFieldComponent);

var NgaSearchComponent = (function () {
    function NgaSearchComponent(searchService, themeService, componentFactoryResolver) {
        this.searchService = searchService;
        this.themeService = themeService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.placeholder = 'Search...';
        this.showSearch = false;
        this.searchFieldComponentRef = null;
        this.searchType = 'rotate-layout';
    }
    Object.defineProperty(NgaSearchComponent.prototype, "simpleSearch", {
        get: function () {
            return this.searchType === NgaSearchFieldComponent.TYPE_SIMPLE_SEARCH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSearchComponent.prototype, "type", {
        set: function (val) {
            this.searchType = val;
        },
        enumerable: true,
        configurable: true
    });
    NgaSearchComponent.prototype.openSearch = function () {
        this.searchService.activateSearch(this.searchType, this.tag);
    };
    NgaSearchComponent.prototype.connectToSearchField = function (componentRef) {
        var _this = this;
        this.searchFieldComponentRef = componentRef;
        componentRef.instance.searchType = this.searchType;
        componentRef.instance.placeholder = this.placeholder;
        componentRef.instance.searchClose.subscribe(function () {
            _this.searchService.deactivateSearch(_this.searchType, _this.tag);
        });
        componentRef.instance.search.subscribe(function (term) {
            _this.searchService.submitSearch(term, _this.tag);
            _this.searchService.deactivateSearch(_this.searchType, _this.tag);
        });
        componentRef.changeDetectorRef.detectChanges();
    };
    NgaSearchComponent.prototype.createAttachedSearch = function (component) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var componentRef = this.attachedSearchContainer.createComponent(componentFactory);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(componentRef);
    };
    NgaSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activateSearchSubscription = this.searchService.onSearchActivate().subscribe(function (data) {
            if (!_this.tag || data.tag === _this.tag) {
                _this.showSearch = true;
                if (_this.searchType !== NgaSearchFieldComponent.TYPE_SIMPLE_SEARCH) {
                    _this.themeService.appendLayoutClass(_this.searchType);
                    __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(null).delay(0).subscribe(function () {
                        _this.themeService.appendLayoutClass('with-search');
                    });
                }
                _this.searchFieldComponentRef.instance.showSearch = true;
                _this.searchFieldComponentRef.instance.inputElement.nativeElement.focus();
                _this.searchFieldComponentRef.changeDetectorRef.detectChanges();
            }
        });
        this.deactivateSearchSubscription = this.searchService.onSearchDeactivate().subscribe(function (data) {
            if (!_this.tag || data.tag === _this.tag) {
                _this.showSearch = false;
                _this.searchFieldComponentRef.instance.showSearch = false;
                _this.searchFieldComponentRef.instance.inputElement.nativeElement.value = '';
                _this.searchFieldComponentRef.instance.inputElement.nativeElement.blur();
                _this.searchFieldComponentRef.changeDetectorRef.detectChanges();
                if (_this.searchType !== NgaSearchFieldComponent.TYPE_SIMPLE_SEARCH) {
                    _this.themeService.removeLayoutClass('with-search');
                    __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(null).delay(500).subscribe(function () {
                        _this.themeService.removeLayoutClass(_this.searchType);
                    });
                }
            }
        });
    };
    NgaSearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var fieldComponentObservable = this.searchType === NgaSearchFieldComponent.TYPE_SIMPLE_SEARCH ?
            this.createAttachedSearch(NgaSearchFieldComponent)
            : this.themeService.appendToLayoutTop(NgaSearchFieldComponent);
        this.createFieldSubscription = fieldComponentObservable.subscribe(function (componentRef) {
            if (componentRef) {
                _this.connectToSearchField(componentRef);
            }
        });
    };
    NgaSearchComponent.prototype.ngOnDestroy = function () {
        this.activateSearchSubscription.unsubscribe();
        this.deactivateSearchSubscription.unsubscribe();
        this.createFieldSubscription.unsubscribe();
        this.searchFieldComponentRef.destroy();
    };
    return NgaSearchComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaSearchComponent.prototype, "tag", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaSearchComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.show'),
    __metadata("design:type", Boolean)
], NgaSearchComponent.prototype, "showSearch", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('attachedSearchContainer', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ViewContainerRef */] }),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ViewContainerRef */]) === "function" && _b || Object)
], NgaSearchComponent.prototype, "attachedSearchContainer", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.simple-search'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSearchComponent.prototype, "simpleSearch", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgaSearchComponent.prototype, "type", null);
NgaSearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-search',
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ChangeDetectionStrategy */].OnPush,
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/search/styles/search.component.scss")],
        template: "\n    <div class=\"search-wrap\">\n      <button (click)=\"openSearch()\">\n        <i class=\"ion-ios-search icon\"></i>\n      </button>\n      <ng-template #attachedSearchContainer></ng-template>\n    </div>\n    ",
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__search_service__["a" /* NgaSuperSearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__search_service__["a" /* NgaSuperSearchService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_theme_service__["a" /* NgaThemeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_theme_service__["a" /* NgaThemeService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ComponentFactoryResolver */]) === "function" && _e || Object])
], NgaSearchComponent);

var NgaSearchFieldComponent_1, _a, _b, _c, _d, _e;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/search.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/search/search.service.ts");
/* unused harmony export NgaSearchModule */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */




var NgaSearchModule = (function () {
    function NgaSearchModule() {
    }
    return NgaSearchModule;
}());
NgaSearchModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__search_component__["a" /* NgaSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_2__search_component__["b" /* NgaSearchFieldComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__search_component__["a" /* NgaSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_2__search_component__["b" /* NgaSearchFieldComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__search_service__["a" /* NgaSuperSearchService */],
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__search_component__["b" /* NgaSearchFieldComponent */],
        ],
    })
], NgaSearchModule);

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/search.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share__ = __webpack_require__("./node_modules/rxjs/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_share__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSuperSearchService; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NgaSuperSearchService = (function () {
    function NgaSuperSearchService() {
        this.searchSubmittings$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.searchActivations$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.searchDeactivations$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    NgaSuperSearchService.prototype.activateSearch = function (searchType, tag) {
        this.searchActivations$.next({ searchType: searchType, tag: tag });
    };
    NgaSuperSearchService.prototype.deactivateSearch = function (searchType, tag) {
        this.searchDeactivations$.next({ searchType: searchType, tag: tag });
    };
    NgaSuperSearchService.prototype.submitSearch = function (term, tag) {
        this.searchSubmittings$.next({ term: term, tag: tag });
    };
    NgaSuperSearchService.prototype.onSearchActivate = function () {
        return this.searchActivations$.share();
    };
    NgaSuperSearchService.prototype.onSearchDeactivate = function () {
        return this.searchDeactivations$.share();
    };
    NgaSuperSearchService.prototype.onSearchSubmit = function () {
        return this.searchSubmittings$.share();
    };
    return NgaSuperSearchService;
}());
NgaSuperSearchService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], NgaSuperSearchService);

//# sourceMappingURL=search.service.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.column-curtain.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/\n/deep/ nga-layout.column-curtain.with-search .layout {\n  pointer-events: none; }\n\n:host.column-curtain .wrapper {\n  display: block;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 50%;\n  overflow: hidden;\n  width: 50%;\n  height: 100vh;\n  pointer-events: none; }\n  :host.column-curtain .wrapper::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 70%;\n    height: 100%;\n    -webkit-transform: scale3d(0, 1, 1);\n            transform: scale3d(0, 1, 1);\n    -webkit-transform-origin: 0 50%;\n            transform-origin: 0 50%;\n    transition: -webkit-transform 0.3s;\n    transition: transform 0.3s;\n    transition: transform 0.3s, -webkit-transform 0.3s;\n    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1); }\n  :host.column-curtain .wrapper::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 30%;\n    height: 100%;\n    pointer-events: none; }\n  :host.column-curtain .wrapper .search {\n    position: relative;\n    padding: 2.5rem 1.5rem 0;\n    background: transparent; }\n    :host.column-curtain .wrapper .search button {\n      position: absolute;\n      top: 2rem;\n      right: 2rem;\n      font-size: 2.5rem;\n      opacity: 0;\n      transition: opacity 0.5s; }\n    :host.column-curtain .wrapper .search form {\n      width: 70%;\n      -webkit-transform: translate3d(-150%, 0, 0);\n              transform: translate3d(-150%, 0, 0);\n      transition: -webkit-transform 0.3s;\n      transition: transform 0.3s;\n      transition: transform 0.3s, -webkit-transform 0.3s; }\n    :host.column-curtain .wrapper .search input {\n      font-size: 2.5rem;\n      width: 100%; }\n    :host.column-curtain .wrapper .search span {\n      font-size: 85%; }\n\n:host.column-curtain.show .wrapper {\n  pointer-events: auto; }\n  :host.column-curtain.show .wrapper::before {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n  :host.column-curtain.show .wrapper .search form {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    transition-delay: 0.15s;\n    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1); }\n  :host.column-curtain.show .wrapper .search button {\n    opacity: 1;\n    z-index: 100; }\n\n@media screen and (max-width: 40rem) {\n  :host.column-curtain span {\n    width: 90%; }\n  :host.column-curtain input {\n    font-size: 2rem;\n    width: 90%; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.curtain.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/\n:host.curtain .search {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 100%;\n  overflow: hidden;\n  height: 100vh;\n  width: 100%;\n  padding: 3rem;\n  pointer-events: none;\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n  transition-delay: 0.4s;\n  transition-timing-function: ease-out; }\n  :host.curtain .search::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    transition: -webkit-transform 0.3s;\n    transition: transform 0.3s;\n    transition: transform 0.3s, -webkit-transform 0.3s;\n    transition-timing-function: ease-out; }\n  :host.curtain .search button {\n    font-size: 2.5rem;\n    position: absolute;\n    top: 3rem;\n    right: 3rem;\n    transition: opacity 0.1s;\n    transition-delay: 0.3s; }\n  :host.curtain .search form {\n    width: 50%;\n    opacity: 0;\n    -webkit-transform: scale3d(0.8, 0.8, 1);\n            transform: scale3d(0.8, 0.8, 1);\n    transition: opacity 0.5s, -webkit-transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s; }\n  :host.curtain .search input {\n    width: 100%;\n    font-size: 6vw; }\n\n:host.curtain.show .search {\n  width: 100%;\n  pointer-events: auto;\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n  transition-delay: 0s; }\n  :host.curtain.show .search::after {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n    transition-delay: 0.4s; }\n  :host.curtain.show .search button {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n  :host.curtain.show .search form {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n\n@media screen and (max-width: 40em) {\n  :host.curtain span {\n    width: 90%; }\n  :host.curtain input {\n    font-size: 2em;\n    width: 90%; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.layout-rotate.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/deep/ nga-layout.rotate-layout .layout {\n  -webkit-transform-origin: 50vw 50vh;\n          transform-origin: 50vw 50vh;\n  -webkit-transform: perspective(1000px);\n          transform: perspective(1000px);\n  transition: -webkit-transform 0.5s;\n  transition: transform 0.5s;\n  transition: transform 0.5s, -webkit-transform 0.5s;\n  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n\n/deep/ nga-layout.rotate-layout.with-search .layout {\n  -webkit-transform-origin: 50vw 50vh;\n          transform-origin: 50vw 50vh;\n  -webkit-transform: perspective(1000px) translate3d(0, 50vh, 0) rotate3d(1, 0, 0, 30deg);\n          transform: perspective(1000px) translate3d(0, 50vh, 0) rotate3d(1, 0, 0, 30deg);\n  pointer-events: none; }\n\n/deep/ nga-layout.rotate-layout {\n  position: fixed;\n  overflow: hidden;\n  width: 100%; }\n\n:host.rotate-layout .wrapper {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100vh;\n  pointer-events: none;\n  opacity: 0;\n  transition-property: opacity;\n  transition-delay: 0.4s; }\n  :host.rotate-layout .wrapper .search {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    text-align: center;\n    z-index: 1000;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 50vh;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 0.5s;\n    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n    :host.rotate-layout .wrapper .search button {\n      position: absolute;\n      top: 3rem;\n      right: 3rem;\n      font-size: 2.5rem;\n      opacity: 0;\n      -webkit-transform: scale3d(0.8, 0.8, 1);\n              transform: scale3d(0.8, 0.8, 1);\n      transition: opacity 0.5s, -webkit-transform 0.5s;\n      transition: opacity 0.5s, transform 0.5s;\n      transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;\n      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n    :host.rotate-layout .wrapper .search form {\n      margin: 5rem 0;\n      opacity: 0;\n      -webkit-transform: scale3d(0.7, 0.7, 1);\n              transform: scale3d(0.7, 0.7, 1);\n      transition: opacity 0.5s, -webkit-transform 0.5s;\n      transition: opacity 0.5s, transform 0.5s;\n      transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;\n      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n    :host.rotate-layout .wrapper .search input {\n      font-size: 7vw;\n      width: 75%; }\n\n:host.rotate-layout.show .wrapper {\n  opacity: 1;\n  transition-delay: 0s; }\n  :host.rotate-layout.show .wrapper .search {\n    pointer-events: auto;\n    opacity: 1; }\n    :host.rotate-layout.show .wrapper .search button {\n      opacity: 1;\n      -webkit-transform: scale3d(1, 1, 1);\n              transform: scale3d(1, 1, 1); }\n    :host.rotate-layout.show .wrapper .search form {\n      opacity: 1;\n      -webkit-transform: scale3d(1, 1, 1);\n              transform: scale3d(1, 1, 1); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-drop.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/deep/ nga-layout.modal-drop .layout {\n  position: relative;\n  transition: opacity 0.4s, -webkit-transform 0.4s;\n  transition: transform 0.4s, opacity 0.4s;\n  transition: transform 0.4s, opacity 0.4s, -webkit-transform 0.4s;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n/deep/ nga-layout.modal-drop.with-search .layout {\n  opacity: 0;\n  -webkit-transform: scale3d(0.9, 0.9, 1);\n          transform: scale3d(0.9, 0.9, 1);\n  pointer-events: none; }\n\n:host.modal-drop .search {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  text-align: center;\n  z-index: 1000;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background: none;\n  pointer-events: none; }\n  :host.modal-drop .search::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    transition: opacity 0.4s; }\n  :host.modal-drop .search button {\n    font-size: 2.5rem;\n    position: absolute;\n    top: 3rem;\n    right: 3rem;\n    display: block;\n    opacity: 0;\n    transition: opacity 0.4s; }\n  :host.modal-drop .search form {\n    position: relative;\n    margin: 5rem 0 2rem; }\n  :host.modal-drop .search input {\n    font-size: 6vw;\n    width: 60%;\n    padding: 0.25rem;\n    text-align: center;\n    opacity: 0;\n    transition: opacity 0.4s; }\n  :host.modal-drop .search span {\n    position: relative;\n    z-index: 9;\n    display: block;\n    width: 60%;\n    padding: 0.85rem 0;\n    opacity: 0;\n    -webkit-transform: translate3d(0, -50px, 0);\n            transform: translate3d(0, -50px, 0);\n    transition: opacity 0.4s, -webkit-transform 0.4s;\n    transition: opacity 0.4s, transform 0.4s;\n    transition: opacity 0.4s, transform 0.4s, -webkit-transform 0.4s; }\n  :host.modal-drop .search .form-content {\n    position: relative;\n    z-index: 10;\n    overflow: hidden;\n    -webkit-transform: translate3d(0, -50px, 0);\n            transform: translate3d(0, -50px, 0);\n    transition: -webkit-transform 0.4s;\n    transition: transform 0.4s;\n    transition: transform 0.4s, -webkit-transform 0.4s; }\n    :host.modal-drop .search .form-content::after {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 20%;\n      width: 60%;\n      height: 105%;\n      opacity: 0;\n      -webkit-transform-origin: 50% 0;\n              transform-origin: 50% 0; }\n\n:host.modal-drop.show .search {\n  pointer-events: auto; }\n  :host.modal-drop.show .search::before {\n    opacity: 1; }\n  :host.modal-drop.show .search button {\n    opacity: 1; }\n  :host.modal-drop.show .search .form-content {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    transition: none; }\n    :host.modal-drop.show .search .form-content::after {\n      -webkit-animation: scaleUpDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n              animation: scaleUpDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }\n  :host.modal-drop.show .search input {\n    opacity: 1;\n    transition: opacity 0s 0.4s; }\n  :host.modal-drop.show .search span {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    transition-delay: 0.4s;\n    transition-timing-function: ease-out; }\n\n@-webkit-keyframes scaleUpDown {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 0, 1);\n            transform: scale3d(1, 0, 1); }\n  50% {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n    -webkit-transform-origin: 50% 0;\n            transform-origin: 50% 0;\n    transition-timing-function: ease-out; }\n  50.1% {\n    -webkit-transform-origin: 50% 100%;\n            transform-origin: 50% 100%;\n    transition-timing-function: ease-out; }\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 0, 1);\n            transform: scale3d(1, 0, 1);\n    -webkit-transform-origin: 50% 100%;\n            transform-origin: 50% 100%;\n    transition-timing-function: ease-out; } }\n\n@keyframes scaleUpDown {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 0, 1);\n            transform: scale3d(1, 0, 1); }\n  50% {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n    -webkit-transform-origin: 50% 0;\n            transform-origin: 50% 0;\n    transition-timing-function: ease-out; }\n  50.1% {\n    -webkit-transform-origin: 50% 100%;\n            transform-origin: 50% 100%;\n    transition-timing-function: ease-out; }\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 0, 1);\n            transform: scale3d(1, 0, 1);\n    -webkit-transform-origin: 50% 100%;\n            transform-origin: 50% 100%;\n    transition-timing-function: ease-out; } }\n\n@media screen and (max-width: 40rem) {\n  :host.modal-drop form {\n    margin: 2rem 0; }\n  :host.modal-drop input {\n    width: 100%;\n    left: 0; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-half.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/deep/ nga-layout.modal-half .layout {\n  transition: opacity 0.6s, -webkit-transform 0.6s;\n  transition: transform 0.6s, opacity 0.6s;\n  transition: transform 0.6s, opacity 0.6s, -webkit-transform 0.6s;\n  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n\n/deep/ nga-layout.modal-half.with-search .layout {\n  -webkit-transform: scale3d(0.8, 0.8, 1);\n          transform: scale3d(0.8, 0.8, 1);\n  pointer-events: none; }\n\n:host.modal-half .search {\n  text-align: center;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  height: 100vh;\n  background: none;\n  pointer-events: none; }\n  :host.modal-half .search::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 0.6s;\n    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n  :host.modal-half .search button {\n    font-size: 2.5rem;\n    position: absolute;\n    top: 3rem;\n    right: 3rem;\n    display: block;\n    z-index: 100;\n    opacity: 0;\n    -webkit-transform: scale3d(0.8, 0.8, 1);\n            transform: scale3d(0.8, 0.8, 1);\n    transition: opacity 0.6s, -webkit-transform 0.6s;\n    transition: opacity 0.6s, transform 0.6s;\n    transition: opacity 0.6s, transform 0.6s, -webkit-transform 0.6s;\n    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n  :host.modal-half .search .form-wrapper {\n    position: absolute;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n    height: 50%;\n    transition: -webkit-transform 0.6s;\n    transition: transform 0.6s;\n    transition: transform 0.6s, -webkit-transform 0.6s;\n    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);\n    -webkit-transform: translate3d(0, -100%, 0);\n            transform: translate3d(0, -100%, 0); }\n  :host.modal-half .search form {\n    width: 75%;\n    margin: 0 auto; }\n  :host.modal-half .search input {\n    font-size: 7vw;\n    width: 100%; }\n\n:host.modal-half.show .search {\n  pointer-events: auto; }\n  :host.modal-half.show .search::before {\n    opacity: 1; }\n  :host.modal-half.show .search button {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n  :host.modal-half.show .search .form-wrapper {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-move.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/deep/ nga-layout.modal-move .layout {\n  transition: -webkit-transform 0.5s;\n  transition: transform 0.5s;\n  transition: transform 0.5s, -webkit-transform 0.5s; }\n\n/deep/ nga-layout.modal-move.with-search .layout {\n  -webkit-transform: scale3d(0.8, 0.8, 1);\n          transform: scale3d(0.8, 0.8, 1);\n  pointer-events: none; }\n\n:host.modal-move .search {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  text-align: center;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.5s; }\n  :host.modal-move .search button {\n    position: absolute;\n    top: 3rem;\n    right: 3rem;\n    font-size: 2.5rem;\n    opacity: 0;\n    transition: opacity 0.5s; }\n  :host.modal-move .search form {\n    margin: 5rem 0;\n    opacity: 0;\n    -webkit-transform: scale3d(0.8, 0.8, 1);\n            transform: scale3d(0.8, 0.8, 1);\n    transition: opacity 0.5s, -webkit-transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s; }\n  :host.modal-move .search input {\n    font-size: 10vw;\n    width: 75%;\n    -webkit-transform: scale3d(0, 1, 1);\n            transform: scale3d(0, 1, 1);\n    -webkit-transform-origin: 0 50%;\n            transform-origin: 0 50%;\n    transition: -webkit-transform 0.3s;\n    transition: transform 0.3s;\n    transition: transform 0.3s, -webkit-transform 0.3s; }\n\n:host.modal-move.show .search {\n  pointer-events: auto;\n  opacity: 1; }\n  :host.modal-move.show .search button {\n    opacity: 1; }\n  :host.modal-move.show .search form {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n  :host.modal-move.show .search input {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n    transition-duration: 0.5s; }\n\n@media screen and (max-width: 40rem) {\n  :host.modal-move span {\n    text-align: left; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.modal-zoomin.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/\n:host button {\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  border: none;\n  background: none; }\n  :host button:focus {\n    box-shadow: none;\n    outline: none; }\n\n:host input {\n  border-top: 0;\n  border-right: 0;\n  border-left: 0;\n  background: transparent;\n  border-radius: 0;\n  line-height: 1;\n  display: inline-block;\n  box-sizing: border-box;\n  padding: 0.05rem 0;\n  -webkit-appearance: none; }\n  :host input:focus {\n    outline: none; }\n  :host input::-webkit-input-placeholder {\n    opacity: 0.3; }\n  :host input:-ms-input-placeholder {\n    opacity: 0.3; }\n  :host input::placeholder {\n    opacity: 0.3; }\n\n:host span {\n  font-size: 90%;\n  font-weight: bold;\n  display: block;\n  width: 75%;\n  margin: 0 auto;\n  padding: 0.85rem 0;\n  text-align: right; }\n\n:host.modal-zoomin .wrapper {\n  display: block; }\n\n:host.modal-zoomin .search {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  text-align: center;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.5s; }\n  :host.modal-zoomin .search::before, :host.modal-zoomin .search::after {\n    content: '';\n    position: absolute;\n    width: calc(100% + 15px);\n    height: calc(100% + 15px);\n    pointer-events: none; }\n  :host.modal-zoomin .search::before {\n    top: 0;\n    left: 0;\n    border-right-width: 0;\n    border-bottom-width: 0;\n    -webkit-transform: translate3d(-15px, -15px, 0);\n            transform: translate3d(-15px, -15px, 0); }\n  :host.modal-zoomin .search::after {\n    right: 0;\n    bottom: 0;\n    border-top-width: 0;\n    border-left-width: 0;\n    -webkit-transform: translate3d(15px, 15px, 0);\n            transform: translate3d(15px, 15px, 0); }\n  :host.modal-zoomin .search button {\n    position: absolute;\n    top: 3rem;\n    right: 3rem;\n    font-size: 2.5rem; }\n  :host.modal-zoomin .search input {\n    font-size: 10vw;\n    width: 75%; }\n  :host.modal-zoomin .search button {\n    opacity: 0;\n    -webkit-transform: scale3d(0.8, 0.8, 1);\n            transform: scale3d(0.8, 0.8, 1);\n    transition: opacity 0.5s, -webkit-transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s; }\n  :host.modal-zoomin .search form {\n    opacity: 0;\n    -webkit-transform: scale3d(0.8, 0.8, 1);\n            transform: scale3d(0.8, 0.8, 1);\n    transition: opacity 0.5s, -webkit-transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s; }\n\n:host.modal-zoomin.show .search {\n  pointer-events: auto;\n  opacity: 1; }\n  :host.modal-zoomin.show .search::before, :host.modal-zoomin.show .search::after {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    transition: -webkit-transform 0.5s;\n    transition: transform 0.5s;\n    transition: transform 0.5s, -webkit-transform 0.5s; }\n  :host.modal-zoomin.show .search button {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n  :host.modal-zoomin.show .search form {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n\n@media screen and (max-width: 40rem) {\n  :host.modal-zoomin form {\n    margin: 5rem 0 1rem; }\n  :host.modal-zoomin span {\n    text-align: left; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host .search-wrap {\n  margin: 5px; }\n\n:host button {\n  font-size: 2.5rem;\n  margin: 0 auto;\n  padding: 0;\n  cursor: pointer;\n  border: none;\n  background: none; }\n  :host button:focus {\n    box-shadow: none;\n    outline: none; }\n\n:host.simple-search .search-wrap {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  transition: width 0.3s ease;\n  width: 2rem;\n  overflow: hidden; }\n\n:host.simple-search.show .search-wrap {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 18rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/search/styles/search.component.simple-search.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*/\n:host.simple-search .wrapper {\n  opacity: 0; }\n  :host.simple-search .wrapper button, :host.simple-search .wrapper span {\n    display: none; }\n\n:host.simple-search.show .wrapper {\n  opacity: 1; }\n  :host.simple-search.show .wrapper .search {\n    background: none; }\n    :host.simple-search.show .wrapper .search input {\n      margin-left: 1rem;\n      width: 15rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSharedModule; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NgaSharedModule = (function () {
    function NgaSharedModule() {
    }
    return NgaSharedModule;
}());
NgaSharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* CommonModule */],
            // TODO: probably we don't need FormsModule in SharedModule
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */],
        ],
    })
], NgaSharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/sidebar/sidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  overflow: hidden;\n  transition: width 0.2s;\n  z-index: 1;\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0; }\n  :host > .scrollable {\n    transition: width 0.2s; }\n  :host.right {\n    -webkit-box-ordinal-group: 5;\n        -ms-flex-order: 4;\n            order: 4;\n    margin-right: 0;\n    margin-left: auto; }\n  :host.fixed {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0; }\n    :host.fixed.right {\n      right: 0; }\n  :host > .scrollable {\n    overflow-y: auto; }\n  :host /deep/ nga-sidebar-footer {\n    margin-top: auto;\n    display: block; }\n  :host /deep/ nga-sidebar-header {\n    display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/sidebar/sidebar.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NgaSidebarHeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaSidebarContentComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NgaSidebarFooterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSidebarComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
var NgaSidebarHeaderComponent = (function () {
    function NgaSidebarHeaderComponent() {
    }
    return NgaSidebarHeaderComponent;
}());
NgaSidebarHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-sidebar-header',
        template: "\n    <ng-content></ng-content>\n  ",
    })
], NgaSidebarHeaderComponent);

/**
 * Sidebar content container.
 *
 * Placeholder which contains a sidebar main content.
 */
var NgaSidebarContentComponent = (function () {
    function NgaSidebarContentComponent() {
    }
    return NgaSidebarContentComponent;
}());
NgaSidebarContentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-sidebar-content',
        template: "\n    <ng-content></ng-content>\n  ",
    })
], NgaSidebarContentComponent);

/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
var NgaSidebarFooterComponent = (function () {
    function NgaSidebarFooterComponent() {
    }
    return NgaSidebarFooterComponent;
}());
NgaSidebarFooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-sidebar-footer',
        template: "\n    <ng-content></ng-content>\n  ",
    })
], NgaSidebarFooterComponent);

/**
 * Main sidebar component.
 *
 * Sidebar can be place on the left or right side of the layout, can be fixed (shown above the content)
 * or can push the layout when opened.
 *
 * @styles Available component styles
 *
 * $nga-sidebar-foreground: $nga-foreground-inverse !default;
 * $nga-sidebar-background: $nga-background-inverse !default;
 * $nga-sidebar-height: 100vh !default;
 * $nga-sidebar-width: 12rem !default;
 * $nga-sidebar-width-compact: 4rem !default;
 * $nga-sidebar-padding: $nga-padding !default;
 * $nga-sidebar-header-height: 3.5rem !default;
 * $nga-sidebar-footer-height: 3.5rem !default;
 *
 * @example Min sidebar example
 *
 * ```
 * <nga-sidebar><nga-sidebar-content>Sidebar content</nga-sidebar-content></nga-sidebar>
 * ```
 *
 * @example Fixed sidebar
 *
 * Example of fixed sidebar located on the left side, initially collapsed.
 *
 * ```
 * <nga-sidebar left fixed state="collapsed">
 *  <nga-sidebar-header>Header</nga-sidebar-header>
 *  <nga-sidebar-content>
 *    Menu or another component here
 *  </nga-sidebar-content>
 *  <nga-sidebar-footer>
 *    Footer components here
 *  </nga-sidebar-footer>
 * </nga-sidebar>
 * ```
 */
var NgaSidebarComponent = NgaSidebarComponent_1 = (function () {
    function NgaSidebarComponent(sidebarService) {
        this.sidebarService = sidebarService;
        this.fixedValue = false;
        this.rightValue = false;
        this.leftValue = false;
    }
    Object.defineProperty(NgaSidebarComponent.prototype, "expanded", {
        // TODO: rename stateValue to state (take a look to the card component)
        get: function () {
            return this.stateValue === NgaSidebarComponent_1.STATE_EXPANDED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSidebarComponent.prototype, "collapsed", {
        get: function () {
            return this.stateValue === NgaSidebarComponent_1.STATE_COLLAPSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSidebarComponent.prototype, "compacted", {
        get: function () {
            return this.stateValue === NgaSidebarComponent_1.STATE_COMPACTED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSidebarComponent.prototype, "right", {
        /**
         * Places sidebar on the left side
         * @type {boolean}
         */
        set: function (val) {
            this.rightValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSidebarComponent.prototype, "left", {
        /**
         * Places sidebar on the right side
         * @type {boolean}
         */
        set: function (val) {
            this.leftValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSidebarComponent.prototype, "fixed", {
        /**
         * Makes sidebar fixed (shown above the layout content)
         * @type {boolean}
         */
        set: function (val) {
            this.fixedValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaSidebarComponent.prototype, "state", {
        /**
         * Initial sidebar state, `expanded`|`collapsed`|`compacted`
         * @type {string}
         */
        set: function (val) {
            this.stateValue = val;
        },
        enumerable: true,
        configurable: true
    });
    NgaSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toggleSubscription = this.sidebarService.onToggle()
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.toggle(data.compact);
            }
        });
        this.expandSubscription = this.sidebarService.onExpand()
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.expand();
            }
        });
        this.collapseSubscription = this.sidebarService.onCollapse()
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.collapse();
            }
        });
    };
    NgaSidebarComponent.prototype.ngOnDestroy = function () {
        this.toggleSubscription.unsubscribe();
        this.expandSubscription.unsubscribe();
        this.collapseSubscription.unsubscribe();
    };
    /**
     * Some Static method
     * // TODO: remove this
     *
     * @param {string} test
     * @param {any} anotherOne
     * @returns {number}
     */
    NgaSidebarComponent.someTestMethod = function (test, anotherOne) {
        return 1;
    };
    /**
     * Returns some value
     * // TODO: remove this
     *
     * @returns number
     */
    NgaSidebarComponent.prototype.returnSomeValue = function () {
        return 1;
    };
    /**
     * Collapses the sidebar
     */
    NgaSidebarComponent.prototype.collapse = function () {
        this.state = NgaSidebarComponent_1.STATE_COLLAPSED;
    };
    /**
     * Expands the sidebar
     */
    NgaSidebarComponent.prototype.expand = function () {
        this.state = NgaSidebarComponent_1.STATE_EXPANDED;
    };
    /**
     * Compacts the sidebar (minimizes)
     */
    NgaSidebarComponent.prototype.compact = function () {
        this.state = NgaSidebarComponent_1.STATE_COMPACTED;
    };
    /**
     * Toggles sidebar state (expanded|collapsed|compacted)
     * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
     * otherwise - between expanded & collapsed. False by default.
     *
     * @example Toggle sidebar state
     *
     * ```
     * this.sidebar.toggle(true);
     * ```
     */
    NgaSidebarComponent.prototype.toggle = function (compact) {
        if (compact === void 0) { compact = false; }
        var closedStates = [NgaSidebarComponent_1.STATE_COMPACTED, NgaSidebarComponent_1.STATE_COLLAPSED];
        if (compact) {
            this.state = closedStates.indexOf(this.stateValue) >= 0 ?
                NgaSidebarComponent_1.STATE_EXPANDED : NgaSidebarComponent_1.STATE_COMPACTED;
        }
        else {
            this.state = closedStates.indexOf(this.stateValue) >= 0 ?
                NgaSidebarComponent_1.STATE_EXPANDED : NgaSidebarComponent_1.STATE_COLLAPSED;
        }
    };
    return NgaSidebarComponent;
}());
NgaSidebarComponent.STATE_EXPANDED = 'expanded';
NgaSidebarComponent.STATE_COLLAPSED = 'collapsed';
NgaSidebarComponent.STATE_COMPACTED = 'compacted';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.fixed'),
    __metadata("design:type", Boolean)
], NgaSidebarComponent.prototype, "fixedValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.right'),
    __metadata("design:type", Boolean)
], NgaSidebarComponent.prototype, "rightValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.left'),
    __metadata("design:type", Boolean)
], NgaSidebarComponent.prototype, "leftValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.expanded'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSidebarComponent.prototype, "expanded", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.collapsed'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSidebarComponent.prototype, "collapsed", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.compacted'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaSidebarComponent.prototype, "compacted", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaSidebarComponent.prototype, "right", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaSidebarComponent.prototype, "left", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaSidebarComponent.prototype, "fixed", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NgaSidebarComponent.prototype, "state", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaSidebarComponent.prototype, "tag", void 0);
NgaSidebarComponent = NgaSidebarComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-sidebar',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/sidebar/sidebar.component.scss")],
        template: "\n    <div class=\"scrollable\">\n      <ng-content select=\"nga-sidebar-header\"></ng-content>\n      <div class=\"main-container\">\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\"nga-sidebar-footer\"></ng-content>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__sidebar_service__["a" /* NgaSidebarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sidebar_service__["a" /* NgaSidebarService */]) === "function" && _a || Object])
], NgaSidebarComponent);

var NgaSidebarComponent_1, _a;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/sidebar/sidebar.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sidebar_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/sidebar/sidebar.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSidebarModule; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NGA_SIDEBAR_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__sidebar_component__["a" /* NgaSidebarComponent */],
    __WEBPACK_IMPORTED_MODULE_2__sidebar_component__["b" /* NgaSidebarContentComponent */],
    __WEBPACK_IMPORTED_MODULE_2__sidebar_component__["c" /* NgaSidebarFooterComponent */],
    __WEBPACK_IMPORTED_MODULE_2__sidebar_component__["d" /* NgaSidebarHeaderComponent */],
];
var NGA_SIDEBAR_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_3__sidebar_service__["a" /* NgaSidebarService */],
];
var NgaSidebarModule = NgaSidebarModule_1 = (function () {
    function NgaSidebarModule() {
    }
    NgaSidebarModule.forRoot = function () {
        return {
            ngModule: NgaSidebarModule_1,
            providers: NGA_SIDEBAR_PROVIDERS.slice(),
        };
    };
    return NgaSidebarModule;
}());
NgaSidebarModule = NgaSidebarModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: NGA_SIDEBAR_COMPONENTS.slice(),
        exports: NGA_SIDEBAR_COMPONENTS.slice(),
    })
], NgaSidebarModule);

var NgaSidebarModule_1;
//# sourceMappingURL=sidebar.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/sidebar/sidebar.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_publish__ = __webpack_require__("./node_modules/rxjs/add/operator/publish.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_publish__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSidebarService; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/**
 * Sidebar service.
 *
 * Root module service to control the sidebar from any part of the app.
 */
var NgaSidebarService = (function () {
    function NgaSidebarService() {
        this.toggle$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.expand$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.collapse$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    /**
     * Subscribe to toggle events
     *
     * @returns Observable<{ compact: boolean, tag: string }>
     */
    NgaSidebarService.prototype.onToggle = function () {
        return this.toggle$.publish().refCount();
    };
    /**
     * Subscribe to expand events
     * @returns Observable<{ tag: string }>
     */
    NgaSidebarService.prototype.onExpand = function () {
        return this.expand$.publish().refCount();
    };
    /**
     * Subscribe to collapse evens
     * @returns Observable<{ tag: string }>
     */
    NgaSidebarService.prototype.onCollapse = function () {
        return this.collapse$.publish().refCount();
    };
    /**
     * Toggle a sidebar
     * @param boolean compact
     * @param tag tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    NgaSidebarService.prototype.toggle = function (compact, tag) {
        if (compact === void 0) { compact = false; }
        this.toggle$.next({ compact: compact, tag: tag });
    };
    /**
     * Expands a sidebar
     * @param tag tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    NgaSidebarService.prototype.expand = function (tag) {
        this.expand$.next({ tag: tag });
    };
    /**
     * Collapses a sidebar
     * @param {tag} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    NgaSidebarService.prototype.collapse = function (tag) {
        this.collapse$.next({ tag: tag });
    };
    return NgaSidebarService;
}());
NgaSidebarService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], NgaSidebarService);

//# sourceMappingURL=sidebar.service.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/tabset/tabset.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\nul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  list-style-type: none;\n  margin: 0; }\n  ul li {\n    cursor: pointer;\n    margin-bottom: -1px;\n    text-align: center; }\n    ul li.active a::before {\n      display: block; }\n    ul li a {\n      position: relative;\n      text-decoration: none;\n      display: inline-block; }\n      ul li a::before {\n        display: none;\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 6px;\n        border-radius: 3px;\n        bottom: -2px;\n        left: 0; }\n\n:host.full-width ul li {\n  width: 100%; }\n\n:host /deep/ nga-tab {\n  display: none; }\n  :host /deep/ nga-tab.content-active {\n    display: block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/tabset/tabset.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NgaTabComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaTabsetComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NgaTabComponent = (function () {
    function NgaTabComponent() {
        this.activeValue = false;
    }
    Object.defineProperty(NgaTabComponent.prototype, "active", {
        get: function () {
            return this.activeValue;
        },
        set: function (val) {
            this.activeValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    return NgaTabComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaTabComponent.prototype, "tabTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaTabComponent.prototype, "route", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.content-active'),
    __metadata("design:type", Boolean)
], NgaTabComponent.prototype, "activeValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], NgaTabComponent.prototype, "active", null);
NgaTabComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-tab',
        template: "\n    <ng-content></ng-content>\n  ",
    })
], NgaTabComponent);

var NgaTabsetComponent = (function () {
    function NgaTabsetComponent(route) {
        this.route = route;
        this.fullWidthValue = false;
        this.routes = false;
        this.changeTab = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
    }
    Object.defineProperty(NgaTabsetComponent.prototype, "fullWidth", {
        set: function (val) {
            this.fullWidthValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    NgaTabsetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var activeTab = _this.tabs.find(function (tab) { return _this.routes ? tab.route === params.tab : tab.active; });
            _this.selectTab(activeTab || _this.tabs.first);
        });
    };
    NgaTabsetComponent.prototype.selectTab = function (selectedTab) {
        this.tabs.forEach(function (tab) { return tab.active = tab === selectedTab; });
        this.changeTab.emit(selectedTab);
    };
    return NgaTabsetComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* ContentChildren */])(NgaTabComponent),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* QueryList */]) === "function" && _a || Object)
], NgaTabsetComponent.prototype, "tabs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.full-width'),
    __metadata("design:type", Boolean)
], NgaTabsetComponent.prototype, "fullWidthValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaTabsetComponent.prototype, "fullWidth", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean)
], NgaTabsetComponent.prototype, "routes", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaTabsetComponent.prototype, "changeTab", void 0);
NgaTabsetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-tabset',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/tabset/tabset.component.scss")],
        template: "\n    <ul>\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"selectTab(tab)\"\n          [class.active]=\"tab.active\">\n        <a href (click)=\"$event.preventDefault()\">{{ tab.tabTitle }}</a>\n      </li>\n    </ul>\n    <ng-content select=\"nga-tab\"></ng-content>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* ActivatedRoute */]) === "function" && _b || Object])
], NgaTabsetComponent);

var _a, _b;
//# sourceMappingURL=tabset.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/tabset/tabset.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabset_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/tabset/tabset.component.ts");
/* unused harmony export NgaTabsetModule */
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NGA_TABSET_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__tabset_component__["a" /* NgaTabsetComponent */],
    __WEBPACK_IMPORTED_MODULE_2__tabset_component__["b" /* NgaTabComponent */],
];
var NgaTabsetModule = (function () {
    function NgaTabsetModule() {
    }
    return NgaTabsetModule;
}());
NgaTabsetModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: NGA_TABSET_COMPONENTS.slice(),
        exports: NGA_TABSET_COMPONENTS.slice(),
    })
], NgaTabsetModule);

//# sourceMappingURL=tabset.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/user/user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-container\" (click)=\"toggleMenu()\" [ngClass]=\"{'with-menu' : hasMenu()}\">\n  <div *ngIf=\"picture\" class=\"user-picture image\" style.background-image=\"url({{picture}})\"></div>\n  <div *ngIf=\"!picture\" class=\"user-picture background\" [style.background-color]=\"color\">\n    <ng-container *ngIf=\"showInitialsValue\">\n      {{ getInitials() }}\n    </ng-container>\n  </div>\n\n  <div class=\"info-container\">\n    <div *ngIf=\"showNameValue && name\" class=\"user-name\">{{ name }}</div>\n    <div *ngIf=\"showTitleValue && title\" class=\"user-title\">{{ title }}</div>\n  </div>\n\n  <div *ngIf=\"hasMenu()\"\n        [ngStyle]=\"{display: isMenuShown ? 'block' : 'none'}\" class=\"user-context-menu\">\n    <ul>\n      <li class=\"arrow\"></li>\n      <li *ngFor=\"let item of menu\">\n        <span *ngIf=\"item.icon\" class=\"item-icon {{ item.icon  }}\"></span>\n        <a *ngIf=\"item.link && !item.url\" [routerLink]=\"item.link\" [attr.target]=\"item.target\">{{ item.title }}</a>\n        <a *ngIf=\"item.url && !item.link\" [attr.href]=\"item.url\" [attr.target]=\"item.target\">{{ item.title }}</a>\n        <a *ngIf=\"!item.link && !item.url\" href=\"#\" [attr.target]=\"item.target\"\n                                                    (click)=\"itemClick($event, item)\">{{ item.title }}</a>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/user/user.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.user-container {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .user-container.with-menu {\n    cursor: pointer; }\n\n.user-picture {\n  border-radius: 50%;\n  -ms-flex-negative: 0;\n      flex-shrink: 0; }\n  .user-picture.image {\n    background-size: cover;\n    background-repeat: no-repeat; }\n  .user-picture.background {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n\n.user-title {\n  font-size: 0.75rem; }\n\n.info-container {\n  margin-left: 0.5rem; }\n\n.user-context-menu {\n  position: absolute;\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  left: 50%;\n  z-index: 1000;\n  top: calc(100% + 10px);\n  background-clip: padding-box;\n  border-radius: 5px;\n  font-size: 0.875rem;\n  line-height: 1.5rem; }\n  .user-context-menu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n    .user-context-menu ul li {\n      display: block;\n      white-space: nowrap; }\n      .user-context-menu ul li > a {\n        padding: 0.25rem 3rem;\n        display: block; }\n      .user-context-menu ul li:nth-child(2) > a {\n        padding-top: 0.75rem; }\n      .user-context-menu ul li:last-child > a {\n        padding-bottom: 0.75rem; }\n      .user-context-menu ul li.arrow {\n        position: absolute;\n        -webkit-transform: translate(-50%, 0);\n                transform: translate(-50%, 0);\n        left: 50%;\n        top: -22px;\n        width: 0;\n        height: 0;\n        border: 11px solid transparent; }\n        .user-context-menu ul li.arrow::after {\n          position: absolute;\n          content: ' ';\n          width: 0;\n          height: 0;\n          top: -9px;\n          left: 0;\n          margin-left: -10px;\n          display: block;\n          border: 10px solid transparent; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/user/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/helpers.ts");
/* unused harmony export NgaUserMenuItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaUserComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
* TODO
*
* I want to have capability to pass custom actions in menu.
* */
var NgaUserMenuItem = (function () {
    function NgaUserMenuItem() {
    }
    return NgaUserMenuItem;
}());

/**
 * Represents a component showing a user avatar (picture) with a user name on the right.
 *
 * Can be used as a user profile link or can bring a user context menu.
 *
 * @theme
 * $nga-user-size-small: 1.5rem !default;
 * $nga-user-size-medium: 3rem !default;
 * $nga-user-size-large: 4rem !default;
 * $nga-user-picture-background: $nga-color-gray !default;
 * $nga-user-menu-border: $nga-border-color !default;
 */
var NgaUserComponent = NgaUserComponent_1 = (function () {
    function NgaUserComponent(el) {
        this.el = el;
        /**
         * Specifies a name to be shown on the right of a user picture
         * @type string
         */
        this.name = 'Anonymous';
        /**
         * List of menu items for a user context menu (shown when clicked)
         * @type NgaUserMenuItem[]
         */
        this.menu = [];
        /**
         * Outputs when a context menu item is clicked
         * @type EventEmitter<NgaUserMenuItem>
         */
        this.menuClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* EventEmitter */]();
        this.showNameValue = true;
        this.showTitleValue = true;
        this.showInitialsValue = true;
        this.isMenuShown = false;
    }
    Object.defineProperty(NgaUserComponent.prototype, "small", {
        get: function () {
            return this.sizeValue === NgaUserComponent_1.SIZE_SMALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "medium", {
        get: function () {
            return this.sizeValue === NgaUserComponent_1.SIZE_MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "xmedium", {
        get: function () {
            return this.sizeValue === NgaUserComponent_1.SIZE_XMEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "large", {
        get: function () {
            return this.sizeValue === NgaUserComponent_1.SIZE_LARGE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "size", {
        /**
         * Size of the component, small|medium|large
         * @type string
         */
        set: function (val) {
            this.sizeValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "showName", {
        /**
         * Whether to show a user name or not
         * @type boolean
         */
        set: function (val) {
            this.showNameValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "showTitle", {
        /**
         * Whether to show a user title or not
         * @type boolean
         */
        set: function (val) {
            this.showTitleValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "showInitials", {
        /**
         * Whether to show a user initials (if no picture specified) or not
         * @type boolean
         */
        set: function (val) {
            this.showInitialsValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "onlyPicture", {
        /**
         * Whether to show only a picture or also show the name and title
         * @type boolean
         */
        set: function (val) {
            this.showNameValue = this.showTitleValue = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgaUserComponent.prototype, "inverse", {
        /**
         * Makes colors inverse based on current theme
         * @type boolean
         */
        set: function (val) {
            this.inverseValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* convertToBoolProperty */])(val);
        },
        enumerable: true,
        configurable: true
    });
    NgaUserComponent.prototype.itemClick = function (event, item) {
        this.menuClick.emit(item);
        return false;
    };
    /**
     * Toggles a context menu
     */
    NgaUserComponent.prototype.toggleMenu = function () {
        this.isMenuShown = !this.isMenuShown;
    };
    NgaUserComponent.prototype.hideMenu = function (event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.isMenuShown = false;
        }
    };
    NgaUserComponent.prototype.getInitials = function () {
        if (this.name) {
            var names = this.name.split(' ');
            return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
    };
    NgaUserComponent.prototype.hasMenu = function () {
        return this.menu && this.menu.length > 0;
    };
    return NgaUserComponent;
}());
// TODO: it makes sense use object instead of list of variables (or even enum)
/*
  static readonly SIZE = {
   SMALL: 'small',
   MEDIUM: 'medium',
   LARGE: 'large',
  };
 */
NgaUserComponent.SIZE_SMALL = 'small';
NgaUserComponent.SIZE_MEDIUM = 'medium';
NgaUserComponent.SIZE_XMEDIUM = 'xmedium';
NgaUserComponent.SIZE_LARGE = 'large';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.inverse'),
    __metadata("design:type", Boolean)
], NgaUserComponent.prototype, "inverseValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.small'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaUserComponent.prototype, "small", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.medium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaUserComponent.prototype, "medium", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.xmedium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaUserComponent.prototype, "xmedium", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.large'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgaUserComponent.prototype, "large", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaUserComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaUserComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaUserComponent.prototype, "picture", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], NgaUserComponent.prototype, "color", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Array)
], NgaUserComponent.prototype, "menu", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NgaUserComponent.prototype, "size", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaUserComponent.prototype, "showName", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaUserComponent.prototype, "showTitle", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaUserComponent.prototype, "showInitials", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaUserComponent.prototype, "onlyPicture", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgaUserComponent.prototype, "inverse", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
    __metadata("design:type", Object)
], NgaUserComponent.prototype, "menuClick", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* HostListener */])('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NgaUserComponent.prototype, "hideMenu", null);
NgaUserComponent = NgaUserComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'nga-user',
        styles: [__webpack_require__("../../ng2-admin/src/framework/theme/components/user/user.component.scss")],
        template: __webpack_require__("../../ng2-admin/src/framework/theme/components/user/user.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */]) === "function" && _a || Object])
], NgaUserComponent);

var NgaUserComponent_1, _a;
//# sourceMappingURL=user.component.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/components/user/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_component__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/user/user.component.ts");
/* unused harmony export NgaUserModule */
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NGA_USER_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__user_component__["a" /* NgaUserComponent */],
];
var NgaUserModule = (function () {
    function NgaUserModule() {
    }
    return NgaUserModule;
}());
NgaUserModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* NgaSharedModule */],
        ],
        declarations: NGA_USER_COMPONENTS.slice(),
        exports: NGA_USER_COMPONENTS.slice(),
    })
], NgaUserModule);

//# sourceMappingURL=user.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__theme_options__ = __webpack_require__("../../ng2-admin/src/framework/theme/theme.options.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__theme_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/theme.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__theme_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_theme_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/theme.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_spinner_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/spinner.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_card_card_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/card/card.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__components_card_card_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_layout_layout_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/layout/layout.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__components_layout_layout_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_menu_menu_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__components_menu_menu_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_menu_menu_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.service.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_7__components_menu_menu_service__["a"]; });
/* unused harmony reexport NgaMenuOptions */
/* unused harmony reexport NgaMenuItem */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_route_tabset_route_tabset_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/route-tabset/route-tabset.module.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_sidebar_sidebar_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/sidebar/sidebar.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_9__components_sidebar_sidebar_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_sidebar_sidebar_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/sidebar/sidebar.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_tabset_tabset_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/tabset/tabset.module.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_user_user_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/user/user.module.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_actions_actions_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/actions/actions.module.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_search_search_module__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/search/search.module.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_search_search_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/search/search.service.ts");
/* unused harmony namespace reexport */
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/services/spinner.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaSpinnerService; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NgaSpinnerService = (function () {
    function NgaSpinnerService() {
        this.loaders = [];
        this.selector = 'nga-global-spinner';
    }
    NgaSpinnerService.prototype.registerLoader = function (method) {
        this.loaders.push(method);
    };
    NgaSpinnerService.prototype.clear = function () {
        this.loaders = [];
    };
    NgaSpinnerService.prototype.load = function () {
        this.showSpinner();
        this.executeAll();
    };
    NgaSpinnerService.prototype.executeAll = function (done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        Promise.all(this.loaders).then(function (values) {
            _this.hideSpinner();
            done.call(null, values);
        })
            .catch(function (error) {
            // TODO: Promise.reject
            console.error(error);
        });
    };
    // TODO is there any better way of doing this?
    NgaSpinnerService.prototype.showSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'block';
        }
    };
    NgaSpinnerService.prototype.hideSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'none';
        }
    };
    NgaSpinnerService.prototype.getSpinnerElement = function () {
        return document.getElementById(this.selector);
    };
    return NgaSpinnerService;
}());
NgaSpinnerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], NgaSpinnerService);

//# sourceMappingURL=spinner.service.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/services/theme.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("./node_modules/rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_publish__ = __webpack_require__("./node_modules/rxjs/add/operator/publish.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_publish__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_options__ = __webpack_require__("../../ng2-admin/src/framework/theme/theme.options.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaThemeService; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var NgaThemeService = (function () {
    function NgaThemeService(options) {
        this.options = options;
        this.themeChanges$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.appendToLayoutTop$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.createLayoutTop$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.appendLayoutClass$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.removeLayoutClass$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        if (options && options.name) {
            this.changeTheme(options.name);
        }
    }
    NgaThemeService.prototype.changeTheme = function (name) {
        this.themeChanges$.next({ name: name, previous: this.currentTheme });
        this.currentTheme = name;
    };
    NgaThemeService.prototype.appendToLayoutTop = function (component) {
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.appendToLayoutTop$.next({ component: component, listener: observable });
        return observable.asObservable();
    };
    NgaThemeService.prototype.clearLayoutTop = function () {
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.createLayoutTop$.next({ listener: observable });
        return observable.asObservable();
    };
    NgaThemeService.prototype.onThemeChange = function () {
        return this.themeChanges$.publish().refCount();
    };
    NgaThemeService.prototype.onAppendToTop = function () {
        return this.appendToLayoutTop$.publish().refCount();
    };
    NgaThemeService.prototype.onClearLayoutTop = function () {
        return this.createLayoutTop$.publish().refCount();
    };
    NgaThemeService.prototype.appendLayoutClass = function (className) {
        this.appendLayoutClass$.next(className);
    };
    NgaThemeService.prototype.onAppendLayoutClass = function () {
        return this.appendLayoutClass$.publish().refCount();
    };
    NgaThemeService.prototype.removeLayoutClass = function (className) {
        this.removeLayoutClass$.next(className);
    };
    NgaThemeService.prototype.onRemoveLayoutClass = function () {
        return this.removeLayoutClass$.publish().refCount();
    };
    return NgaThemeService;
}());
NgaThemeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__theme_options__["a" /* ngaThemeOptionsToken */])),
    __metadata("design:paramtypes", [Object])
], NgaThemeService);

//# sourceMappingURL=theme.service.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/theme.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_options__ = __webpack_require__("../../ng2-admin/src/framework/theme/theme.options.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_theme_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/theme.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/services/spinner.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgaThemeModule; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NgaThemeModule = NgaThemeModule_1 = (function () {
    function NgaThemeModule() {
    }
    // TODO: check the options (throw exception?)
    NgaThemeModule.forRoot = function (ngaThemeOptions) {
        return {
            ngModule: NgaThemeModule_1,
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */],
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3__theme_options__["a" /* ngaThemeOptionsToken */], useValue: ngaThemeOptions || {} },
                __WEBPACK_IMPORTED_MODULE_4__services_theme_service__["a" /* NgaThemeService */],
                __WEBPACK_IMPORTED_MODULE_5__services_spinner_service__["a" /* NgaSpinnerService */],
            ],
        };
    };
    return NgaThemeModule;
}());
NgaThemeModule = NgaThemeModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */],
        ],
    })
], NgaThemeModule);

var NgaThemeModule_1;
//# sourceMappingURL=theme.module.js.map

/***/ }),

/***/ "../../ng2-admin/src/framework/theme/theme.options.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ngaThemeOptionsToken; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

var ngaThemeOptionsToken = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* InjectionToken */]('NGA_THEME_OPTIONS');
//# sourceMappingURL=theme.options.js.map

/***/ }),

/***/ "./ async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./ async recursive";

/***/ }),

/***/ "./app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_loader_styles_styles_scss__ = __webpack_require__("./node_modules/style-loader/index.js!./app/styles/styles.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_loader_styles_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_style_loader_styles_styles_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgdAppComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var NgdAppComponent = (function () {
    function NgdAppComponent() {
    }
    return NgdAppComponent;
}());
NgdAppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'ngd-app-root',
        styles: [__webpack_require__("./app/app.component.scss")],
        template: "\n    <router-outlet></router-outlet>\n  ",
    })
], NgdAppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__ = __webpack_require__("../../ng2-admin/src/framework/theme/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("./app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__("./app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__homepage_homepage_component__ = __webpack_require__("./app/homepage/homepage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__docs_docs_service__ = __webpack_require__("./app/docs/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__docs_docs_component__ = __webpack_require__("./app/docs/docs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__docs_page_page_component__ = __webpack_require__("./app/docs/page/page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__docs_page_blocks_react_markdown_block_component__ = __webpack_require__("./app/docs/page/blocks/react-markdown-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__docs_page_blocks_react_description_block_component__ = __webpack_require__("./app/docs/page/blocks/react-description-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__docs_page_blocks_react_examples_block_component__ = __webpack_require__("./app/docs/page/blocks/react-examples-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__docs_page_blocks_react_props_block_component__ = __webpack_require__("./app/docs/page/blocks/react-props-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__docs_page_blocks_react_methods_block_component__ = __webpack_require__("./app/docs/page/blocks/react-methods-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__docs_page_blocks_react_styles_block_component__ = __webpack_require__("./app/docs/page/blocks/react-styles-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__docs_page_blocks_react_properties_block_component__ = __webpack_require__("./app/docs/page/blocks/react-properties-block.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__docs_utils_react_description_directive__ = __webpack_require__("./app/docs/utils/react-description.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__docs_page_blocks_react_demo_phone_component__ = __webpack_require__("./app/docs/page/blocks/react-demo-phone.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__docs_utils_code_highlighter_component__ = __webpack_require__("./app/docs/utils/code-highlighter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_header_react_header_component__ = __webpack_require__("./app/components/header/react-header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_footer_react_footer_component__ = __webpack_require__("./app/components/footer/react-footer.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["a" /* NgaThemeModule */],
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["b" /* NgaSidebarModule */],
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["c" /* NgaCardModule */],
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["d" /* NgaLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["e" /* NgaMenuModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["a" /* NgaThemeModule */].forRoot({ name: 'default' }),
            __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme__["b" /* NgaSidebarModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* routes */], { useHash: true }),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* NgdAppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__homepage_homepage_component__["a" /* ReactHomepageComponent */],
            __WEBPACK_IMPORTED_MODULE_10__docs_docs_component__["a" /* ReactDocsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__docs_page_page_component__["a" /* NgdPageComponent */],
            __WEBPACK_IMPORTED_MODULE_12__docs_page_blocks_react_markdown_block_component__["a" /* ReactMarkdownComponent */],
            __WEBPACK_IMPORTED_MODULE_13__docs_page_blocks_react_description_block_component__["a" /* ReactDescriptionBlockComponent */],
            __WEBPACK_IMPORTED_MODULE_14__docs_page_blocks_react_examples_block_component__["a" /* ReactExamplesBlockComponent */],
            __WEBPACK_IMPORTED_MODULE_15__docs_page_blocks_react_props_block_component__["a" /* ReactPropsBlockComponent */],
            __WEBPACK_IMPORTED_MODULE_16__docs_page_blocks_react_methods_block_component__["a" /* ReactMethodsBlockComponent */],
            __WEBPACK_IMPORTED_MODULE_17__docs_page_blocks_react_styles_block_component__["a" /* ReactStylesBlockComponent */],
            __WEBPACK_IMPORTED_MODULE_18__docs_page_blocks_react_properties_block_component__["a" /* ReactPropertiesBlockComponent */],
            __WEBPACK_IMPORTED_MODULE_19__docs_utils_react_description_directive__["a" /* ReactDescriptionDirective */],
            __WEBPACK_IMPORTED_MODULE_20__docs_page_blocks_react_demo_phone_component__["a" /* ReactDemoPhoneComponent */],
            __WEBPACK_IMPORTED_MODULE_21__docs_utils_code_highlighter_component__["a" /* CodeHighlighterComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_header_react_header_component__["a" /* ReactHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_footer_react_footer_component__["a" /* ReactFooterComponent */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__docs_docs_service__["a" /* DocsService */]],
        entryComponents: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* NgdAppComponent */]],
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__homepage_homepage_component__ = __webpack_require__("./app/homepage/homepage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__docs_page_page_component__ = __webpack_require__("./app/docs/page/page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__docs_docs_component__ = __webpack_require__("./app/docs/docs.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */



var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: __WEBPACK_IMPORTED_MODULE_0__homepage_homepage_component__["a" /* ReactHomepageComponent */],
    },
    {
        path: 'docs',
        component: __WEBPACK_IMPORTED_MODULE_2__docs_docs_component__["a" /* ReactDocsComponent */],
        children: [{
                path: ':page',
                component: __WEBPACK_IMPORTED_MODULE_1__docs_page_page_component__["a" /* NgdPageComponent */],
            },
            {
                path: ':page/:sub-page',
                component: __WEBPACK_IMPORTED_MODULE_1__docs_page_page_component__["a" /* NgdPageComponent */],
            }],
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "./app/components/footer/react-footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nga-theme-default) {\n  max-width: 1312px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: center; }\n  :host-context(.nga-theme-default) a img {\n    height: 41px; }\n  :host-context(.nga-theme-default) a:nth-child(2) img {\n    margin: 32.5px; }\n  :host-context(.nga-theme-default) a.twitter img {\n    height: 35px; }\n  @media screen and (max-width: 970px) {\n    :host-context(.nga-theme-default) p {\n      font-size: 0.75rem; }\n    :host-context(.nga-theme-default) a img {\n      height: 30px; }\n    :host-context(.nga-theme-default) a:nth-child(2) img {\n      margin: 0 10px; } }\n  @media screen and (max-width: 600px) {\n    :host-context(.nga-theme-default) {\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: reverse;\n          -ms-flex-direction: column-reverse;\n              flex-direction: column-reverse; }\n      :host-context(.nga-theme-default) .socio {\n        display: none; }\n      :host-context(.nga-theme-default) p:last-child {\n        margin-bottom: 0; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/components/footer/react-footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ReactFooterComponent = (function () {
    function ReactFooterComponent() {
    }
    return ReactFooterComponent;
}());
ReactFooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-footer',
        styles: [__webpack_require__("./app/components/footer/react-footer.component.scss")],
        template: "\n      <div class=\"socio\">\n        <a href=\"https://github.com/akveo/react-native-ui-kitten\" target=\"_blank\">\n          <img src=\"assets/githubBigLogo.png\">\n        </a>\n        <a href=\"https://twitter.com/akveo_inc\" target=\"_blank\" class=\"twitter\">\n          <img src=\"assets/twitterLogoSilhouette.png\">\n        </a>\n        <a href=\"https://www.facebook.com/akveo\" target=\"_blank\">\n          <img src=\"assets/facebookLogo.png\">\n        </a>\n      </div>\n      <p>\n        \u00A9 2015-2017 Akveo LLC<br>\n        Documentation licensed under CC BY 4.0.\n      </p>\n      <p>\n        Powered by <b>React Native</b>\n      </p>\n  ",
    })
], ReactFooterComponent);

//# sourceMappingURL=react-footer.component.js.map

/***/ }),

/***/ "./app/components/header/react-header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nga-theme-default) {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  max-width: 1312px;\n  margin: auto;\n  padding: 0 1rem; }\n  :host-context(.nga-theme-default) .logo-container {\n    font-size: 30px; }\n    :host-context(.nga-theme-default) .logo-container a {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    :host-context(.nga-theme-default) .logo-container .logo {\n      display: inline-block;\n      background: url(" + __webpack_require__("./assets/logo.svg") + ") no-repeat center;\n      background-size: contain;\n      vertical-align: middle;\n      width: 65px;\n      height: 44px;\n      margin-right: 12px; }\n    :host-context(.nga-theme-default) .logo-container .svg-logo {\n      width: 65px;\n      height: 44px;\n      margin-right: 20px; }\n  :host-context(.nga-theme-default) .menu {\n    width: 320px;\n    margin: auto;\n    font-size: 20px;\n    font-weight: bold; }\n    :host-context(.nga-theme-default) .menu a {\n      position: relative;\n      display: inline-block;\n      height: 80px;\n      padding: 0 20px; }\n      :host-context(.nga-theme-default) .menu a.active-link::before {\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 4px;\n        background: rgba(255, 36, 31, 0.8);\n        border-radius: 2px;\n        transition: .3s ease-in-out;\n        bottom: 16px;\n        left: 0; }\n  :host-context(.nga-theme-default) .menu-icon {\n    display: none; }\n  :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu {\n    position: fixed;\n    top: 80px;\n    left: 0;\n    width: 100vw;\n    height: 0;\n    overflow: hidden;\n    background: white;\n    transition: height 0.3s ease-out; }\n    :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a:hover, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a:focus, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a:active {\n      color: rgba(0, 0, 0, 0.87);\n      font-weight: bold; }\n      :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a.active, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a:hover.active, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a:focus.active, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu a:active.active {\n        color: rgba(0, 0, 0, 0.87);\n        font-weight: bold; }\n    :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu > ul > li > a:first-child:not([ng-reflect-router-link]) {\n      pointer-events: none; }\n    :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu i {\n      display: none; }\n    :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu .menu-collapsed, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu .menu-expanded {\n      visibility: visible;\n      opacity: 1;\n      height: 100%; }\n      :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu .menu-collapsed a, :host-context(.nga-theme-default) /deep/ nga-menu.mobile-menu .menu-expanded a {\n        padding-left: 1rem;\n        font-weight: normal; }\n  @media screen and (max-width: 900px) {\n    :host-context(.nga-theme-default) .menu {\n      display: none; }\n    :host-context(.nga-theme-default) .menu-icon {\n      font-size: 40px;\n      display: block;\n      margin: 0 0 0 auto;\n      cursor: pointer; }\n    :host-context(.nga-theme-default) .mobile-menu.active {\n      height: calc(100vh - 80px);\n      overflow: auto; } }\n  @media screen and (max-width: 1140px) {\n    :host-context(.nga-theme-default) span {\n      display: none; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/components/header/react-header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__akveo_nga_theme_components_menu_menu_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__docs_docs_service__ = __webpack_require__("./app/docs/docs.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReactHeaderComponent = (function () {
    function ReactHeaderComponent(service, menuService, renderer) {
        this.service = service;
        this.menuService = menuService;
        this.renderer = renderer;
        this.isMenuActive = false;
        this.menuItems = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])([]);
        this.transparent = true;
    }
    ReactHeaderComponent.prototype.toggleMenu = function () {
        this.isMenuActive = !this.isMenuActive;
        this.isMenuActive ?
            this.renderer.addClass(document.body, 'scrolless') :
            this.renderer.removeClass(document.body, 'scrolless');
    };
    ReactHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuItems = this.service.getPreparedMenu([
            { title: 'Home', link: '/home' },
            { title: 'Docs', link: '/docs' }
        ]);
        this.structure = this.service.getPreparedStructure();
        this.menuSubscription = this.menuService.onItemSelect().subscribe(function (event) {
            if (_this.isMenuActive)
                _this.toggleMenu();
        });
    };
    ReactHeaderComponent.prototype.ngOnDestroy = function () {
        this.menuSubscription.unsubscribe();
    };
    return ReactHeaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* HostBinding */])('class.transparent'),
    __metadata("design:type", Boolean)
], ReactHeaderComponent.prototype, "transparent", void 0);
ReactHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-header',
        styles: [__webpack_require__("./app/components/header/react-header.component.scss")],
        template: "\n    <div class=\"logo-container ui-kitten\">\n      <a routerLink=\"/\">\n        <!--<i class=\"logo\"></i>-->\n        <svg class=\"svg-logo\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 773.93 522.63\"><defs><style>.cls-1,.cls-2{fill:none;stroke:#000;stroke-opacity:0.75;stroke-miterlimit:10;stroke-width:14px;}.cls-2{stroke-linecap:round;}</style></defs><title>Asset 16100</title><g id=\"Layer_2\" data-name=\"Layer 2\"><g id=\"Layer_1-2\" data-name=\"Layer 1\"><path class=\"cls-1\" d=\"M231.56,487a224.46,224.46,0,0,0-42.81-7.69,251.35,251.35,0,0,1-57.63-12.19l-.32-.11C99.07,456.5,63.85,448,37.38,426.54c-3.16-2.56-6.28-5.46-7.74-9.26-3-7.81,37.5-137.51,33.88-175.38-1.89-19.75-10.7-36.87-19.24-55C22.81,141.34,1.84,95.53,8.13,44.14,9.42,33.62,16.55,7,31.79,7,83.79,7,169.24,60.61,242,70.73h0a417.25,417.25,0,0,1,290,.14h0C604.69,60.81,690.19,7.33,742.19,7.33c15.24,0,22.34,26.64,23.62,37.17,6.24,51.39-14.77,97.18-36.29,142.73-9.85,20.84-17.58,52.39-18.82,55.29-7.24,17,36.44,167,33.45,174.77-1.46,3.8-4.57,6.7-7.74,9.26C709.95,448,674.73,456.5,643,467l-.32.11A261.68,261.68,0,0,1,589.08,479c-26,2.91-51.64,8.6-76.76,16l-17,5a390.1,390.1,0,0,1-217.75.38Z\"/><path class=\"cls-2\" d=\"M29.34,302.55c29,13,62.21,26.57,92.62,35.83\"/><path class=\"cls-2\" d=\"M19,338.74c26.19,11.77,59.56,25.31,87.05,33.68\"/><path class=\"cls-2\" d=\"M8.38,374.87c26.19,11.77,55.28,23.65,82.77,32\"/><path class=\"cls-2\" d=\"M736.83,303.73c-29,12.92-62.29,26.36-92.74,35.52\"/><path class=\"cls-2\" d=\"M747,340c-26.23,11.68-59.65,25.11-87.17,33.39\"/><path class=\"cls-2\" d=\"M757.55,376.12c-26.23,11.68-55.36,23.47-82.88,31.74\"/><path class=\"cls-1\" d=\"M387.25,282.73c27.85.09,44.33,9.46,65.16,22.1,19.06,11.57,41.33,26.75,64.52,26.75,24.49,0,102-38.12,108.94-62.07,5.68-19.54,2.65-44.51-6-63.53-6.38-13.94-22.42-21.59-35.65-27.56-62.74-28.27-128.34-41.79-196.9-43.58H387c-68.56,1.59-134.2,14.93-197,43-13.25,5.92-29.31,13.53-35.73,27.45-8.75,19-11.85,44-6.23,63.52,6.89,24,84.27,62.31,108.76,62.38,23.19.06,45.51-15.05,64.6-26.56,20.86-12.58,37.37-21.91,65.22-21.92Z\"/><path class=\"cls-1\" d=\"M635.49,118.82c2.41-13.6,29.69-14.64,79-62.73,2.78-2.72,17.55-20.33,25-18.69,7,1.56,5.41,17.83,5.34,21.55-.84,43.8-22.78,81.36-42.31,119.16-3.18,6.15-7.53,18.38-15.79,16.94-5.38-.94-15.85-1.31-26-54.08C656.26,118.19,633.67,129.06,635.49,118.82Z\"/><path class=\"cls-1\" d=\"M138.29,118c-2.35-13.58-29.66-14.76-78.77-63C56.74,52.25,42,34.58,34.62,36.2,27.56,37.73,29.15,54,29.2,57.73c.69,43.8,22.51,81.43,41.91,119.31,3.16,6.16,7.47,18.41,15.73,17,5.38-.92,15.85-1.26,26.2-54C117.52,117.28,140.06,128.22,138.29,118Z\"/><path class=\"cls-1\" d=\"M387.1,391c11.31,0,34.47-22.8,47.33-36.45a8.66,8.66,0,0,0-3.87-14.26c-11.25-3.27-28.22,1.24-44.13,1.44-17.31.22-33.69-3.83-44.43-.17a8.68,8.68,0,0,0-3.36,14.4C351.86,369,375.75,391,387.1,391Z\"/><path class=\"cls-2\" d=\"M382.72,391c0,20.7-15.3,37.49-34.17,37.49S314.39,411.7,314.39,391\"/><path class=\"cls-2\" d=\"M391.25,391c0,20.7,15.3,37.49,34.17,37.49S459.59,411.7,459.59,391\"/></g></g></svg>\n        UI kitten\n      </a>\n    </div>\n    <div class=\"menu\">\n      <a routerLink=\"/home\" routerLinkActive=\"active-link\">HOME</a>\n      <a routerLink=\"/docs\" routerLinkActive=\"active-link\">DOCUMENTATION</a>\n    </div>\n    <span> Need some help? Let us meow! \n      <a class=\"contact-us\" href=\"mailto:contact@akveo.com\"><b>contact@akveo.com</b></a>\n    </span>\n    <i class=\"menu-icon ion-navicon\" (click)=\"toggleMenu()\"></i>\n    <nga-menu class=\"mobile-menu\" [class.active]=\"isMenuActive\" [items]=\"menuItems\"></nga-menu>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__docs_docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__docs_docs_service__["a" /* DocsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__akveo_nga_theme_components_menu_menu_service__["a" /* NgaMenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__akveo_nga_theme_components_menu_menu_service__["a" /* NgaMenuService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */]) === "function" && _c || Object])
], ReactHeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=react-header.component.js.map

/***/ }),

/***/ "./app/docs/docs.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host .nga-theme-default nga-layout-header {\n  border-bottom: 1px solid #eee; }\n\n:host .nga-theme-default /deep/ .layout-container {\n  max-width: 1312px;\n  width: 100%;\n  margin: 1.5rem auto;\n  padding: 0 1rem; }\n  :host .nga-theme-default /deep/ .layout-container .content {\n    min-width: 0; }\n    :host .nga-theme-default /deep/ .layout-container .content nga-layout-column {\n      min-width: 0; }\n  :host .nga-theme-default /deep/ .layout-container nga-sidebar .scrollable {\n    height: calc(100vh - 80px - 1.5rem); }\n  :host .nga-theme-default /deep/ .layout-container nga-sidebar.right {\n    width: 17.5rem; }\n    :host .nga-theme-default /deep/ .layout-container nga-sidebar.right .scrollable {\n      width: 100%; }\n  :host .nga-theme-default /deep/ .layout-container nga-sidebar nga-menu > ul > li > a:first-child {\n    font-weight: bold;\n    cursor: default; }\n  :host .nga-theme-default /deep/ .layout-container nga-sidebar nga-menu a {\n    padding-left: 0; }\n    :host .nga-theme-default /deep/ .layout-container nga-sidebar nga-menu a.active {\n      font-weight: bold; }\n  :host .nga-theme-default /deep/ .layout-container nga-sidebar nga-menu i {\n    display: none; }\n  :host .nga-theme-default /deep/ .layout-container nga-sidebar nga-menu .menu-collapsed {\n    visibility: visible;\n    opacity: 1;\n    height: 100%; }\n\n@media screen and (max-width: 900px) {\n  :host .nga-theme-default nga-sidebar {\n    display: none; }\n  :host .nga-theme-default /deep/ .layout-container {\n    padding: 0; } }\n\n@media screen and (max-width: 1312px) {\n  :host .nga-theme-default nga-sidebar[right] {\n    display: none; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/docs/docs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__docs_service__ = __webpack_require__("./app/docs/docs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__akveo_nga_theme__ = __webpack_require__("../../ng2-admin/src/framework/theme/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme_components_menu_menu_service__ = __webpack_require__("../../ng2-admin/src/framework/theme/components/menu/menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactDocsComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReactDocsComponent = (function () {
    function ReactDocsComponent(service, router, menuInternalService, menuService) {
        this.service = service;
        this.router = router;
        this.menuInternalService = menuInternalService;
        this.menuService = menuService;
        this.menuItems = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_immutable__["List"])([]);
    }
    ReactDocsComponent.prototype.ngOnInit = function () {
        this.menuItems = this.service.getPreparedMenu();
        this.structure = this.service.getPreparedStructure();
    };
    ReactDocsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.menuItemSubscription = this.menuService.getSelectedItem().subscribe(function (data) {
            if (data.item)
                _this.menuInternalService.itemSelect(data.item);
        });
        this.routerSubscription = this.router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */] && event['url'] === '/docs'; })
            .subscribe(function (event) {
            var firstMenuItem = _this.menuItems.get(0).children.get(0);
            _this.menuInternalService.itemSelect(firstMenuItem);
            _this.router.navigateByUrl(firstMenuItem.link, { replaceUrl: true });
        });
        this.menuService.onItemSelect().subscribe(function (event) {
            if (event && event.item && event.item.data && event.item.data.demogif) {
                _this.demoUrl = event.item.data.demogif;
                _this.demoUrl = __webpack_require__("./assets/gif recursive ^\\.\\/.*$")("./" + _this.demoUrl);
            }
            else {
                _this.demoUrl = '';
            }
        });
    };
    ReactDocsComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
        this.menuItemSubscription.unsubscribe();
    };
    return ReactDocsComponent;
}());
ReactDocsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-docs',
        styles: [__webpack_require__("./app/docs/docs.component.scss")],
        template: "\n     <nga-layout>\n      <nga-layout-header fixed>\n        <react-header></react-header>\n      </nga-layout-header>\n      <nga-sidebar>\n        <nga-sidebar-content>\n          <nga-menu [items]=\"menuItems\" tag=\"leftMenu\"></nga-menu>\n        </nga-sidebar-content>\n      </nga-sidebar>\n      <nga-layout-column>\n        <router-outlet></router-outlet>\n      </nga-layout-column>\n      <nga-sidebar right *ngIf=\"demoUrl\">\n        <react-phone-block [demoUrl]=\"demoUrl\"></react-phone-block> \n      </nga-sidebar>\n    </nga-layout>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__docs_service__["a" /* DocsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__docs_service__["a" /* DocsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme_components_menu_menu_service__["b" /* NgaMenuInternalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__akveo_nga_theme_components_menu_menu_service__["b" /* NgaMenuInternalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__akveo_nga_theme__["f" /* NgaMenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__akveo_nga_theme__["f" /* NgaMenuService */]) === "function" && _d || Object])
], ReactDocsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=docs.component.js.map

/***/ }),

/***/ "./app/docs/docs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("./node_modules/immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__structure__ = __webpack_require__("./structure.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocsService; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PARSEDDOCS = __webpack_require__("./output.json");
var DocsService = (function () {
    function DocsService() {
    }
    DocsService.prototype.getStructure = function () {
        return __WEBPACK_IMPORTED_MODULE_2__structure__["a" /* STRUCTURE */];
    };
    DocsService.prototype.getPreparedMenu = function (prependMenu) {
        return this.prepareMenu(this.getStructure(), '/docs', prependMenu);
    };
    DocsService.prototype.getParsedDocs = function () {
        return PARSEDDOCS;
    };
    DocsService.prototype.getPreparedStructure = function () {
        return this.prepareStructure(this.getStructure(), this.getParsedDocs());
    };
    DocsService.prototype.prepareStructure = function (structure, preparedDocs) {
        var _this = this;
        structure.map(function (item) {
            if (item.type === 'block' && typeof item.klass === 'string') {
                item.klass = _this.getKlass(item.klass, preparedDocs.classes);
            }
            if (item.children) {
                item.children = _this.prepareStructure(item.children, preparedDocs);
            }
        });
        return structure;
    };
    DocsService.prototype.getKlass = function (name, items) {
        return items.find(function (item) { return item.name === name; });
    };
    DocsService.prototype.prepareMenu = function (structure, parentLink, prependMenu) {
        var _this = this;
        var menuItems = structure.map(function (item) {
            var menuItem = {};
            var itemLink = (parentLink ? parentLink : '') + "/" + item.name.replace(/\s/g, '-').toLowerCase();
            if (item.type !== 'section') {
                menuItem['link'] = itemLink;
            }
            menuItem['data'] = item;
            menuItem['pathMath'] = 'full';
            menuItem['title'] = item.name;
            if (item.children && item.children[0] && item.children[0].type === 'page') {
                menuItem['children'] = _this.prepareMenu(item.children, itemLink);
            }
            return menuItem;
        });
        if (prependMenu) {
            menuItems = prependMenu.concat(menuItems);
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])(menuItems);
    };
    return DocsService;
}());
DocsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], DocsService);

//# sourceMappingURL=docs.service.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-demo-phone.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host div ~ div {\n  width: 280px;\n  height: 500px;\n  position: relative;\n  background: url(" + __webpack_require__("./assets/phoneImage.png") + ") no-repeat;\n  margin-top: 1rem;\n  background-size: contain; }\n  :host div ~ div img {\n    position: absolute;\n    top: 57px;\n    left: 35px;\n    width: 208px;\n    height: 371px; }\n  :host div ~ div.android {\n    background: url(" + __webpack_require__("./assets/androidPhoneImage.png") + ") no-repeat;\n    background-size: contain; }\n    :host div ~ div.android img {\n      top: 55px;\n      left: 30px;\n      width: 218px;\n      height: 385px; }\n\n:host div {\n  text-align: center;\n  width: 280px; }\n  :host div > button {\n    padding: 0.5em 1em;\n    background: none;\n    border: none;\n    text-align: center; }\n    :host div > button.active {\n      background: #ff241f;\n      border-radius: 1em;\n      color: #fff; }\n    :host div > button:focus {\n      outline: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/docs/page/blocks/react-demo-phone.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactDemoPhoneComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactDemoPhoneComponent = (function () {
    function ReactDemoPhoneComponent() {
        this.isAndroid = false;
    }
    ReactDemoPhoneComponent.prototype.switchToAndroid = function () {
        this.isAndroid = true;
    };
    ReactDemoPhoneComponent.prototype.switchToIos = function () {
        this.isAndroid = false;
    };
    return ReactDemoPhoneComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], ReactDemoPhoneComponent.prototype, "demoUrl", void 0);
ReactDemoPhoneComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-phone-block',
        styles: [__webpack_require__("./app/docs/page/blocks/react-demo-phone.component.scss")],
        template: "\n    <div>\n      <button [class.active]=\"!isAndroid\" (click)=\"switchToIos()\">iOS</button>\n      <button [class.active]=\"isAndroid\" (click)=\"switchToAndroid()\">Android</button>\n    </div>  \n    <div [class.android]=\"isAndroid\">\n      <img *ngIf=\"demoUrl\" [src]=\"demoUrl\">\n    </div>\n  "
    })
], ReactDemoPhoneComponent);

//# sourceMappingURL=react-demo-phone.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-description-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactDescriptionBlockComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactDescriptionBlockComponent = (function () {
    function ReactDescriptionBlockComponent() {
    }
    ReactDescriptionBlockComponent.prototype.ngOnChanges = function () {
        this.isShortDescription = !!this.klass.shortDescription && this.klass.shortDescription != this.klass.name;
        this.isDescription = !!this.klass.description && this.klass.description != this.klass.shortDescription;
    };
    return ReactDescriptionBlockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactDescriptionBlockComponent.prototype, "klass", void 0);
ReactDescriptionBlockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-description-block',
        template: "\n    <div class=\"block-container\">\n      <p *ngIf=\"isShortDescription\" class=\"short-description\">\n        {{ klass?.shortDescription }}\n      </p>\n      <p *ngIf=\"isDescription\" reactDescription class=\"description\">\n        {{klass?.description}}\n      </p>\n    </div>\n  ",
    })
], ReactDescriptionBlockComponent);

//# sourceMappingURL=react-description-block.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-examples-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs__ = __webpack_require__("./node_modules/prismjs/prism.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js__ = __webpack_require__("./node_modules/prismjs/components/prism-jsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactExamplesBlockComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReactExamplesBlockComponent = (function () {
    function ReactExamplesBlockComponent() {
        this.title = 'Usage';
    }
    ReactExamplesBlockComponent.prototype.getContent = function (str) {
        return __WEBPACK_IMPORTED_MODULE_1_prismjs__["highlight"](str.trim(), __WEBPACK_IMPORTED_MODULE_1_prismjs__["languages"].jsx);
    };
    return ReactExamplesBlockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactExamplesBlockComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactExamplesBlockComponent.prototype, "klass", void 0);
ReactExamplesBlockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-examples-block',
        template: "\n    <p class=\"block-title\">{{ title }}</p>\n    <div class=\"block-container\" *ngFor=\"let example of klass.examples\">\n      <p class=\"block-subtitle\">{{example.shortDescription}}</p>\n      <p reactDescription>{{example.description}}</p>\n      <react-code-highlighter [code]=\"example.code.trim()\"></react-code-highlighter>\n      <pre><code [innerHTML]=\"getContent(example.code)\"></code></pre>\n    </div>   \n",
    })
], ReactExamplesBlockComponent);

//# sourceMappingURL=react-examples-block.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-markdown-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs__ = __webpack_require__("./node_modules/prismjs/prism.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js__ = __webpack_require__("./node_modules/prismjs/components/prism-jsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_marked__ = __webpack_require__("./node_modules/marked/lib/marked.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_marked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_marked__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactMarkdownComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReactMarkdownComponent = (function () {
    function ReactMarkdownComponent() {
    }
    ReactMarkdownComponent.prototype.ngOnInit = function () {
        var markdownFile = this.block.source;
        this.markdown = __webpack_require__("./assets/articles recursive ./node_modules/raw-loader/index.js!./ ^\\.\\/.*$")("./" + markdownFile);
        var md = __WEBPACK_IMPORTED_MODULE_3_marked__["setOptions"]({
            highlight: function (code) { return __WEBPACK_IMPORTED_MODULE_1_prismjs__["highlight"](code.trim(), __WEBPACK_IMPORTED_MODULE_1_prismjs__["languages"].jsx); }
        });
        this.markdown = md.parse(this.markdown.trim());
    };
    return ReactMarkdownComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactMarkdownComponent.prototype, "block", void 0);
ReactMarkdownComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-markdown-block',
        template: "<div reactDescription [innerHtml]=\"markdown\"></div>",
    })
], ReactMarkdownComponent);

//# sourceMappingURL=react-markdown-block.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-methods-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactMethodsBlockComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactMethodsBlockComponent = (function () {
    function ReactMethodsBlockComponent() {
    }
    return ReactMethodsBlockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactMethodsBlockComponent.prototype, "block", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactMethodsBlockComponent.prototype, "klass", void 0);
ReactMethodsBlockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-methods-block',
        template: "\n    <p class=\"block-title\">Methods</p>\n    \n    <table class=\"table\" *ngIf=\"klass?.methods?.length > 0\">\n      <thead>\n        <tr>\n          <td>Name</td>\n          <td>Description</td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let method of klass?.methods\">\n          <td>{{ method.name }}</td>\n          <td>\n          <div class=\"method-signature\">\n            <div><i>parameters:</i>\n              <span *ngFor=\"let param of method.params; let last = last\">\n                {{param.name}}: <code>{{param.type}}</code><span *ngIf=\"!last\">,</span>\n              </span> \n            </div>\n            <div>\n             <i>return type:</i> \n              <code>{{ method.type.join(\",\\n\") }}</code>\n            </div>\n          </div>\n          <div reactDescription>\n            {{method.shortDescription}} <br> {{ method.description }} \n          </div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <div *ngFor=\"let method of klass?.methods\">\n      <div *ngIf=\"method.examples.length > 0\">\n        <react-examples-block  [klass]=\"method\" [title]=\"'Examples of usage ' + method.name\"></react-examples-block>\n      </div>\n    </div>  \n",
    })
], ReactMethodsBlockComponent);

//# sourceMappingURL=react-methods-block.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-properties-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactPropertiesBlockComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactPropertiesBlockComponent = (function () {
    function ReactPropertiesBlockComponent() {
    }
    return ReactPropertiesBlockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactPropertiesBlockComponent.prototype, "klass", void 0);
ReactPropertiesBlockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-properties-block',
        template: "\n    <div class=\"block-container\">\n      <p class=\"block-title\">Properties</p>\n      <table class=\"table\" *ngIf=\"klass.props.length > 0\">\n       <thead>\n         <tr>\n           <td>Name</td>\n           <td>Type</td>\n           <td>Description</td>\n         </tr>\n       </thead>\n       <tbody>\n         <tr *ngFor=\"let prop of klass?.props\">\n           <td>{{ prop.name }}</td>\n           <td><code>{{ prop.type }}</code></td>\n           <td>\n              <p reactDescription>{{ prop.shortDescription }}</p>\n              <p reactDescription>{{ prop.description }}</p>\n           </td>\n         </tr>\n       </tbody>\n      </table>\n    </div>\n  ",
    })
], ReactPropertiesBlockComponent);

//# sourceMappingURL=react-properties-block.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-props-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactPropsBlockComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactPropsBlockComponent = (function () {
    function ReactPropsBlockComponent() {
    }
    return ReactPropsBlockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactPropsBlockComponent.prototype, "klass", void 0);
ReactPropsBlockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-props-block',
        template: "\n    <div class=\"block-container\">\n      <p class=\"block-title\">Props</p>\n      <table class=\"table\" *ngIf=\"klass.props.length > 0\">\n       <thead>\n         <tr>\n           <td>Name</td>\n           <td>Type</td>\n           <td>Description</td>\n         </tr>\n       </thead>\n       <tbody>\n         <tr *ngFor=\"let prop of klass?.props\">\n           <td>{{ prop.name }}</td>\n           <td><code>{{ prop.type }}</code></td>\n           <td>\n              <p *ngIf=\"!!prop.shortDescription\" reactDescription>{{ prop.shortDescription }}</p>\n              <p *ngIf=\"!!prop.description\" reactDescription>{{ prop.description }}</p>\n           </td>\n         </tr>\n       </tbody>\n      </table>\n    </div>\n  ",
    })
], ReactPropsBlockComponent);

//# sourceMappingURL=react-props-block.component.js.map

/***/ }),

/***/ "./app/docs/page/blocks/react-styles-block.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactStylesBlockComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReactStylesBlockComponent = (function () {
    function ReactStylesBlockComponent() {
    }
    return ReactStylesBlockComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", Object)
], ReactStylesBlockComponent.prototype, "klass", void 0);
ReactStylesBlockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-styles-block',
        template: "\n    <div class=\"block-container\" *ngFor=\"let style of klass.styles\">\n      <p class=\"block-title\">{{ style.shortDescription }}</p>\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <td>Name</td>\n            <td>Description</td>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let item of style.styles\">\n            <td>{{ item.name}}</td>\n            <td>\n              <p *ngIf=\"item.shortDescription\" reactDescription>{{ item.shortDescription}}</p>\n              <p *ngIf=\"item.description\" reactDescription>{{ item.description }}</p>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n",
    })
], ReactStylesBlockComponent);

//# sourceMappingURL=react-styles-block.component.js.map

/***/ }),

/***/ "./app/docs/page/page.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nga-theme-default) /deep/ nga-card a {\n  color: rgba(255, 40, 36, 0.87); }\n  :host-context(.nga-theme-default) /deep/ nga-card a:focus, :host-context(.nga-theme-default) /deep/ nga-card a:active, :host-context(.nga-theme-default) /deep/ nga-card a:hover {\n    color: #ff241f; }\n\n:host-context(.nga-theme-default) /deep/ nga-card nga-card-header {\n  font-size: 2rem;\n  font-weight: bold;\n  border: none;\n  text-transform: none;\n  opacity: 1; }\n\n:host-context(.nga-theme-default) /deep/ nga-card nga-card-body {\n  font-family: Roboto, sans-serif; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .block-title {\n    font-size: 2rem;\n    font-weight: bold;\n    margin-bottom: 2rem; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .block-subtitle {\n    font-size: 20px;\n    font-weight: bold; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .block-container {\n    margin-bottom: 2rem; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body img {\n    display: block;\n    max-width: 100%;\n    margin: 0.5rem 0; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .table td {\n    padding: 0.75rem 0.75rem 0.75rem 0; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .table thead {\n    font-weight: bold; }\n    :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .table thead td {\n      border-top: none; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body code {\n    font-size: 100%;\n    color: rgba(255, 40, 36, 0.87); }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body pre {\n    background: #f5f6fc;\n    padding: 0.75rem 1rem; }\n    :host-context(.nga-theme-default) /deep/ nga-card nga-card-body pre code {\n      color: rgba(0, 0, 0, 0.87); }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-code-highlighter {\n    display: none; }\n    :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-code-highlighter .code-title {\n      background: #f5f6fc;\n      padding: 0.75rem 1rem;\n      border-radius: 3px;\n      border-bottom: 1px solid #e0e1eb;\n      position: relative; }\n      :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-code-highlighter .code-title i {\n        position: absolute;\n        right: 1rem;\n        color: #e0e1eb; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-methods-block .method-signature {\n    margin-bottom: 1rem; }\n  :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-markdown-block pre {\n    margin-bottom: 2rem; }\n  @media screen and (max-width: 600px) {\n    :host-context(.nga-theme-default) /deep/ nga-card nga-card-body .table td {\n      word-break: normal; } }\n  @media screen and (max-width: 700px) {\n    :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-examples-block > div > pre {\n      display: none; }\n    :host-context(.nga-theme-default) /deep/ nga-card nga-card-body react-examples-block react-code-highlighter {\n      display: block; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/docs/page/page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__akveo_nga_theme__ = __webpack_require__("../../ng2-admin/src/framework/theme/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgdPageComponent; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NgdPageComponent = (function () {
    function NgdPageComponent(menuService, router, renderer) {
        var _this = this;
        this.menuService = menuService;
        this.router = router;
        this.renderer = renderer;
        this.routerSubscription = this.router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* NavigationEnd */]; })
            .subscribe(function (event) {
            _this.menuService.getSelectedItem().subscribe(function (event) {
                if (event && event.item && event.item.data) {
                    _this.currentItem = event.item.data;
                    _this.renderer.setProperty(document.body, 'scrollTop', 0);
                }
            });
        });
    }
    NgdPageComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    return NgdPageComponent;
}());
NgdPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'ngd-page',
        styles: [__webpack_require__("./app/docs/page/page.component.scss")],
        template: "\n    <nga-card>\n      <nga-card-header>{{ currentItem?.name }}</nga-card-header>\n      <nga-card-body>\n        <ng-container *ngFor=\"let item of currentItem?.children\">\n          <ng-container [ngSwitch]=\"item.block\">\n            \n            <react-markdown-block *ngSwitchCase=\"'markdown'\" [block]=\"item\"></react-markdown-block>\n            <react-description-block *ngSwitchCase=\"'rk-description'\" [klass]=\"item.klass\"></react-description-block>\n            <react-properties-block *ngSwitchCase=\"'rk-properties'\" [klass]=\"item.klass\"></react-properties-block>\n            <react-examples-block *ngSwitchCase=\"'rk-examples'\" [klass]=\"item.klass\"></react-examples-block>\n            <react-props-block *ngSwitchCase=\"'rk-props'\" [klass]=\"item.klass\"></react-props-block>\n            <react-methods-block *ngSwitchCase=\"'rk-methods'\" [klass]=\"item.klass\"></react-methods-block>            \n            <react-styles-block *ngSwitchCase=\"'rk-styles'\" [klass]=\"item.klass\"></react-styles-block>            \n            \n          </ng-container>\n        </ng-container>\n       </nga-card-body>\n     </nga-card>\n  ",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__akveo_nga_theme__["f" /* NgaMenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__akveo_nga_theme__["f" /* NgaMenuService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */]) === "function" && _c || Object])
], NgdPageComponent);

var _a, _b, _c;
//# sourceMappingURL=page.component.js.map

/***/ }),

/***/ "./app/docs/utils/code-highlighter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs__ = __webpack_require__("./node_modules/prismjs/prism.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js__ = __webpack_require__("./node_modules/prismjs/components/prism-jsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prismjs_components_prism_jsx_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeHighlighterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CodeHighlighterComponent = (function () {
    function CodeHighlighterComponent() {
        this.isCodeShown = true;
        this.isHideEnable = false;
    }
    CodeHighlighterComponent.prototype.ngOnInit = function () {
        this.code = __WEBPACK_IMPORTED_MODULE_1_prismjs__["highlight"](this.code, __WEBPACK_IMPORTED_MODULE_1_prismjs__["languages"].jsx);
        if (this.code.split(/\r\n|\r|\n/).length > 3) {
            this.isHideEnable = true;
            this.isCodeShown = false;
        }
    };
    CodeHighlighterComponent.prototype.showCode = function () {
        this.isCodeShown = !this.isCodeShown;
    };
    return CodeHighlighterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", String)
], CodeHighlighterComponent.prototype, "code", void 0);
CodeHighlighterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-code-highlighter',
        template: "\n    <div *ngIf=\"isHideEnable\" class=\"code-title\" (click)=\"showCode()\">\n      Example Code\n      <i [hidden]=\"isCodeShown\" class=\"ion-chevron-down\"></i>\n      <i [hidden]=\"!isCodeShown\" class=\"ion-chevron-up\"></i>  \n      </div>\n    <pre [hidden]=\"!isCodeShown\"><code [innerHtml]=\"code\"></code></pre>\n"
    })
], CodeHighlighterComponent);

//# sourceMappingURL=code-highlighter.component.js.map

/***/ }),

/***/ "./app/docs/utils/react-description.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs_components_prism_jsx_js__ = __webpack_require__("./node_modules/prismjs/components/prism-jsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs_components_prism_jsx_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs_components_prism_jsx_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_marked__ = __webpack_require__("./node_modules/marked/lib/marked.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_marked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_marked__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactDescriptionDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReactDescriptionDirective = (function () {
    function ReactDescriptionDirective(el) {
        this.el = el;
    }
    ReactDescriptionDirective.prototype.ngAfterViewInit = function () {
        var md = __WEBPACK_IMPORTED_MODULE_2_marked__["setOptions"]({});
        this.el.nativeElement.innerHTML = md.parse(this.el.nativeElement.innerHTML.trim());
    };
    return ReactDescriptionDirective;
}());
ReactDescriptionDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Directive */])({
        selector: '[reactDescription]',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */]) === "function" && _a || Object])
], ReactDescriptionDirective);

var _a;
//# sourceMappingURL=react-description.directive.js.map

/***/ }),

/***/ "./app/homepage/homepage.component.html":
/***/ (function(module, exports) {

module.exports = "<nga-layout>\n  <nga-layout-header fixed [ngClass]=\"{ 'transparent': transparentHeader }\">\n    <react-header></react-header>\n  </nga-layout-header>\n\n  <nga-layout-column>\n  <section class=\"kitten\">\n    <div class=\"wrapper\">\n      <div class=\"title-container\">\n        <header class=\"title\">\n          <h2>React Native</h2>\n          <h1 class=\"ui-kitten\">UI Kitten</h1>\n          <p>Mobile framework with easily customizable elements</p>\n          <a href=\"https://itunes.apple.com/us/app/kitten-tricks/id1246143230\" class=\"button platform-button\" target=\"_blank\"><i class=\"ion-social-apple\"></i>IOS DEMO</a>\n          <a href=\"https://play.google.com/store/apps/details?id=com.akveo.kittenTricks\" class=\"button platform-button\" target=\"_blank\"><i class=\"ion-social-android\"></i>ANDROID DEMO</a>\n        </header>\n      </div>\n    </div>\n    <img src=\"assets/backgroundMainScreenPhone.png\">\n  </section>\n\n  <section class=\"demo\">\n    <div class=\"wrapper\">\n      <h3>WHAT IS IT?</h3>\n      <p>React-native-ui-kitten is a framework that contains set of commonly used UI components styled in similar way.\n        Despite there are a lot of standalone react-native components nowadays there’s not so many frameworks that offer\n        you a bunch of commonly used ones as a single dependency with similar UI design.\n        For instance in Web Development there are CSS frameworks like Bootstrap that allows you to add a single include\n        and use dozens of nice-looking elements. You can also style them according to your corporate guidelines by just\n        changing variables.  Our framework attempts to fill this gap. You focus on business logic and it takes care of\n        visual appearance. We have also brought the concept similar to css classes that will save you time when styling\n        some particular elements. And the most awesome thing: you can <b>change themes on the</b> fly by just passing different\n        set of variables. <b>100% native</b>. Give our kitten a try!\n      </p>\n      <a class=\"button\" href=\"#/docs/\">READ MORE</a>\n      <h3>KITTEN TRICKS</h3>\n      <h4>Framework Demo</h4>\n      <img src=\"assets/screensImage.png\">\n      <p> <b>Kitten Tricks</b> is a live demo of react-native-ui-kitten published on both App Store and Google Play.\n        You can use it as a <b>starter kit</b> for your next mobile application.\n        Download the sources, integrate it with backend and there you go!\n        You’ve got a cross-platform native application. Moreover it’s all <b>FREE</b> and open-source</p>\n      <h4>Download Demo:</h4>\n      <a class=\"button platform-button\" href=\"https://itunes.apple.com/us/app/kitten-tricks/id1246143230\" target=\"_blank\"><i class=\"ion-social-android\"></i>IOS DEMO</a>\n      <a class=\"button platform-button\" href=\"https://play.google.com/store/apps/details?id=com.akveo.kittenTricks\" target=\"_blank\"><i class=\"ion-social-apple\"></i>ANDROID DEMO</a>\n  </div>\n</section>\n\n  <section class=\"contacts\">\n    <img src=\"assets/cloudsImage.png\">\n    <div class=\"wrapper\">\n      <h3>HOW YOU CAN SUPPORT US</h3>\n      <p>Here's what you can do</p>\n      <div class=\"contact-container\">\n        <div class=\"contact-button\">\n          <a class=\"icons\" href=\"https://github.com/akveo/react-native-ui-kitten\" target=\"_blank\">\n            <img class=\"icon-socio\" src=\"assets/githubIcon.png\" alt=\"github\">\n            <img class=\"icon-cloud\" src=\"assets/cloudIcon.png\">\n          </a>\n          Star us\n        </div>\n        <div class=\"contact-button\">\n            <a class=\"icons\" href=\"https://twitter.com/akveo_inc\" target=\"_blank\">\n              <img class=\"icon-socio\" src=\"assets/twitterIcon.png\" alt=\"twitter\">\n              <img class=\"icon-cloud\" src=\"assets/cloudIcon.png\" >\n            </a>\n          Follow us\n        </div>\n        <div class=\"contact-button\">\n          <a class=\"icons\" href=\"https://www.facebook.com/akveo\" target=\"_blank\">\n            <img class=\"icon-socio\" src=\"assets/facebookIcon.png\" alt=\"facebook\">\n            <img class=\"icon-cloud\" src=\"assets/cloudIcon.png\">\n          </a>\n          Like us\n        </div>\n      </div>\n      <p>You're awesome!</p>\n    </div>\n    <img class=\"big-circle-img\" src=\"assets/bigCircle.png\">\n  </section>\n  <section class=\"hire-block\">\n    <div class=\"wrapper\">\n      <H4>CAN I HIRE YOU?</H4>\n      <p>Yes! We are available for hire. Visit our <a href=\"http://akveo.com\" target=\"_blank\"><b>homepage</b></a> or simply leave us a note\n        at <a href=\"mailto:contact@akveo.com\" target=\"_blank\"><b>contact@akveo.com</b></a>. We will be happy to work with you!</p>\n    </div>\n  </section>\n  <nga-layout-footer>\n    <react-footer></react-footer>\n  </nga-layout-footer>\n</nga-layout-column>\n</nga-layout>\n"

/***/ }),

/***/ "./app/homepage/homepage.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host .nga-theme-default {\n  font-weight: Roboto, sans-serif; }\n  :host .nga-theme-default nga-layout-header /deep/ nav {\n    border-bottom: 1px solid #eee; }\n  :host .nga-theme-default nga-layout-header /deep/ nav, :host .nga-theme-default nga-layout-header /deep/ .menu a, :host .nga-theme-default nga-layout-header /deep/ .logo-container a, :host .nga-theme-default nga-layout-header /deep/ a.contact-us, :host .nga-theme-default nga-layout-header /deep/ .svg-logo .cls-1, :host .nga-theme-default nga-layout-header /deep/ .svg-logo .cls-2, :host .nga-theme-default nga-layout-header /deep/ .active-link::before {\n    transition: all ease-in .2s; }\n  :host .nga-theme-default nga-layout-header.transparent /deep/ nav {\n    border-color: transparent;\n    background: transparent;\n    color: white; }\n  :host .nga-theme-default nga-layout-header.transparent /deep/ .menu a, :host .nga-theme-default nga-layout-header.transparent /deep/ .logo-container a, :host .nga-theme-default nga-layout-header.transparent /deep/ a.contact-us {\n    color: white; }\n  :host .nga-theme-default nga-layout-header.transparent /deep/ .active-link::before {\n    background: white !important; }\n  :host .nga-theme-default nga-layout-header.transparent /deep/ .svg-logo .cls-1, :host .nga-theme-default nga-layout-header.transparent /deep/ .svg-logo .cls-2 {\n    stroke: white; }\n  :host .nga-theme-default nga-layout-header.transparent /deep/ nav, :host .nga-theme-default nga-layout-header.transparent /deep/ .menu a, :host .nga-theme-default nga-layout-header.transparent /deep/ .logo-container a, :host .nga-theme-default nga-layout-header.transparent /deep/ a.contact-us, :host .nga-theme-default nga-layout-header.transparent /deep/ .svg-logo .cls-1, :host .nga-theme-default nga-layout-header.transparent /deep/ .svg-logo .cls-2, :host .nga-theme-default nga-layout-header.transparent /deep/ .active-link::before {\n    transition: all ease-in .2s; }\n  :host .nga-theme-default /deep/ .layout-container {\n    padding-top: 0 !important; }\n  :host .nga-theme-default img {\n    max-width: 100%; }\n  :host .nga-theme-default p {\n    font-size: 1.625rem;\n    max-width: 51.875rem;\n    margin: 1.625rem auto;\n    letter-spacing: -0.6px; }\n  :host .nga-theme-default h1 {\n    font-size: 6.25rem;\n    line-height: 0.8;\n    margin-bottom: 2.5rem; }\n  :host .nga-theme-default h2 {\n    font-size: 5.5rem;\n    font-weight: 300;\n    letter-spacing: -2.2px; }\n  :host .nga-theme-default h3 {\n    font-size: 4.625rem;\n    margin-bottom: 1.625rem; }\n  :host .nga-theme-default h4 {\n    font-size: 2.125rem;\n    font-weight: normal;\n    color: rgba(0, 0, 0, 0.56);\n    margin-bottom: 1.625rem; }\n  :host .nga-theme-default .wrapper {\n    padding: 0 1rem;\n    max-width: 1312px;\n    margin: 0 auto;\n    text-align: center; }\n  :host .nga-theme-default a.button {\n    display: inline-block;\n    font-weight: bold;\n    font-size: 1.375rem;\n    border: 3px solid #ff241f;\n    padding: 0 3.5em;\n    line-height: 3.125em;\n    border-radius: 1.625em;\n    color: #ff241f;\n    margin: 0.625rem; }\n    :host .nga-theme-default a.button:hover {\n      color: white;\n      background: #ff241f; }\n    :host .nga-theme-default a.button.platform-button {\n      position: relative;\n      padding: 0 1.5em 0 3.75em; }\n      :host .nga-theme-default a.button.platform-button i {\n        position: absolute;\n        left: 0.5em;\n        font-size: 2.625em; }\n  :host .nga-theme-default .kitten {\n    color: white;\n    background: url(" + __webpack_require__("./assets/backgroundMainScreen.png") + ") no-repeat 50% 0;\n    padding: 12.875rem 0 21.75rem;\n    background-size: cover;\n    margin-bottom: 6rem; }\n    :host .nga-theme-default .kitten .title-container {\n      width: 60%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: end;\n          -ms-flex-pack: end;\n              justify-content: flex-end; }\n      :host .nga-theme-default .kitten .title-container .title {\n        max-width: 38rem;\n        text-align: left; }\n      :host .nga-theme-default .kitten .title-container p {\n        padding-right: 10rem; }\n    :host .nga-theme-default .kitten a.button {\n      font-size: 1rem;\n      border-color: white;\n      color: white;\n      margin: 0.375rem 1.250rem 0.625rem 0; }\n      :host .nga-theme-default .kitten a.button:hover {\n        color: #ff241f;\n        background: white; }\n    :host .nga-theme-default .kitten img {\n      display: none; }\n  :host .nga-theme-default .demo img {\n    margin: 1.625rem 0; }\n  :host .nga-theme-default .demo a.button {\n    margin-bottom: 10rem; }\n  :host .nga-theme-default .contacts {\n    color: white;\n    background: linear-gradient(to bottom, #ff931e, #ff1d25); }\n    :host .nga-theme-default .contacts img {\n      width: 100%; }\n    :host .nga-theme-default .contacts .big-circle-img {\n      margin-bottom: -2px; }\n    :host .nga-theme-default .contacts .contact-container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n      margin-bottom: 4.5rem;\n      font-size: 2rem; }\n      :host .nga-theme-default .contacts .contact-container .icons {\n        position: relative;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        height: 12rem;\n        width: 12.5rem; }\n        :host .nga-theme-default .contacts .contact-container .icons .icon-socio {\n          position: absolute;\n          width: 10rem; }\n          :host .nga-theme-default .contacts .contact-container .icons .icon-socio:hover ~ .icon-cloud {\n            height: 98%;\n            width: 98%;\n            margin-right: 3px; }\n        :host .nga-theme-default .contacts .contact-container .icons .icon-cloud {\n          width: 75%;\n          height: 75%;\n          transition: all 0.2s ease-out; }\n  :host .nga-theme-default .hire-block {\n    padding: 2rem 0 4rem; }\n    :host .nga-theme-default .hire-block p {\n      max-width: 36.875rem; }\n    :host .nga-theme-default .hire-block h4 {\n      color: rgba(0, 0, 0, 0.87);\n      font-weight: 500; }\n  @media screen and (max-width: 60.625rem) {\n    :host .nga-theme-default h2 {\n      font-size: calc(7.56756757vw + 0.91216216rem); }\n    :host .nga-theme-default h1 {\n      font-size: calc(8.64864865vw + 1.00675676rem); }\n    :host .nga-theme-default p {\n      font-size: calc(1.62162162vw + 0.64189189rem);\n      margin: 1rem auto; }\n    :host .nga-theme-default h3 {\n      font-size: calc(8.10810811vw - 0.54054054rem);\n      margin-bottom: 1rem; }\n    :host .nga-theme-default h4 {\n      font-size: calc(4.32432432vw - 0.37162162rem);\n      margin-bottom: 1rem; }\n    :host .nga-theme-default .kitten {\n      background-size: 200%;\n      padding: 15% 0 55%;\n      margin-bottom: 0; }\n      :host .nga-theme-default .kitten .title-container {\n        width: 62%; }\n        :host .nga-theme-default .kitten .title-container P {\n          padding-right: 7rem; }\n      :host .nga-theme-default .kitten .platform-button ~ .platform-button {\n        margin-right: 5rem; }\n    :host .nga-theme-default .demo img {\n      margin: 1rem 0; }\n    :host .nga-theme-default .demo a.button {\n      margin-bottom: 7rem; }\n    :host .nga-theme-default .contacts .contact-container {\n      font-size: 1.5rem; }\n      :host .nga-theme-default .contacts .contact-container .icons {\n        height: 10rem;\n        width: 10.3rem; }\n        :host .nga-theme-default .contacts .contact-container .icons img.icon-socio {\n          width: 8.15rem; }\n        :host .nga-theme-default .contacts .contact-container .icons img.icon-cloud {\n          display: none; } }\n  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n    :host .nga-theme-default img.icon-cloud {\n      visibility: hidden; } }\n  @media screen and (max-width: 41.875rem) {\n    :host .nga-theme-default .kitten {\n      padding: 15% 0 40%; } }\n  @media screen and (max-width: 37.5rem) {\n    :host .nga-theme-default h2 {\n      font-size: 3.125rem; }\n    :host .nga-theme-default h1 {\n      font-size: 3.5rem; }\n    :host .nga-theme-default p {\n      font-size: 1rem; }\n    :host .nga-theme-default h3 {\n      font-size: 1.875rem; }\n    :host .nga-theme-default h4 {\n      font-size: 1.25rem; }\n    :host .nga-theme-default a.button {\n      font-size: 1rem; }\n    :host .nga-theme-default .kitten {\n      background-image: linear-gradient(to top, #ff931e 60%, #ff1d25 100%);\n      padding: 80px 0 0 0; }\n      :host .nga-theme-default .kitten img {\n        display: inline; }\n      :host .nga-theme-default .kitten .title-container {\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        width: 100%; }\n        :host .nga-theme-default .kitten .title-container .title {\n          max-width: 20rem;\n          text-align: center; }\n          :host .nga-theme-default .kitten .title-container .title P {\n            padding: 0; }\n        :host .nga-theme-default .kitten .title-container a.button {\n          margin: 0.625rem; }\n    :host .nga-theme-default .demo a.button {\n      margin-bottom: 3rem; }\n      :host .nga-theme-default .demo a.button.platform-button {\n        margin-bottom: 0.625rem; }\n    :host .nga-theme-default .contacts .contact-container {\n      font-size: 1rem; }\n      :host .nga-theme-default .contacts .contact-container .icons {\n        height: 5rem;\n        width: 5rem; }\n        :host .nga-theme-default .contacts .contact-container .icons img.icon-socio {\n          width: 4rem; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./app/homepage/homepage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReactHomepageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReactHomepageComponent = (function () {
    function ReactHomepageComponent(renderer) {
        this.renderer = renderer;
        this.transparentHeader = true;
        this.renderer.setProperty(document.body, 'scrollTop', 0);
    }
    ReactHomepageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].fromEvent(window, 'scroll')
            .subscribe(function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            _this.transparentHeader = scrollTop == 0;
        });
    };
    return ReactHomepageComponent;
}());
ReactHomepageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'react-homepage',
        template: __webpack_require__("./app/homepage/homepage.component.html"),
        styles: [__webpack_require__("./app/homepage/homepage.component.scss")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Renderer2 */]) === "function" && _a || Object])
], ReactHomepageComponent);

var _a;
//# sourceMappingURL=homepage.component.js.map

/***/ }),

/***/ "./assets/androidPhoneImage.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "androidPhoneImage.72e0a7b4d8201abf5b9b.png";

/***/ }),

/***/ "./assets/articles recursive ./node_modules/raw-loader/index.js!./ ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./customization.md": "./node_modules/raw-loader/index.js!./assets/articles/customization.md",
	"./guide.md": "./node_modules/raw-loader/index.js!./assets/articles/guide.md",
	"./index.md": "./node_modules/raw-loader/index.js!./assets/articles/index.md",
	"./theme.md": "./node_modules/raw-loader/index.js!./assets/articles/theme.md"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./assets/articles recursive ./node_modules/raw-loader/index.js!./ ^\\.\\/.*$";

/***/ }),

/***/ "./assets/backgroundMainScreen.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "backgroundMainScreen.1eb18087497f90a02760.png";

/***/ }),

/***/ "./assets/gif recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./button.gif": "./assets/gif/button.gif",
	"./card.gif": "./assets/gif/card.gif",
	"./choice.gif": "./assets/gif/choice.gif",
	"./image.gif": "./assets/gif/image.gif",
	"./input.gif": "./assets/gif/input.gif",
	"./tab.gif": "./assets/gif/tab.gif"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./assets/gif recursive ^\\.\\/.*$";

/***/ }),

/***/ "./assets/gif/button.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "button.51e6d4904dbee1372123.gif";

/***/ }),

/***/ "./assets/gif/card.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "card.91743ae6a8628e96166d.gif";

/***/ }),

/***/ "./assets/gif/choice.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "choice.6e6e63611da6449b6936.gif";

/***/ }),

/***/ "./assets/gif/image.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "image.6e67cfd263d345142080.gif";

/***/ }),

/***/ "./assets/gif/input.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "input.fb5b48556edf7d8f3f26.gif";

/***/ }),

/***/ "./assets/gif/tab.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "tab.d4c44f5d568ea259dbbc.gif";

/***/ }),

/***/ "./assets/logo.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "logo.388f7369927f53a8babf.svg";

/***/ }),

/***/ "./assets/phoneImage.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "phoneImage.9ff2d676982b7e3982ff.png";

/***/ }),

/***/ "./environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */ var environment = {
    production: false,
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./environments/environment.ts");
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/exports-loader/index.js?module.exports.toString()!./node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!./node_modules/postcss-loader/index.js?{\"ident\":\"postcss\"}!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false,\"precision\":8,\"includePaths\":[]}!./app/styles/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("./node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!./node_modules/postcss-loader/index.js?{\"ident\":\"postcss\"}!./node_modules/typeface-exo/index.css"), "");
exports.i(__webpack_require__("./node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!./node_modules/postcss-loader/index.js?{\"ident\":\"postcss\"}!./node_modules/segoe-fonts/segoe-fonts.css"), "");

// module
exports.push([module.i, "@charset \"UTF-8\";\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0; }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\n/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + __webpack_require__("./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0") + ");\n  src: url(" + __webpack_require__("./node_modules/font-awesome/fonts/fontawesome-webfont.eot") + "?#iefix&v=4.7.0) format(\"embedded-opentype\"), url(" + __webpack_require__("./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0") + ") format(\"woff2\"), url(" + __webpack_require__("./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0") + ") format(\"woff\"), url(" + __webpack_require__("./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0") + ") format(\"truetype\"), url(" + __webpack_require__("./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0") + "#fontawesomeregular) format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center; }\n\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center; }\n  .fa-li.fa-lg {\n    left: -1.85714286em; }\n\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eee;\n  border-radius: .1em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right {\n  margin-left: .3em; }\n\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right; }\n\n.pull-left {\n  float: left; }\n\n.fa.pull-left {\n  margin-right: .3em; }\n\n.fa.pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  transform: scale(1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle; }\n\n.fa-stack-1x, .fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center; }\n\n.fa-stack-1x {\n  line-height: inherit; }\n\n.fa-stack-2x {\n  font-size: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\F000\"; }\n\n.fa-music:before {\n  content: \"\\F001\"; }\n\n.fa-search:before {\n  content: \"\\F002\"; }\n\n.fa-envelope-o:before {\n  content: \"\\F003\"; }\n\n.fa-heart:before {\n  content: \"\\F004\"; }\n\n.fa-star:before {\n  content: \"\\F005\"; }\n\n.fa-star-o:before {\n  content: \"\\F006\"; }\n\n.fa-user:before {\n  content: \"\\F007\"; }\n\n.fa-film:before {\n  content: \"\\F008\"; }\n\n.fa-th-large:before {\n  content: \"\\F009\"; }\n\n.fa-th:before {\n  content: \"\\F00A\"; }\n\n.fa-th-list:before {\n  content: \"\\F00B\"; }\n\n.fa-check:before {\n  content: \"\\F00C\"; }\n\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\F00D\"; }\n\n.fa-search-plus:before {\n  content: \"\\F00E\"; }\n\n.fa-search-minus:before {\n  content: \"\\F010\"; }\n\n.fa-power-off:before {\n  content: \"\\F011\"; }\n\n.fa-signal:before {\n  content: \"\\F012\"; }\n\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\F013\"; }\n\n.fa-trash-o:before {\n  content: \"\\F014\"; }\n\n.fa-home:before {\n  content: \"\\F015\"; }\n\n.fa-file-o:before {\n  content: \"\\F016\"; }\n\n.fa-clock-o:before {\n  content: \"\\F017\"; }\n\n.fa-road:before {\n  content: \"\\F018\"; }\n\n.fa-download:before {\n  content: \"\\F019\"; }\n\n.fa-arrow-circle-o-down:before {\n  content: \"\\F01A\"; }\n\n.fa-arrow-circle-o-up:before {\n  content: \"\\F01B\"; }\n\n.fa-inbox:before {\n  content: \"\\F01C\"; }\n\n.fa-play-circle-o:before {\n  content: \"\\F01D\"; }\n\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\F01E\"; }\n\n.fa-refresh:before {\n  content: \"\\F021\"; }\n\n.fa-list-alt:before {\n  content: \"\\F022\"; }\n\n.fa-lock:before {\n  content: \"\\F023\"; }\n\n.fa-flag:before {\n  content: \"\\F024\"; }\n\n.fa-headphones:before {\n  content: \"\\F025\"; }\n\n.fa-volume-off:before {\n  content: \"\\F026\"; }\n\n.fa-volume-down:before {\n  content: \"\\F027\"; }\n\n.fa-volume-up:before {\n  content: \"\\F028\"; }\n\n.fa-qrcode:before {\n  content: \"\\F029\"; }\n\n.fa-barcode:before {\n  content: \"\\F02A\"; }\n\n.fa-tag:before {\n  content: \"\\F02B\"; }\n\n.fa-tags:before {\n  content: \"\\F02C\"; }\n\n.fa-book:before {\n  content: \"\\F02D\"; }\n\n.fa-bookmark:before {\n  content: \"\\F02E\"; }\n\n.fa-print:before {\n  content: \"\\F02F\"; }\n\n.fa-camera:before {\n  content: \"\\F030\"; }\n\n.fa-font:before {\n  content: \"\\F031\"; }\n\n.fa-bold:before {\n  content: \"\\F032\"; }\n\n.fa-italic:before {\n  content: \"\\F033\"; }\n\n.fa-text-height:before {\n  content: \"\\F034\"; }\n\n.fa-text-width:before {\n  content: \"\\F035\"; }\n\n.fa-align-left:before {\n  content: \"\\F036\"; }\n\n.fa-align-center:before {\n  content: \"\\F037\"; }\n\n.fa-align-right:before {\n  content: \"\\F038\"; }\n\n.fa-align-justify:before {\n  content: \"\\F039\"; }\n\n.fa-list:before {\n  content: \"\\F03A\"; }\n\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\F03B\"; }\n\n.fa-indent:before {\n  content: \"\\F03C\"; }\n\n.fa-video-camera:before {\n  content: \"\\F03D\"; }\n\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\F03E\"; }\n\n.fa-pencil:before {\n  content: \"\\F040\"; }\n\n.fa-map-marker:before {\n  content: \"\\F041\"; }\n\n.fa-adjust:before {\n  content: \"\\F042\"; }\n\n.fa-tint:before {\n  content: \"\\F043\"; }\n\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\F044\"; }\n\n.fa-share-square-o:before {\n  content: \"\\F045\"; }\n\n.fa-check-square-o:before {\n  content: \"\\F046\"; }\n\n.fa-arrows:before {\n  content: \"\\F047\"; }\n\n.fa-step-backward:before {\n  content: \"\\F048\"; }\n\n.fa-fast-backward:before {\n  content: \"\\F049\"; }\n\n.fa-backward:before {\n  content: \"\\F04A\"; }\n\n.fa-play:before {\n  content: \"\\F04B\"; }\n\n.fa-pause:before {\n  content: \"\\F04C\"; }\n\n.fa-stop:before {\n  content: \"\\F04D\"; }\n\n.fa-forward:before {\n  content: \"\\F04E\"; }\n\n.fa-fast-forward:before {\n  content: \"\\F050\"; }\n\n.fa-step-forward:before {\n  content: \"\\F051\"; }\n\n.fa-eject:before {\n  content: \"\\F052\"; }\n\n.fa-chevron-left:before {\n  content: \"\\F053\"; }\n\n.fa-chevron-right:before {\n  content: \"\\F054\"; }\n\n.fa-plus-circle:before {\n  content: \"\\F055\"; }\n\n.fa-minus-circle:before {\n  content: \"\\F056\"; }\n\n.fa-times-circle:before {\n  content: \"\\F057\"; }\n\n.fa-check-circle:before {\n  content: \"\\F058\"; }\n\n.fa-question-circle:before {\n  content: \"\\F059\"; }\n\n.fa-info-circle:before {\n  content: \"\\F05A\"; }\n\n.fa-crosshairs:before {\n  content: \"\\F05B\"; }\n\n.fa-times-circle-o:before {\n  content: \"\\F05C\"; }\n\n.fa-check-circle-o:before {\n  content: \"\\F05D\"; }\n\n.fa-ban:before {\n  content: \"\\F05E\"; }\n\n.fa-arrow-left:before {\n  content: \"\\F060\"; }\n\n.fa-arrow-right:before {\n  content: \"\\F061\"; }\n\n.fa-arrow-up:before {\n  content: \"\\F062\"; }\n\n.fa-arrow-down:before {\n  content: \"\\F063\"; }\n\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\F064\"; }\n\n.fa-expand:before {\n  content: \"\\F065\"; }\n\n.fa-compress:before {\n  content: \"\\F066\"; }\n\n.fa-plus:before {\n  content: \"\\F067\"; }\n\n.fa-minus:before {\n  content: \"\\F068\"; }\n\n.fa-asterisk:before {\n  content: \"\\F069\"; }\n\n.fa-exclamation-circle:before {\n  content: \"\\F06A\"; }\n\n.fa-gift:before {\n  content: \"\\F06B\"; }\n\n.fa-leaf:before {\n  content: \"\\F06C\"; }\n\n.fa-fire:before {\n  content: \"\\F06D\"; }\n\n.fa-eye:before {\n  content: \"\\F06E\"; }\n\n.fa-eye-slash:before {\n  content: \"\\F070\"; }\n\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\F071\"; }\n\n.fa-plane:before {\n  content: \"\\F072\"; }\n\n.fa-calendar:before {\n  content: \"\\F073\"; }\n\n.fa-random:before {\n  content: \"\\F074\"; }\n\n.fa-comment:before {\n  content: \"\\F075\"; }\n\n.fa-magnet:before {\n  content: \"\\F076\"; }\n\n.fa-chevron-up:before {\n  content: \"\\F077\"; }\n\n.fa-chevron-down:before {\n  content: \"\\F078\"; }\n\n.fa-retweet:before {\n  content: \"\\F079\"; }\n\n.fa-shopping-cart:before {\n  content: \"\\F07A\"; }\n\n.fa-folder:before {\n  content: \"\\F07B\"; }\n\n.fa-folder-open:before {\n  content: \"\\F07C\"; }\n\n.fa-arrows-v:before {\n  content: \"\\F07D\"; }\n\n.fa-arrows-h:before {\n  content: \"\\F07E\"; }\n\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\F080\"; }\n\n.fa-twitter-square:before {\n  content: \"\\F081\"; }\n\n.fa-facebook-square:before {\n  content: \"\\F082\"; }\n\n.fa-camera-retro:before {\n  content: \"\\F083\"; }\n\n.fa-key:before {\n  content: \"\\F084\"; }\n\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\F085\"; }\n\n.fa-comments:before {\n  content: \"\\F086\"; }\n\n.fa-thumbs-o-up:before {\n  content: \"\\F087\"; }\n\n.fa-thumbs-o-down:before {\n  content: \"\\F088\"; }\n\n.fa-star-half:before {\n  content: \"\\F089\"; }\n\n.fa-heart-o:before {\n  content: \"\\F08A\"; }\n\n.fa-sign-out:before {\n  content: \"\\F08B\"; }\n\n.fa-linkedin-square:before {\n  content: \"\\F08C\"; }\n\n.fa-thumb-tack:before {\n  content: \"\\F08D\"; }\n\n.fa-external-link:before {\n  content: \"\\F08E\"; }\n\n.fa-sign-in:before {\n  content: \"\\F090\"; }\n\n.fa-trophy:before {\n  content: \"\\F091\"; }\n\n.fa-github-square:before {\n  content: \"\\F092\"; }\n\n.fa-upload:before {\n  content: \"\\F093\"; }\n\n.fa-lemon-o:before {\n  content: \"\\F094\"; }\n\n.fa-phone:before {\n  content: \"\\F095\"; }\n\n.fa-square-o:before {\n  content: \"\\F096\"; }\n\n.fa-bookmark-o:before {\n  content: \"\\F097\"; }\n\n.fa-phone-square:before {\n  content: \"\\F098\"; }\n\n.fa-twitter:before {\n  content: \"\\F099\"; }\n\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\F09A\"; }\n\n.fa-github:before {\n  content: \"\\F09B\"; }\n\n.fa-unlock:before {\n  content: \"\\F09C\"; }\n\n.fa-credit-card:before {\n  content: \"\\F09D\"; }\n\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\F09E\"; }\n\n.fa-hdd-o:before {\n  content: \"\\F0A0\"; }\n\n.fa-bullhorn:before {\n  content: \"\\F0A1\"; }\n\n.fa-bell:before {\n  content: \"\\F0F3\"; }\n\n.fa-certificate:before {\n  content: \"\\F0A3\"; }\n\n.fa-hand-o-right:before {\n  content: \"\\F0A4\"; }\n\n.fa-hand-o-left:before {\n  content: \"\\F0A5\"; }\n\n.fa-hand-o-up:before {\n  content: \"\\F0A6\"; }\n\n.fa-hand-o-down:before {\n  content: \"\\F0A7\"; }\n\n.fa-arrow-circle-left:before {\n  content: \"\\F0A8\"; }\n\n.fa-arrow-circle-right:before {\n  content: \"\\F0A9\"; }\n\n.fa-arrow-circle-up:before {\n  content: \"\\F0AA\"; }\n\n.fa-arrow-circle-down:before {\n  content: \"\\F0AB\"; }\n\n.fa-globe:before {\n  content: \"\\F0AC\"; }\n\n.fa-wrench:before {\n  content: \"\\F0AD\"; }\n\n.fa-tasks:before {\n  content: \"\\F0AE\"; }\n\n.fa-filter:before {\n  content: \"\\F0B0\"; }\n\n.fa-briefcase:before {\n  content: \"\\F0B1\"; }\n\n.fa-arrows-alt:before {\n  content: \"\\F0B2\"; }\n\n.fa-group:before,\n.fa-users:before {\n  content: \"\\F0C0\"; }\n\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\F0C1\"; }\n\n.fa-cloud:before {\n  content: \"\\F0C2\"; }\n\n.fa-flask:before {\n  content: \"\\F0C3\"; }\n\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\F0C4\"; }\n\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\F0C5\"; }\n\n.fa-paperclip:before {\n  content: \"\\F0C6\"; }\n\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\F0C7\"; }\n\n.fa-square:before {\n  content: \"\\F0C8\"; }\n\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\F0C9\"; }\n\n.fa-list-ul:before {\n  content: \"\\F0CA\"; }\n\n.fa-list-ol:before {\n  content: \"\\F0CB\"; }\n\n.fa-strikethrough:before {\n  content: \"\\F0CC\"; }\n\n.fa-underline:before {\n  content: \"\\F0CD\"; }\n\n.fa-table:before {\n  content: \"\\F0CE\"; }\n\n.fa-magic:before {\n  content: \"\\F0D0\"; }\n\n.fa-truck:before {\n  content: \"\\F0D1\"; }\n\n.fa-pinterest:before {\n  content: \"\\F0D2\"; }\n\n.fa-pinterest-square:before {\n  content: \"\\F0D3\"; }\n\n.fa-google-plus-square:before {\n  content: \"\\F0D4\"; }\n\n.fa-google-plus:before {\n  content: \"\\F0D5\"; }\n\n.fa-money:before {\n  content: \"\\F0D6\"; }\n\n.fa-caret-down:before {\n  content: \"\\F0D7\"; }\n\n.fa-caret-up:before {\n  content: \"\\F0D8\"; }\n\n.fa-caret-left:before {\n  content: \"\\F0D9\"; }\n\n.fa-caret-right:before {\n  content: \"\\F0DA\"; }\n\n.fa-columns:before {\n  content: \"\\F0DB\"; }\n\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\F0DC\"; }\n\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\F0DD\"; }\n\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\F0DE\"; }\n\n.fa-envelope:before {\n  content: \"\\F0E0\"; }\n\n.fa-linkedin:before {\n  content: \"\\F0E1\"; }\n\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\F0E2\"; }\n\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\F0E3\"; }\n\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\F0E4\"; }\n\n.fa-comment-o:before {\n  content: \"\\F0E5\"; }\n\n.fa-comments-o:before {\n  content: \"\\F0E6\"; }\n\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\F0E7\"; }\n\n.fa-sitemap:before {\n  content: \"\\F0E8\"; }\n\n.fa-umbrella:before {\n  content: \"\\F0E9\"; }\n\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\F0EA\"; }\n\n.fa-lightbulb-o:before {\n  content: \"\\F0EB\"; }\n\n.fa-exchange:before {\n  content: \"\\F0EC\"; }\n\n.fa-cloud-download:before {\n  content: \"\\F0ED\"; }\n\n.fa-cloud-upload:before {\n  content: \"\\F0EE\"; }\n\n.fa-user-md:before {\n  content: \"\\F0F0\"; }\n\n.fa-stethoscope:before {\n  content: \"\\F0F1\"; }\n\n.fa-suitcase:before {\n  content: \"\\F0F2\"; }\n\n.fa-bell-o:before {\n  content: \"\\F0A2\"; }\n\n.fa-coffee:before {\n  content: \"\\F0F4\"; }\n\n.fa-cutlery:before {\n  content: \"\\F0F5\"; }\n\n.fa-file-text-o:before {\n  content: \"\\F0F6\"; }\n\n.fa-building-o:before {\n  content: \"\\F0F7\"; }\n\n.fa-hospital-o:before {\n  content: \"\\F0F8\"; }\n\n.fa-ambulance:before {\n  content: \"\\F0F9\"; }\n\n.fa-medkit:before {\n  content: \"\\F0FA\"; }\n\n.fa-fighter-jet:before {\n  content: \"\\F0FB\"; }\n\n.fa-beer:before {\n  content: \"\\F0FC\"; }\n\n.fa-h-square:before {\n  content: \"\\F0FD\"; }\n\n.fa-plus-square:before {\n  content: \"\\F0FE\"; }\n\n.fa-angle-double-left:before {\n  content: \"\\F100\"; }\n\n.fa-angle-double-right:before {\n  content: \"\\F101\"; }\n\n.fa-angle-double-up:before {\n  content: \"\\F102\"; }\n\n.fa-angle-double-down:before {\n  content: \"\\F103\"; }\n\n.fa-angle-left:before {\n  content: \"\\F104\"; }\n\n.fa-angle-right:before {\n  content: \"\\F105\"; }\n\n.fa-angle-up:before {\n  content: \"\\F106\"; }\n\n.fa-angle-down:before {\n  content: \"\\F107\"; }\n\n.fa-desktop:before {\n  content: \"\\F108\"; }\n\n.fa-laptop:before {\n  content: \"\\F109\"; }\n\n.fa-tablet:before {\n  content: \"\\F10A\"; }\n\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\F10B\"; }\n\n.fa-circle-o:before {\n  content: \"\\F10C\"; }\n\n.fa-quote-left:before {\n  content: \"\\F10D\"; }\n\n.fa-quote-right:before {\n  content: \"\\F10E\"; }\n\n.fa-spinner:before {\n  content: \"\\F110\"; }\n\n.fa-circle:before {\n  content: \"\\F111\"; }\n\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\F112\"; }\n\n.fa-github-alt:before {\n  content: \"\\F113\"; }\n\n.fa-folder-o:before {\n  content: \"\\F114\"; }\n\n.fa-folder-open-o:before {\n  content: \"\\F115\"; }\n\n.fa-smile-o:before {\n  content: \"\\F118\"; }\n\n.fa-frown-o:before {\n  content: \"\\F119\"; }\n\n.fa-meh-o:before {\n  content: \"\\F11A\"; }\n\n.fa-gamepad:before {\n  content: \"\\F11B\"; }\n\n.fa-keyboard-o:before {\n  content: \"\\F11C\"; }\n\n.fa-flag-o:before {\n  content: \"\\F11D\"; }\n\n.fa-flag-checkered:before {\n  content: \"\\F11E\"; }\n\n.fa-terminal:before {\n  content: \"\\F120\"; }\n\n.fa-code:before {\n  content: \"\\F121\"; }\n\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\F122\"; }\n\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\F123\"; }\n\n.fa-location-arrow:before {\n  content: \"\\F124\"; }\n\n.fa-crop:before {\n  content: \"\\F125\"; }\n\n.fa-code-fork:before {\n  content: \"\\F126\"; }\n\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\F127\"; }\n\n.fa-question:before {\n  content: \"\\F128\"; }\n\n.fa-info:before {\n  content: \"\\F129\"; }\n\n.fa-exclamation:before {\n  content: \"\\F12A\"; }\n\n.fa-superscript:before {\n  content: \"\\F12B\"; }\n\n.fa-subscript:before {\n  content: \"\\F12C\"; }\n\n.fa-eraser:before {\n  content: \"\\F12D\"; }\n\n.fa-puzzle-piece:before {\n  content: \"\\F12E\"; }\n\n.fa-microphone:before {\n  content: \"\\F130\"; }\n\n.fa-microphone-slash:before {\n  content: \"\\F131\"; }\n\n.fa-shield:before {\n  content: \"\\F132\"; }\n\n.fa-calendar-o:before {\n  content: \"\\F133\"; }\n\n.fa-fire-extinguisher:before {\n  content: \"\\F134\"; }\n\n.fa-rocket:before {\n  content: \"\\F135\"; }\n\n.fa-maxcdn:before {\n  content: \"\\F136\"; }\n\n.fa-chevron-circle-left:before {\n  content: \"\\F137\"; }\n\n.fa-chevron-circle-right:before {\n  content: \"\\F138\"; }\n\n.fa-chevron-circle-up:before {\n  content: \"\\F139\"; }\n\n.fa-chevron-circle-down:before {\n  content: \"\\F13A\"; }\n\n.fa-html5:before {\n  content: \"\\F13B\"; }\n\n.fa-css3:before {\n  content: \"\\F13C\"; }\n\n.fa-anchor:before {\n  content: \"\\F13D\"; }\n\n.fa-unlock-alt:before {\n  content: \"\\F13E\"; }\n\n.fa-bullseye:before {\n  content: \"\\F140\"; }\n\n.fa-ellipsis-h:before {\n  content: \"\\F141\"; }\n\n.fa-ellipsis-v:before {\n  content: \"\\F142\"; }\n\n.fa-rss-square:before {\n  content: \"\\F143\"; }\n\n.fa-play-circle:before {\n  content: \"\\F144\"; }\n\n.fa-ticket:before {\n  content: \"\\F145\"; }\n\n.fa-minus-square:before {\n  content: \"\\F146\"; }\n\n.fa-minus-square-o:before {\n  content: \"\\F147\"; }\n\n.fa-level-up:before {\n  content: \"\\F148\"; }\n\n.fa-level-down:before {\n  content: \"\\F149\"; }\n\n.fa-check-square:before {\n  content: \"\\F14A\"; }\n\n.fa-pencil-square:before {\n  content: \"\\F14B\"; }\n\n.fa-external-link-square:before {\n  content: \"\\F14C\"; }\n\n.fa-share-square:before {\n  content: \"\\F14D\"; }\n\n.fa-compass:before {\n  content: \"\\F14E\"; }\n\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\F150\"; }\n\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\F151\"; }\n\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\F152\"; }\n\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\F153\"; }\n\n.fa-gbp:before {\n  content: \"\\F154\"; }\n\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\F155\"; }\n\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\F156\"; }\n\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\F157\"; }\n\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\F158\"; }\n\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\F159\"; }\n\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\F15A\"; }\n\n.fa-file:before {\n  content: \"\\F15B\"; }\n\n.fa-file-text:before {\n  content: \"\\F15C\"; }\n\n.fa-sort-alpha-asc:before {\n  content: \"\\F15D\"; }\n\n.fa-sort-alpha-desc:before {\n  content: \"\\F15E\"; }\n\n.fa-sort-amount-asc:before {\n  content: \"\\F160\"; }\n\n.fa-sort-amount-desc:before {\n  content: \"\\F161\"; }\n\n.fa-sort-numeric-asc:before {\n  content: \"\\F162\"; }\n\n.fa-sort-numeric-desc:before {\n  content: \"\\F163\"; }\n\n.fa-thumbs-up:before {\n  content: \"\\F164\"; }\n\n.fa-thumbs-down:before {\n  content: \"\\F165\"; }\n\n.fa-youtube-square:before {\n  content: \"\\F166\"; }\n\n.fa-youtube:before {\n  content: \"\\F167\"; }\n\n.fa-xing:before {\n  content: \"\\F168\"; }\n\n.fa-xing-square:before {\n  content: \"\\F169\"; }\n\n.fa-youtube-play:before {\n  content: \"\\F16A\"; }\n\n.fa-dropbox:before {\n  content: \"\\F16B\"; }\n\n.fa-stack-overflow:before {\n  content: \"\\F16C\"; }\n\n.fa-instagram:before {\n  content: \"\\F16D\"; }\n\n.fa-flickr:before {\n  content: \"\\F16E\"; }\n\n.fa-adn:before {\n  content: \"\\F170\"; }\n\n.fa-bitbucket:before {\n  content: \"\\F171\"; }\n\n.fa-bitbucket-square:before {\n  content: \"\\F172\"; }\n\n.fa-tumblr:before {\n  content: \"\\F173\"; }\n\n.fa-tumblr-square:before {\n  content: \"\\F174\"; }\n\n.fa-long-arrow-down:before {\n  content: \"\\F175\"; }\n\n.fa-long-arrow-up:before {\n  content: \"\\F176\"; }\n\n.fa-long-arrow-left:before {\n  content: \"\\F177\"; }\n\n.fa-long-arrow-right:before {\n  content: \"\\F178\"; }\n\n.fa-apple:before {\n  content: \"\\F179\"; }\n\n.fa-windows:before {\n  content: \"\\F17A\"; }\n\n.fa-android:before {\n  content: \"\\F17B\"; }\n\n.fa-linux:before {\n  content: \"\\F17C\"; }\n\n.fa-dribbble:before {\n  content: \"\\F17D\"; }\n\n.fa-skype:before {\n  content: \"\\F17E\"; }\n\n.fa-foursquare:before {\n  content: \"\\F180\"; }\n\n.fa-trello:before {\n  content: \"\\F181\"; }\n\n.fa-female:before {\n  content: \"\\F182\"; }\n\n.fa-male:before {\n  content: \"\\F183\"; }\n\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\F184\"; }\n\n.fa-sun-o:before {\n  content: \"\\F185\"; }\n\n.fa-moon-o:before {\n  content: \"\\F186\"; }\n\n.fa-archive:before {\n  content: \"\\F187\"; }\n\n.fa-bug:before {\n  content: \"\\F188\"; }\n\n.fa-vk:before {\n  content: \"\\F189\"; }\n\n.fa-weibo:before {\n  content: \"\\F18A\"; }\n\n.fa-renren:before {\n  content: \"\\F18B\"; }\n\n.fa-pagelines:before {\n  content: \"\\F18C\"; }\n\n.fa-stack-exchange:before {\n  content: \"\\F18D\"; }\n\n.fa-arrow-circle-o-right:before {\n  content: \"\\F18E\"; }\n\n.fa-arrow-circle-o-left:before {\n  content: \"\\F190\"; }\n\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\F191\"; }\n\n.fa-dot-circle-o:before {\n  content: \"\\F192\"; }\n\n.fa-wheelchair:before {\n  content: \"\\F193\"; }\n\n.fa-vimeo-square:before {\n  content: \"\\F194\"; }\n\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\F195\"; }\n\n.fa-plus-square-o:before {\n  content: \"\\F196\"; }\n\n.fa-space-shuttle:before {\n  content: \"\\F197\"; }\n\n.fa-slack:before {\n  content: \"\\F198\"; }\n\n.fa-envelope-square:before {\n  content: \"\\F199\"; }\n\n.fa-wordpress:before {\n  content: \"\\F19A\"; }\n\n.fa-openid:before {\n  content: \"\\F19B\"; }\n\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\F19C\"; }\n\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\F19D\"; }\n\n.fa-yahoo:before {\n  content: \"\\F19E\"; }\n\n.fa-google:before {\n  content: \"\\F1A0\"; }\n\n.fa-reddit:before {\n  content: \"\\F1A1\"; }\n\n.fa-reddit-square:before {\n  content: \"\\F1A2\"; }\n\n.fa-stumbleupon-circle:before {\n  content: \"\\F1A3\"; }\n\n.fa-stumbleupon:before {\n  content: \"\\F1A4\"; }\n\n.fa-delicious:before {\n  content: \"\\F1A5\"; }\n\n.fa-digg:before {\n  content: \"\\F1A6\"; }\n\n.fa-pied-piper-pp:before {\n  content: \"\\F1A7\"; }\n\n.fa-pied-piper-alt:before {\n  content: \"\\F1A8\"; }\n\n.fa-drupal:before {\n  content: \"\\F1A9\"; }\n\n.fa-joomla:before {\n  content: \"\\F1AA\"; }\n\n.fa-language:before {\n  content: \"\\F1AB\"; }\n\n.fa-fax:before {\n  content: \"\\F1AC\"; }\n\n.fa-building:before {\n  content: \"\\F1AD\"; }\n\n.fa-child:before {\n  content: \"\\F1AE\"; }\n\n.fa-paw:before {\n  content: \"\\F1B0\"; }\n\n.fa-spoon:before {\n  content: \"\\F1B1\"; }\n\n.fa-cube:before {\n  content: \"\\F1B2\"; }\n\n.fa-cubes:before {\n  content: \"\\F1B3\"; }\n\n.fa-behance:before {\n  content: \"\\F1B4\"; }\n\n.fa-behance-square:before {\n  content: \"\\F1B5\"; }\n\n.fa-steam:before {\n  content: \"\\F1B6\"; }\n\n.fa-steam-square:before {\n  content: \"\\F1B7\"; }\n\n.fa-recycle:before {\n  content: \"\\F1B8\"; }\n\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\F1B9\"; }\n\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\F1BA\"; }\n\n.fa-tree:before {\n  content: \"\\F1BB\"; }\n\n.fa-spotify:before {\n  content: \"\\F1BC\"; }\n\n.fa-deviantart:before {\n  content: \"\\F1BD\"; }\n\n.fa-soundcloud:before {\n  content: \"\\F1BE\"; }\n\n.fa-database:before {\n  content: \"\\F1C0\"; }\n\n.fa-file-pdf-o:before {\n  content: \"\\F1C1\"; }\n\n.fa-file-word-o:before {\n  content: \"\\F1C2\"; }\n\n.fa-file-excel-o:before {\n  content: \"\\F1C3\"; }\n\n.fa-file-powerpoint-o:before {\n  content: \"\\F1C4\"; }\n\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\F1C5\"; }\n\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\F1C6\"; }\n\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\F1C7\"; }\n\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\F1C8\"; }\n\n.fa-file-code-o:before {\n  content: \"\\F1C9\"; }\n\n.fa-vine:before {\n  content: \"\\F1CA\"; }\n\n.fa-codepen:before {\n  content: \"\\F1CB\"; }\n\n.fa-jsfiddle:before {\n  content: \"\\F1CC\"; }\n\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\F1CD\"; }\n\n.fa-circle-o-notch:before {\n  content: \"\\F1CE\"; }\n\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\F1D0\"; }\n\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\F1D1\"; }\n\n.fa-git-square:before {\n  content: \"\\F1D2\"; }\n\n.fa-git:before {\n  content: \"\\F1D3\"; }\n\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\F1D4\"; }\n\n.fa-tencent-weibo:before {\n  content: \"\\F1D5\"; }\n\n.fa-qq:before {\n  content: \"\\F1D6\"; }\n\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\F1D7\"; }\n\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\F1D8\"; }\n\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\F1D9\"; }\n\n.fa-history:before {\n  content: \"\\F1DA\"; }\n\n.fa-circle-thin:before {\n  content: \"\\F1DB\"; }\n\n.fa-header:before {\n  content: \"\\F1DC\"; }\n\n.fa-paragraph:before {\n  content: \"\\F1DD\"; }\n\n.fa-sliders:before {\n  content: \"\\F1DE\"; }\n\n.fa-share-alt:before {\n  content: \"\\F1E0\"; }\n\n.fa-share-alt-square:before {\n  content: \"\\F1E1\"; }\n\n.fa-bomb:before {\n  content: \"\\F1E2\"; }\n\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\F1E3\"; }\n\n.fa-tty:before {\n  content: \"\\F1E4\"; }\n\n.fa-binoculars:before {\n  content: \"\\F1E5\"; }\n\n.fa-plug:before {\n  content: \"\\F1E6\"; }\n\n.fa-slideshare:before {\n  content: \"\\F1E7\"; }\n\n.fa-twitch:before {\n  content: \"\\F1E8\"; }\n\n.fa-yelp:before {\n  content: \"\\F1E9\"; }\n\n.fa-newspaper-o:before {\n  content: \"\\F1EA\"; }\n\n.fa-wifi:before {\n  content: \"\\F1EB\"; }\n\n.fa-calculator:before {\n  content: \"\\F1EC\"; }\n\n.fa-paypal:before {\n  content: \"\\F1ED\"; }\n\n.fa-google-wallet:before {\n  content: \"\\F1EE\"; }\n\n.fa-cc-visa:before {\n  content: \"\\F1F0\"; }\n\n.fa-cc-mastercard:before {\n  content: \"\\F1F1\"; }\n\n.fa-cc-discover:before {\n  content: \"\\F1F2\"; }\n\n.fa-cc-amex:before {\n  content: \"\\F1F3\"; }\n\n.fa-cc-paypal:before {\n  content: \"\\F1F4\"; }\n\n.fa-cc-stripe:before {\n  content: \"\\F1F5\"; }\n\n.fa-bell-slash:before {\n  content: \"\\F1F6\"; }\n\n.fa-bell-slash-o:before {\n  content: \"\\F1F7\"; }\n\n.fa-trash:before {\n  content: \"\\F1F8\"; }\n\n.fa-copyright:before {\n  content: \"\\F1F9\"; }\n\n.fa-at:before {\n  content: \"\\F1FA\"; }\n\n.fa-eyedropper:before {\n  content: \"\\F1FB\"; }\n\n.fa-paint-brush:before {\n  content: \"\\F1FC\"; }\n\n.fa-birthday-cake:before {\n  content: \"\\F1FD\"; }\n\n.fa-area-chart:before {\n  content: \"\\F1FE\"; }\n\n.fa-pie-chart:before {\n  content: \"\\F200\"; }\n\n.fa-line-chart:before {\n  content: \"\\F201\"; }\n\n.fa-lastfm:before {\n  content: \"\\F202\"; }\n\n.fa-lastfm-square:before {\n  content: \"\\F203\"; }\n\n.fa-toggle-off:before {\n  content: \"\\F204\"; }\n\n.fa-toggle-on:before {\n  content: \"\\F205\"; }\n\n.fa-bicycle:before {\n  content: \"\\F206\"; }\n\n.fa-bus:before {\n  content: \"\\F207\"; }\n\n.fa-ioxhost:before {\n  content: \"\\F208\"; }\n\n.fa-angellist:before {\n  content: \"\\F209\"; }\n\n.fa-cc:before {\n  content: \"\\F20A\"; }\n\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\F20B\"; }\n\n.fa-meanpath:before {\n  content: \"\\F20C\"; }\n\n.fa-buysellads:before {\n  content: \"\\F20D\"; }\n\n.fa-connectdevelop:before {\n  content: \"\\F20E\"; }\n\n.fa-dashcube:before {\n  content: \"\\F210\"; }\n\n.fa-forumbee:before {\n  content: \"\\F211\"; }\n\n.fa-leanpub:before {\n  content: \"\\F212\"; }\n\n.fa-sellsy:before {\n  content: \"\\F213\"; }\n\n.fa-shirtsinbulk:before {\n  content: \"\\F214\"; }\n\n.fa-simplybuilt:before {\n  content: \"\\F215\"; }\n\n.fa-skyatlas:before {\n  content: \"\\F216\"; }\n\n.fa-cart-plus:before {\n  content: \"\\F217\"; }\n\n.fa-cart-arrow-down:before {\n  content: \"\\F218\"; }\n\n.fa-diamond:before {\n  content: \"\\F219\"; }\n\n.fa-ship:before {\n  content: \"\\F21A\"; }\n\n.fa-user-secret:before {\n  content: \"\\F21B\"; }\n\n.fa-motorcycle:before {\n  content: \"\\F21C\"; }\n\n.fa-street-view:before {\n  content: \"\\F21D\"; }\n\n.fa-heartbeat:before {\n  content: \"\\F21E\"; }\n\n.fa-venus:before {\n  content: \"\\F221\"; }\n\n.fa-mars:before {\n  content: \"\\F222\"; }\n\n.fa-mercury:before {\n  content: \"\\F223\"; }\n\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\F224\"; }\n\n.fa-transgender-alt:before {\n  content: \"\\F225\"; }\n\n.fa-venus-double:before {\n  content: \"\\F226\"; }\n\n.fa-mars-double:before {\n  content: \"\\F227\"; }\n\n.fa-venus-mars:before {\n  content: \"\\F228\"; }\n\n.fa-mars-stroke:before {\n  content: \"\\F229\"; }\n\n.fa-mars-stroke-v:before {\n  content: \"\\F22A\"; }\n\n.fa-mars-stroke-h:before {\n  content: \"\\F22B\"; }\n\n.fa-neuter:before {\n  content: \"\\F22C\"; }\n\n.fa-genderless:before {\n  content: \"\\F22D\"; }\n\n.fa-facebook-official:before {\n  content: \"\\F230\"; }\n\n.fa-pinterest-p:before {\n  content: \"\\F231\"; }\n\n.fa-whatsapp:before {\n  content: \"\\F232\"; }\n\n.fa-server:before {\n  content: \"\\F233\"; }\n\n.fa-user-plus:before {\n  content: \"\\F234\"; }\n\n.fa-user-times:before {\n  content: \"\\F235\"; }\n\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\F236\"; }\n\n.fa-viacoin:before {\n  content: \"\\F237\"; }\n\n.fa-train:before {\n  content: \"\\F238\"; }\n\n.fa-subway:before {\n  content: \"\\F239\"; }\n\n.fa-medium:before {\n  content: \"\\F23A\"; }\n\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\F23B\"; }\n\n.fa-optin-monster:before {\n  content: \"\\F23C\"; }\n\n.fa-opencart:before {\n  content: \"\\F23D\"; }\n\n.fa-expeditedssl:before {\n  content: \"\\F23E\"; }\n\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\F240\"; }\n\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\F241\"; }\n\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\F242\"; }\n\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\F243\"; }\n\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\F244\"; }\n\n.fa-mouse-pointer:before {\n  content: \"\\F245\"; }\n\n.fa-i-cursor:before {\n  content: \"\\F246\"; }\n\n.fa-object-group:before {\n  content: \"\\F247\"; }\n\n.fa-object-ungroup:before {\n  content: \"\\F248\"; }\n\n.fa-sticky-note:before {\n  content: \"\\F249\"; }\n\n.fa-sticky-note-o:before {\n  content: \"\\F24A\"; }\n\n.fa-cc-jcb:before {\n  content: \"\\F24B\"; }\n\n.fa-cc-diners-club:before {\n  content: \"\\F24C\"; }\n\n.fa-clone:before {\n  content: \"\\F24D\"; }\n\n.fa-balance-scale:before {\n  content: \"\\F24E\"; }\n\n.fa-hourglass-o:before {\n  content: \"\\F250\"; }\n\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\F251\"; }\n\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\F252\"; }\n\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\F253\"; }\n\n.fa-hourglass:before {\n  content: \"\\F254\"; }\n\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\F255\"; }\n\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\F256\"; }\n\n.fa-hand-scissors-o:before {\n  content: \"\\F257\"; }\n\n.fa-hand-lizard-o:before {\n  content: \"\\F258\"; }\n\n.fa-hand-spock-o:before {\n  content: \"\\F259\"; }\n\n.fa-hand-pointer-o:before {\n  content: \"\\F25A\"; }\n\n.fa-hand-peace-o:before {\n  content: \"\\F25B\"; }\n\n.fa-trademark:before {\n  content: \"\\F25C\"; }\n\n.fa-registered:before {\n  content: \"\\F25D\"; }\n\n.fa-creative-commons:before {\n  content: \"\\F25E\"; }\n\n.fa-gg:before {\n  content: \"\\F260\"; }\n\n.fa-gg-circle:before {\n  content: \"\\F261\"; }\n\n.fa-tripadvisor:before {\n  content: \"\\F262\"; }\n\n.fa-odnoklassniki:before {\n  content: \"\\F263\"; }\n\n.fa-odnoklassniki-square:before {\n  content: \"\\F264\"; }\n\n.fa-get-pocket:before {\n  content: \"\\F265\"; }\n\n.fa-wikipedia-w:before {\n  content: \"\\F266\"; }\n\n.fa-safari:before {\n  content: \"\\F267\"; }\n\n.fa-chrome:before {\n  content: \"\\F268\"; }\n\n.fa-firefox:before {\n  content: \"\\F269\"; }\n\n.fa-opera:before {\n  content: \"\\F26A\"; }\n\n.fa-internet-explorer:before {\n  content: \"\\F26B\"; }\n\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\F26C\"; }\n\n.fa-contao:before {\n  content: \"\\F26D\"; }\n\n.fa-500px:before {\n  content: \"\\F26E\"; }\n\n.fa-amazon:before {\n  content: \"\\F270\"; }\n\n.fa-calendar-plus-o:before {\n  content: \"\\F271\"; }\n\n.fa-calendar-minus-o:before {\n  content: \"\\F272\"; }\n\n.fa-calendar-times-o:before {\n  content: \"\\F273\"; }\n\n.fa-calendar-check-o:before {\n  content: \"\\F274\"; }\n\n.fa-industry:before {\n  content: \"\\F275\"; }\n\n.fa-map-pin:before {\n  content: \"\\F276\"; }\n\n.fa-map-signs:before {\n  content: \"\\F277\"; }\n\n.fa-map-o:before {\n  content: \"\\F278\"; }\n\n.fa-map:before {\n  content: \"\\F279\"; }\n\n.fa-commenting:before {\n  content: \"\\F27A\"; }\n\n.fa-commenting-o:before {\n  content: \"\\F27B\"; }\n\n.fa-houzz:before {\n  content: \"\\F27C\"; }\n\n.fa-vimeo:before {\n  content: \"\\F27D\"; }\n\n.fa-black-tie:before {\n  content: \"\\F27E\"; }\n\n.fa-fonticons:before {\n  content: \"\\F280\"; }\n\n.fa-reddit-alien:before {\n  content: \"\\F281\"; }\n\n.fa-edge:before {\n  content: \"\\F282\"; }\n\n.fa-credit-card-alt:before {\n  content: \"\\F283\"; }\n\n.fa-codiepie:before {\n  content: \"\\F284\"; }\n\n.fa-modx:before {\n  content: \"\\F285\"; }\n\n.fa-fort-awesome:before {\n  content: \"\\F286\"; }\n\n.fa-usb:before {\n  content: \"\\F287\"; }\n\n.fa-product-hunt:before {\n  content: \"\\F288\"; }\n\n.fa-mixcloud:before {\n  content: \"\\F289\"; }\n\n.fa-scribd:before {\n  content: \"\\F28A\"; }\n\n.fa-pause-circle:before {\n  content: \"\\F28B\"; }\n\n.fa-pause-circle-o:before {\n  content: \"\\F28C\"; }\n\n.fa-stop-circle:before {\n  content: \"\\F28D\"; }\n\n.fa-stop-circle-o:before {\n  content: \"\\F28E\"; }\n\n.fa-shopping-bag:before {\n  content: \"\\F290\"; }\n\n.fa-shopping-basket:before {\n  content: \"\\F291\"; }\n\n.fa-hashtag:before {\n  content: \"\\F292\"; }\n\n.fa-bluetooth:before {\n  content: \"\\F293\"; }\n\n.fa-bluetooth-b:before {\n  content: \"\\F294\"; }\n\n.fa-percent:before {\n  content: \"\\F295\"; }\n\n.fa-gitlab:before {\n  content: \"\\F296\"; }\n\n.fa-wpbeginner:before {\n  content: \"\\F297\"; }\n\n.fa-wpforms:before {\n  content: \"\\F298\"; }\n\n.fa-envira:before {\n  content: \"\\F299\"; }\n\n.fa-universal-access:before {\n  content: \"\\F29A\"; }\n\n.fa-wheelchair-alt:before {\n  content: \"\\F29B\"; }\n\n.fa-question-circle-o:before {\n  content: \"\\F29C\"; }\n\n.fa-blind:before {\n  content: \"\\F29D\"; }\n\n.fa-audio-description:before {\n  content: \"\\F29E\"; }\n\n.fa-volume-control-phone:before {\n  content: \"\\F2A0\"; }\n\n.fa-braille:before {\n  content: \"\\F2A1\"; }\n\n.fa-assistive-listening-systems:before {\n  content: \"\\F2A2\"; }\n\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\F2A3\"; }\n\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\F2A4\"; }\n\n.fa-glide:before {\n  content: \"\\F2A5\"; }\n\n.fa-glide-g:before {\n  content: \"\\F2A6\"; }\n\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\F2A7\"; }\n\n.fa-low-vision:before {\n  content: \"\\F2A8\"; }\n\n.fa-viadeo:before {\n  content: \"\\F2A9\"; }\n\n.fa-viadeo-square:before {\n  content: \"\\F2AA\"; }\n\n.fa-snapchat:before {\n  content: \"\\F2AB\"; }\n\n.fa-snapchat-ghost:before {\n  content: \"\\F2AC\"; }\n\n.fa-snapchat-square:before {\n  content: \"\\F2AD\"; }\n\n.fa-pied-piper:before {\n  content: \"\\F2AE\"; }\n\n.fa-first-order:before {\n  content: \"\\F2B0\"; }\n\n.fa-yoast:before {\n  content: \"\\F2B1\"; }\n\n.fa-themeisle:before {\n  content: \"\\F2B2\"; }\n\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\F2B3\"; }\n\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\F2B4\"; }\n\n.fa-handshake-o:before {\n  content: \"\\F2B5\"; }\n\n.fa-envelope-open:before {\n  content: \"\\F2B6\"; }\n\n.fa-envelope-open-o:before {\n  content: \"\\F2B7\"; }\n\n.fa-linode:before {\n  content: \"\\F2B8\"; }\n\n.fa-address-book:before {\n  content: \"\\F2B9\"; }\n\n.fa-address-book-o:before {\n  content: \"\\F2BA\"; }\n\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\F2BB\"; }\n\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\F2BC\"; }\n\n.fa-user-circle:before {\n  content: \"\\F2BD\"; }\n\n.fa-user-circle-o:before {\n  content: \"\\F2BE\"; }\n\n.fa-user-o:before {\n  content: \"\\F2C0\"; }\n\n.fa-id-badge:before {\n  content: \"\\F2C1\"; }\n\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\F2C2\"; }\n\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\F2C3\"; }\n\n.fa-quora:before {\n  content: \"\\F2C4\"; }\n\n.fa-free-code-camp:before {\n  content: \"\\F2C5\"; }\n\n.fa-telegram:before {\n  content: \"\\F2C6\"; }\n\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\F2C7\"; }\n\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\F2C8\"; }\n\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\F2C9\"; }\n\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\F2CA\"; }\n\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\F2CB\"; }\n\n.fa-shower:before {\n  content: \"\\F2CC\"; }\n\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\F2CD\"; }\n\n.fa-podcast:before {\n  content: \"\\F2CE\"; }\n\n.fa-window-maximize:before {\n  content: \"\\F2D0\"; }\n\n.fa-window-minimize:before {\n  content: \"\\F2D1\"; }\n\n.fa-window-restore:before {\n  content: \"\\F2D2\"; }\n\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\F2D3\"; }\n\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\F2D4\"; }\n\n.fa-bandcamp:before {\n  content: \"\\F2D5\"; }\n\n.fa-grav:before {\n  content: \"\\F2D6\"; }\n\n.fa-etsy:before {\n  content: \"\\F2D7\"; }\n\n.fa-imdb:before {\n  content: \"\\F2D8\"; }\n\n.fa-ravelry:before {\n  content: \"\\F2D9\"; }\n\n.fa-eercast:before {\n  content: \"\\F2DA\"; }\n\n.fa-microchip:before {\n  content: \"\\F2DB\"; }\n\n.fa-snowflake-o:before {\n  content: \"\\F2DC\"; }\n\n.fa-superpowers:before {\n  content: \"\\F2DD\"; }\n\n.fa-wpexplorer:before {\n  content: \"\\F2DE\"; }\n\n.fa-meetup:before {\n  content: \"\\F2E0\"; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n/*!\n  Ionicons, v2.0.1\n  Created by Ben Sperry for the Ionic Framework, http://ionicons.com/\n  https://twitter.com/benjsperry  https://twitter.com/ionicframework\n  MIT License: https://github.com/driftyco/ionicons\n\n  Android-style icons originally built by Google’s\n  Material Design Icons: https://github.com/google/material-design-icons\n  used under CC BY http://creativecommons.org/licenses/by/4.0/\n  Modified icons to fit ionicon’s grid from original.\n*/\n@font-face {\n  font-family: \"Ionicons\";\n  src: url(" + __webpack_require__("./node_modules/ionicons/fonts/ionicons.eot?v=2.0.1") + ");\n  src: url(" + __webpack_require__("./node_modules/ionicons/fonts/ionicons.eot?v=2.0.1") + "#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__("./node_modules/ionicons/fonts/ionicons.ttf?v=2.0.1") + ") format(\"truetype\"), url(" + __webpack_require__("./node_modules/ionicons/fonts/ionicons.woff?v=2.0.1") + ") format(\"woff\"), url(" + __webpack_require__("./node_modules/ionicons/fonts/ionicons.svg?v=2.0.1") + "#Ionicons) format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.ion, .ionicons,\n.ion-alert:before,\n.ion-alert-circled:before,\n.ion-android-add:before,\n.ion-android-add-circle:before,\n.ion-android-alarm-clock:before,\n.ion-android-alert:before,\n.ion-android-apps:before,\n.ion-android-archive:before,\n.ion-android-arrow-back:before,\n.ion-android-arrow-down:before,\n.ion-android-arrow-dropdown:before,\n.ion-android-arrow-dropdown-circle:before,\n.ion-android-arrow-dropleft:before,\n.ion-android-arrow-dropleft-circle:before,\n.ion-android-arrow-dropright:before,\n.ion-android-arrow-dropright-circle:before,\n.ion-android-arrow-dropup:before,\n.ion-android-arrow-dropup-circle:before,\n.ion-android-arrow-forward:before,\n.ion-android-arrow-up:before,\n.ion-android-attach:before,\n.ion-android-bar:before,\n.ion-android-bicycle:before,\n.ion-android-boat:before,\n.ion-android-bookmark:before,\n.ion-android-bulb:before,\n.ion-android-bus:before,\n.ion-android-calendar:before,\n.ion-android-call:before,\n.ion-android-camera:before,\n.ion-android-cancel:before,\n.ion-android-car:before,\n.ion-android-cart:before,\n.ion-android-chat:before,\n.ion-android-checkbox:before,\n.ion-android-checkbox-blank:before,\n.ion-android-checkbox-outline:before,\n.ion-android-checkbox-outline-blank:before,\n.ion-android-checkmark-circle:before,\n.ion-android-clipboard:before,\n.ion-android-close:before,\n.ion-android-cloud:before,\n.ion-android-cloud-circle:before,\n.ion-android-cloud-done:before,\n.ion-android-cloud-outline:before,\n.ion-android-color-palette:before,\n.ion-android-compass:before,\n.ion-android-contact:before,\n.ion-android-contacts:before,\n.ion-android-contract:before,\n.ion-android-create:before,\n.ion-android-delete:before,\n.ion-android-desktop:before,\n.ion-android-document:before,\n.ion-android-done:before,\n.ion-android-done-all:before,\n.ion-android-download:before,\n.ion-android-drafts:before,\n.ion-android-exit:before,\n.ion-android-expand:before,\n.ion-android-favorite:before,\n.ion-android-favorite-outline:before,\n.ion-android-film:before,\n.ion-android-folder:before,\n.ion-android-folder-open:before,\n.ion-android-funnel:before,\n.ion-android-globe:before,\n.ion-android-hand:before,\n.ion-android-hangout:before,\n.ion-android-happy:before,\n.ion-android-home:before,\n.ion-android-image:before,\n.ion-android-laptop:before,\n.ion-android-list:before,\n.ion-android-locate:before,\n.ion-android-lock:before,\n.ion-android-mail:before,\n.ion-android-map:before,\n.ion-android-menu:before,\n.ion-android-microphone:before,\n.ion-android-microphone-off:before,\n.ion-android-more-horizontal:before,\n.ion-android-more-vertical:before,\n.ion-android-navigate:before,\n.ion-android-notifications:before,\n.ion-android-notifications-none:before,\n.ion-android-notifications-off:before,\n.ion-android-open:before,\n.ion-android-options:before,\n.ion-android-people:before,\n.ion-android-person:before,\n.ion-android-person-add:before,\n.ion-android-phone-landscape:before,\n.ion-android-phone-portrait:before,\n.ion-android-pin:before,\n.ion-android-plane:before,\n.ion-android-playstore:before,\n.ion-android-print:before,\n.ion-android-radio-button-off:before,\n.ion-android-radio-button-on:before,\n.ion-android-refresh:before,\n.ion-android-remove:before,\n.ion-android-remove-circle:before,\n.ion-android-restaurant:before,\n.ion-android-sad:before,\n.ion-android-search:before,\n.ion-android-send:before,\n.ion-android-settings:before,\n.ion-android-share:before,\n.ion-android-share-alt:before,\n.ion-android-star:before,\n.ion-android-star-half:before,\n.ion-android-star-outline:before,\n.ion-android-stopwatch:before,\n.ion-android-subway:before,\n.ion-android-sunny:before,\n.ion-android-sync:before,\n.ion-android-textsms:before,\n.ion-android-time:before,\n.ion-android-train:before,\n.ion-android-unlock:before,\n.ion-android-upload:before,\n.ion-android-volume-down:before,\n.ion-android-volume-mute:before,\n.ion-android-volume-off:before,\n.ion-android-volume-up:before,\n.ion-android-walk:before,\n.ion-android-warning:before,\n.ion-android-watch:before,\n.ion-android-wifi:before,\n.ion-aperture:before,\n.ion-archive:before,\n.ion-arrow-down-a:before,\n.ion-arrow-down-b:before,\n.ion-arrow-down-c:before,\n.ion-arrow-expand:before,\n.ion-arrow-graph-down-left:before,\n.ion-arrow-graph-down-right:before,\n.ion-arrow-graph-up-left:before,\n.ion-arrow-graph-up-right:before,\n.ion-arrow-left-a:before,\n.ion-arrow-left-b:before,\n.ion-arrow-left-c:before,\n.ion-arrow-move:before,\n.ion-arrow-resize:before,\n.ion-arrow-return-left:before,\n.ion-arrow-return-right:before,\n.ion-arrow-right-a:before,\n.ion-arrow-right-b:before,\n.ion-arrow-right-c:before,\n.ion-arrow-shrink:before,\n.ion-arrow-swap:before,\n.ion-arrow-up-a:before,\n.ion-arrow-up-b:before,\n.ion-arrow-up-c:before,\n.ion-asterisk:before,\n.ion-at:before,\n.ion-backspace:before,\n.ion-backspace-outline:before,\n.ion-bag:before,\n.ion-battery-charging:before,\n.ion-battery-empty:before,\n.ion-battery-full:before,\n.ion-battery-half:before,\n.ion-battery-low:before,\n.ion-beaker:before,\n.ion-beer:before,\n.ion-bluetooth:before,\n.ion-bonfire:before,\n.ion-bookmark:before,\n.ion-bowtie:before,\n.ion-briefcase:before,\n.ion-bug:before,\n.ion-calculator:before,\n.ion-calendar:before,\n.ion-camera:before,\n.ion-card:before,\n.ion-cash:before,\n.ion-chatbox:before,\n.ion-chatbox-working:before,\n.ion-chatboxes:before,\n.ion-chatbubble:before,\n.ion-chatbubble-working:before,\n.ion-chatbubbles:before,\n.ion-checkmark:before,\n.ion-checkmark-circled:before,\n.ion-checkmark-round:before,\n.ion-chevron-down:before,\n.ion-chevron-left:before,\n.ion-chevron-right:before,\n.ion-chevron-up:before,\n.ion-clipboard:before,\n.ion-clock:before,\n.ion-close:before,\n.ion-close-circled:before,\n.ion-close-round:before,\n.ion-closed-captioning:before,\n.ion-cloud:before,\n.ion-code:before,\n.ion-code-download:before,\n.ion-code-working:before,\n.ion-coffee:before,\n.ion-compass:before,\n.ion-compose:before,\n.ion-connection-bars:before,\n.ion-contrast:before,\n.ion-crop:before,\n.ion-cube:before,\n.ion-disc:before,\n.ion-document:before,\n.ion-document-text:before,\n.ion-drag:before,\n.ion-earth:before,\n.ion-easel:before,\n.ion-edit:before,\n.ion-egg:before,\n.ion-eject:before,\n.ion-email:before,\n.ion-email-unread:before,\n.ion-erlenmeyer-flask:before,\n.ion-erlenmeyer-flask-bubbles:before,\n.ion-eye:before,\n.ion-eye-disabled:before,\n.ion-female:before,\n.ion-filing:before,\n.ion-film-marker:before,\n.ion-fireball:before,\n.ion-flag:before,\n.ion-flame:before,\n.ion-flash:before,\n.ion-flash-off:before,\n.ion-folder:before,\n.ion-fork:before,\n.ion-fork-repo:before,\n.ion-forward:before,\n.ion-funnel:before,\n.ion-gear-a:before,\n.ion-gear-b:before,\n.ion-grid:before,\n.ion-hammer:before,\n.ion-happy:before,\n.ion-happy-outline:before,\n.ion-headphone:before,\n.ion-heart:before,\n.ion-heart-broken:before,\n.ion-help:before,\n.ion-help-buoy:before,\n.ion-help-circled:before,\n.ion-home:before,\n.ion-icecream:before,\n.ion-image:before,\n.ion-images:before,\n.ion-information:before,\n.ion-information-circled:before,\n.ion-ionic:before,\n.ion-ios-alarm:before,\n.ion-ios-alarm-outline:before,\n.ion-ios-albums:before,\n.ion-ios-albums-outline:before,\n.ion-ios-americanfootball:before,\n.ion-ios-americanfootball-outline:before,\n.ion-ios-analytics:before,\n.ion-ios-analytics-outline:before,\n.ion-ios-arrow-back:before,\n.ion-ios-arrow-down:before,\n.ion-ios-arrow-forward:before,\n.ion-ios-arrow-left:before,\n.ion-ios-arrow-right:before,\n.ion-ios-arrow-thin-down:before,\n.ion-ios-arrow-thin-left:before,\n.ion-ios-arrow-thin-right:before,\n.ion-ios-arrow-thin-up:before,\n.ion-ios-arrow-up:before,\n.ion-ios-at:before,\n.ion-ios-at-outline:before,\n.ion-ios-barcode:before,\n.ion-ios-barcode-outline:before,\n.ion-ios-baseball:before,\n.ion-ios-baseball-outline:before,\n.ion-ios-basketball:before,\n.ion-ios-basketball-outline:before,\n.ion-ios-bell:before,\n.ion-ios-bell-outline:before,\n.ion-ios-body:before,\n.ion-ios-body-outline:before,\n.ion-ios-bolt:before,\n.ion-ios-bolt-outline:before,\n.ion-ios-book:before,\n.ion-ios-book-outline:before,\n.ion-ios-bookmarks:before,\n.ion-ios-bookmarks-outline:before,\n.ion-ios-box:before,\n.ion-ios-box-outline:before,\n.ion-ios-briefcase:before,\n.ion-ios-briefcase-outline:before,\n.ion-ios-browsers:before,\n.ion-ios-browsers-outline:before,\n.ion-ios-calculator:before,\n.ion-ios-calculator-outline:before,\n.ion-ios-calendar:before,\n.ion-ios-calendar-outline:before,\n.ion-ios-camera:before,\n.ion-ios-camera-outline:before,\n.ion-ios-cart:before,\n.ion-ios-cart-outline:before,\n.ion-ios-chatboxes:before,\n.ion-ios-chatboxes-outline:before,\n.ion-ios-chatbubble:before,\n.ion-ios-chatbubble-outline:before,\n.ion-ios-checkmark:before,\n.ion-ios-checkmark-empty:before,\n.ion-ios-checkmark-outline:before,\n.ion-ios-circle-filled:before,\n.ion-ios-circle-outline:before,\n.ion-ios-clock:before,\n.ion-ios-clock-outline:before,\n.ion-ios-close:before,\n.ion-ios-close-empty:before,\n.ion-ios-close-outline:before,\n.ion-ios-cloud:before,\n.ion-ios-cloud-download:before,\n.ion-ios-cloud-download-outline:before,\n.ion-ios-cloud-outline:before,\n.ion-ios-cloud-upload:before,\n.ion-ios-cloud-upload-outline:before,\n.ion-ios-cloudy:before,\n.ion-ios-cloudy-night:before,\n.ion-ios-cloudy-night-outline:before,\n.ion-ios-cloudy-outline:before,\n.ion-ios-cog:before,\n.ion-ios-cog-outline:before,\n.ion-ios-color-filter:before,\n.ion-ios-color-filter-outline:before,\n.ion-ios-color-wand:before,\n.ion-ios-color-wand-outline:before,\n.ion-ios-compose:before,\n.ion-ios-compose-outline:before,\n.ion-ios-contact:before,\n.ion-ios-contact-outline:before,\n.ion-ios-copy:before,\n.ion-ios-copy-outline:before,\n.ion-ios-crop:before,\n.ion-ios-crop-strong:before,\n.ion-ios-download:before,\n.ion-ios-download-outline:before,\n.ion-ios-drag:before,\n.ion-ios-email:before,\n.ion-ios-email-outline:before,\n.ion-ios-eye:before,\n.ion-ios-eye-outline:before,\n.ion-ios-fastforward:before,\n.ion-ios-fastforward-outline:before,\n.ion-ios-filing:before,\n.ion-ios-filing-outline:before,\n.ion-ios-film:before,\n.ion-ios-film-outline:before,\n.ion-ios-flag:before,\n.ion-ios-flag-outline:before,\n.ion-ios-flame:before,\n.ion-ios-flame-outline:before,\n.ion-ios-flask:before,\n.ion-ios-flask-outline:before,\n.ion-ios-flower:before,\n.ion-ios-flower-outline:before,\n.ion-ios-folder:before,\n.ion-ios-folder-outline:before,\n.ion-ios-football:before,\n.ion-ios-football-outline:before,\n.ion-ios-game-controller-a:before,\n.ion-ios-game-controller-a-outline:before,\n.ion-ios-game-controller-b:before,\n.ion-ios-game-controller-b-outline:before,\n.ion-ios-gear:before,\n.ion-ios-gear-outline:before,\n.ion-ios-glasses:before,\n.ion-ios-glasses-outline:before,\n.ion-ios-grid-view:before,\n.ion-ios-grid-view-outline:before,\n.ion-ios-heart:before,\n.ion-ios-heart-outline:before,\n.ion-ios-help:before,\n.ion-ios-help-empty:before,\n.ion-ios-help-outline:before,\n.ion-ios-home:before,\n.ion-ios-home-outline:before,\n.ion-ios-infinite:before,\n.ion-ios-infinite-outline:before,\n.ion-ios-information:before,\n.ion-ios-information-empty:before,\n.ion-ios-information-outline:before,\n.ion-ios-ionic-outline:before,\n.ion-ios-keypad:before,\n.ion-ios-keypad-outline:before,\n.ion-ios-lightbulb:before,\n.ion-ios-lightbulb-outline:before,\n.ion-ios-list:before,\n.ion-ios-list-outline:before,\n.ion-ios-location:before,\n.ion-ios-location-outline:before,\n.ion-ios-locked:before,\n.ion-ios-locked-outline:before,\n.ion-ios-loop:before,\n.ion-ios-loop-strong:before,\n.ion-ios-medical:before,\n.ion-ios-medical-outline:before,\n.ion-ios-medkit:before,\n.ion-ios-medkit-outline:before,\n.ion-ios-mic:before,\n.ion-ios-mic-off:before,\n.ion-ios-mic-outline:before,\n.ion-ios-minus:before,\n.ion-ios-minus-empty:before,\n.ion-ios-minus-outline:before,\n.ion-ios-monitor:before,\n.ion-ios-monitor-outline:before,\n.ion-ios-moon:before,\n.ion-ios-moon-outline:before,\n.ion-ios-more:before,\n.ion-ios-more-outline:before,\n.ion-ios-musical-note:before,\n.ion-ios-musical-notes:before,\n.ion-ios-navigate:before,\n.ion-ios-navigate-outline:before,\n.ion-ios-nutrition:before,\n.ion-ios-nutrition-outline:before,\n.ion-ios-paper:before,\n.ion-ios-paper-outline:before,\n.ion-ios-paperplane:before,\n.ion-ios-paperplane-outline:before,\n.ion-ios-partlysunny:before,\n.ion-ios-partlysunny-outline:before,\n.ion-ios-pause:before,\n.ion-ios-pause-outline:before,\n.ion-ios-paw:before,\n.ion-ios-paw-outline:before,\n.ion-ios-people:before,\n.ion-ios-people-outline:before,\n.ion-ios-person:before,\n.ion-ios-person-outline:before,\n.ion-ios-personadd:before,\n.ion-ios-personadd-outline:before,\n.ion-ios-photos:before,\n.ion-ios-photos-outline:before,\n.ion-ios-pie:before,\n.ion-ios-pie-outline:before,\n.ion-ios-pint:before,\n.ion-ios-pint-outline:before,\n.ion-ios-play:before,\n.ion-ios-play-outline:before,\n.ion-ios-plus:before,\n.ion-ios-plus-empty:before,\n.ion-ios-plus-outline:before,\n.ion-ios-pricetag:before,\n.ion-ios-pricetag-outline:before,\n.ion-ios-pricetags:before,\n.ion-ios-pricetags-outline:before,\n.ion-ios-printer:before,\n.ion-ios-printer-outline:before,\n.ion-ios-pulse:before,\n.ion-ios-pulse-strong:before,\n.ion-ios-rainy:before,\n.ion-ios-rainy-outline:before,\n.ion-ios-recording:before,\n.ion-ios-recording-outline:before,\n.ion-ios-redo:before,\n.ion-ios-redo-outline:before,\n.ion-ios-refresh:before,\n.ion-ios-refresh-empty:before,\n.ion-ios-refresh-outline:before,\n.ion-ios-reload:before,\n.ion-ios-reverse-camera:before,\n.ion-ios-reverse-camera-outline:before,\n.ion-ios-rewind:before,\n.ion-ios-rewind-outline:before,\n.ion-ios-rose:before,\n.ion-ios-rose-outline:before,\n.ion-ios-search:before,\n.ion-ios-search-strong:before,\n.ion-ios-settings:before,\n.ion-ios-settings-strong:before,\n.ion-ios-shuffle:before,\n.ion-ios-shuffle-strong:before,\n.ion-ios-skipbackward:before,\n.ion-ios-skipbackward-outline:before,\n.ion-ios-skipforward:before,\n.ion-ios-skipforward-outline:before,\n.ion-ios-snowy:before,\n.ion-ios-speedometer:before,\n.ion-ios-speedometer-outline:before,\n.ion-ios-star:before,\n.ion-ios-star-half:before,\n.ion-ios-star-outline:before,\n.ion-ios-stopwatch:before,\n.ion-ios-stopwatch-outline:before,\n.ion-ios-sunny:before,\n.ion-ios-sunny-outline:before,\n.ion-ios-telephone:before,\n.ion-ios-telephone-outline:before,\n.ion-ios-tennisball:before,\n.ion-ios-tennisball-outline:before,\n.ion-ios-thunderstorm:before,\n.ion-ios-thunderstorm-outline:before,\n.ion-ios-time:before,\n.ion-ios-time-outline:before,\n.ion-ios-timer:before,\n.ion-ios-timer-outline:before,\n.ion-ios-toggle:before,\n.ion-ios-toggle-outline:before,\n.ion-ios-trash:before,\n.ion-ios-trash-outline:before,\n.ion-ios-undo:before,\n.ion-ios-undo-outline:before,\n.ion-ios-unlocked:before,\n.ion-ios-unlocked-outline:before,\n.ion-ios-upload:before,\n.ion-ios-upload-outline:before,\n.ion-ios-videocam:before,\n.ion-ios-videocam-outline:before,\n.ion-ios-volume-high:before,\n.ion-ios-volume-low:before,\n.ion-ios-wineglass:before,\n.ion-ios-wineglass-outline:before,\n.ion-ios-world:before,\n.ion-ios-world-outline:before,\n.ion-ipad:before,\n.ion-iphone:before,\n.ion-ipod:before,\n.ion-jet:before,\n.ion-key:before,\n.ion-knife:before,\n.ion-laptop:before,\n.ion-leaf:before,\n.ion-levels:before,\n.ion-lightbulb:before,\n.ion-link:before,\n.ion-load-a:before,\n.ion-load-b:before,\n.ion-load-c:before,\n.ion-load-d:before,\n.ion-location:before,\n.ion-lock-combination:before,\n.ion-locked:before,\n.ion-log-in:before,\n.ion-log-out:before,\n.ion-loop:before,\n.ion-magnet:before,\n.ion-male:before,\n.ion-man:before,\n.ion-map:before,\n.ion-medkit:before,\n.ion-merge:before,\n.ion-mic-a:before,\n.ion-mic-b:before,\n.ion-mic-c:before,\n.ion-minus:before,\n.ion-minus-circled:before,\n.ion-minus-round:before,\n.ion-model-s:before,\n.ion-monitor:before,\n.ion-more:before,\n.ion-mouse:before,\n.ion-music-note:before,\n.ion-navicon:before,\n.ion-navicon-round:before,\n.ion-navigate:before,\n.ion-network:before,\n.ion-no-smoking:before,\n.ion-nuclear:before,\n.ion-outlet:before,\n.ion-paintbrush:before,\n.ion-paintbucket:before,\n.ion-paper-airplane:before,\n.ion-paperclip:before,\n.ion-pause:before,\n.ion-person:before,\n.ion-person-add:before,\n.ion-person-stalker:before,\n.ion-pie-graph:before,\n.ion-pin:before,\n.ion-pinpoint:before,\n.ion-pizza:before,\n.ion-plane:before,\n.ion-planet:before,\n.ion-play:before,\n.ion-playstation:before,\n.ion-plus:before,\n.ion-plus-circled:before,\n.ion-plus-round:before,\n.ion-podium:before,\n.ion-pound:before,\n.ion-power:before,\n.ion-pricetag:before,\n.ion-pricetags:before,\n.ion-printer:before,\n.ion-pull-request:before,\n.ion-qr-scanner:before,\n.ion-quote:before,\n.ion-radio-waves:before,\n.ion-record:before,\n.ion-refresh:before,\n.ion-reply:before,\n.ion-reply-all:before,\n.ion-ribbon-a:before,\n.ion-ribbon-b:before,\n.ion-sad:before,\n.ion-sad-outline:before,\n.ion-scissors:before,\n.ion-search:before,\n.ion-settings:before,\n.ion-share:before,\n.ion-shuffle:before,\n.ion-skip-backward:before,\n.ion-skip-forward:before,\n.ion-social-android:before,\n.ion-social-android-outline:before,\n.ion-social-angular:before,\n.ion-social-angular-outline:before,\n.ion-social-apple:before,\n.ion-social-apple-outline:before,\n.ion-social-bitcoin:before,\n.ion-social-bitcoin-outline:before,\n.ion-social-buffer:before,\n.ion-social-buffer-outline:before,\n.ion-social-chrome:before,\n.ion-social-chrome-outline:before,\n.ion-social-codepen:before,\n.ion-social-codepen-outline:before,\n.ion-social-css3:before,\n.ion-social-css3-outline:before,\n.ion-social-designernews:before,\n.ion-social-designernews-outline:before,\n.ion-social-dribbble:before,\n.ion-social-dribbble-outline:before,\n.ion-social-dropbox:before,\n.ion-social-dropbox-outline:before,\n.ion-social-euro:before,\n.ion-social-euro-outline:before,\n.ion-social-facebook:before,\n.ion-social-facebook-outline:before,\n.ion-social-foursquare:before,\n.ion-social-foursquare-outline:before,\n.ion-social-freebsd-devil:before,\n.ion-social-github:before,\n.ion-social-github-outline:before,\n.ion-social-google:before,\n.ion-social-google-outline:before,\n.ion-social-googleplus:before,\n.ion-social-googleplus-outline:before,\n.ion-social-hackernews:before,\n.ion-social-hackernews-outline:before,\n.ion-social-html5:before,\n.ion-social-html5-outline:before,\n.ion-social-instagram:before,\n.ion-social-instagram-outline:before,\n.ion-social-javascript:before,\n.ion-social-javascript-outline:before,\n.ion-social-linkedin:before,\n.ion-social-linkedin-outline:before,\n.ion-social-markdown:before,\n.ion-social-nodejs:before,\n.ion-social-octocat:before,\n.ion-social-pinterest:before,\n.ion-social-pinterest-outline:before,\n.ion-social-python:before,\n.ion-social-reddit:before,\n.ion-social-reddit-outline:before,\n.ion-social-rss:before,\n.ion-social-rss-outline:before,\n.ion-social-sass:before,\n.ion-social-skype:before,\n.ion-social-skype-outline:before,\n.ion-social-snapchat:before,\n.ion-social-snapchat-outline:before,\n.ion-social-tumblr:before,\n.ion-social-tumblr-outline:before,\n.ion-social-tux:before,\n.ion-social-twitch:before,\n.ion-social-twitch-outline:before,\n.ion-social-twitter:before,\n.ion-social-twitter-outline:before,\n.ion-social-usd:before,\n.ion-social-usd-outline:before,\n.ion-social-vimeo:before,\n.ion-social-vimeo-outline:before,\n.ion-social-whatsapp:before,\n.ion-social-whatsapp-outline:before,\n.ion-social-windows:before,\n.ion-social-windows-outline:before,\n.ion-social-wordpress:before,\n.ion-social-wordpress-outline:before,\n.ion-social-yahoo:before,\n.ion-social-yahoo-outline:before,\n.ion-social-yen:before,\n.ion-social-yen-outline:before,\n.ion-social-youtube:before,\n.ion-social-youtube-outline:before,\n.ion-soup-can:before,\n.ion-soup-can-outline:before,\n.ion-speakerphone:before,\n.ion-speedometer:before,\n.ion-spoon:before,\n.ion-star:before,\n.ion-stats-bars:before,\n.ion-steam:before,\n.ion-stop:before,\n.ion-thermometer:before,\n.ion-thumbsdown:before,\n.ion-thumbsup:before,\n.ion-toggle:before,\n.ion-toggle-filled:before,\n.ion-transgender:before,\n.ion-trash-a:before,\n.ion-trash-b:before,\n.ion-trophy:before,\n.ion-tshirt:before,\n.ion-tshirt-outline:before,\n.ion-umbrella:before,\n.ion-university:before,\n.ion-unlocked:before,\n.ion-upload:before,\n.ion-usb:before,\n.ion-videocamera:before,\n.ion-volume-high:before,\n.ion-volume-low:before,\n.ion-volume-medium:before,\n.ion-volume-mute:before,\n.ion-wand:before,\n.ion-waterdrop:before,\n.ion-wifi:before,\n.ion-wineglass:before,\n.ion-woman:before,\n.ion-wrench:before,\n.ion-xbox:before {\n  display: inline-block;\n  font-family: \"Ionicons\";\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  text-rendering: auto;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.ion-alert:before {\n  content: \"\\F101\"; }\n\n.ion-alert-circled:before {\n  content: \"\\F100\"; }\n\n.ion-android-add:before {\n  content: \"\\F2C7\"; }\n\n.ion-android-add-circle:before {\n  content: \"\\F359\"; }\n\n.ion-android-alarm-clock:before {\n  content: \"\\F35A\"; }\n\n.ion-android-alert:before {\n  content: \"\\F35B\"; }\n\n.ion-android-apps:before {\n  content: \"\\F35C\"; }\n\n.ion-android-archive:before {\n  content: \"\\F2C9\"; }\n\n.ion-android-arrow-back:before {\n  content: \"\\F2CA\"; }\n\n.ion-android-arrow-down:before {\n  content: \"\\F35D\"; }\n\n.ion-android-arrow-dropdown:before {\n  content: \"\\F35F\"; }\n\n.ion-android-arrow-dropdown-circle:before {\n  content: \"\\F35E\"; }\n\n.ion-android-arrow-dropleft:before {\n  content: \"\\F361\"; }\n\n.ion-android-arrow-dropleft-circle:before {\n  content: \"\\F360\"; }\n\n.ion-android-arrow-dropright:before {\n  content: \"\\F363\"; }\n\n.ion-android-arrow-dropright-circle:before {\n  content: \"\\F362\"; }\n\n.ion-android-arrow-dropup:before {\n  content: \"\\F365\"; }\n\n.ion-android-arrow-dropup-circle:before {\n  content: \"\\F364\"; }\n\n.ion-android-arrow-forward:before {\n  content: \"\\F30F\"; }\n\n.ion-android-arrow-up:before {\n  content: \"\\F366\"; }\n\n.ion-android-attach:before {\n  content: \"\\F367\"; }\n\n.ion-android-bar:before {\n  content: \"\\F368\"; }\n\n.ion-android-bicycle:before {\n  content: \"\\F369\"; }\n\n.ion-android-boat:before {\n  content: \"\\F36A\"; }\n\n.ion-android-bookmark:before {\n  content: \"\\F36B\"; }\n\n.ion-android-bulb:before {\n  content: \"\\F36C\"; }\n\n.ion-android-bus:before {\n  content: \"\\F36D\"; }\n\n.ion-android-calendar:before {\n  content: \"\\F2D1\"; }\n\n.ion-android-call:before {\n  content: \"\\F2D2\"; }\n\n.ion-android-camera:before {\n  content: \"\\F2D3\"; }\n\n.ion-android-cancel:before {\n  content: \"\\F36E\"; }\n\n.ion-android-car:before {\n  content: \"\\F36F\"; }\n\n.ion-android-cart:before {\n  content: \"\\F370\"; }\n\n.ion-android-chat:before {\n  content: \"\\F2D4\"; }\n\n.ion-android-checkbox:before {\n  content: \"\\F374\"; }\n\n.ion-android-checkbox-blank:before {\n  content: \"\\F371\"; }\n\n.ion-android-checkbox-outline:before {\n  content: \"\\F373\"; }\n\n.ion-android-checkbox-outline-blank:before {\n  content: \"\\F372\"; }\n\n.ion-android-checkmark-circle:before {\n  content: \"\\F375\"; }\n\n.ion-android-clipboard:before {\n  content: \"\\F376\"; }\n\n.ion-android-close:before {\n  content: \"\\F2D7\"; }\n\n.ion-android-cloud:before {\n  content: \"\\F37A\"; }\n\n.ion-android-cloud-circle:before {\n  content: \"\\F377\"; }\n\n.ion-android-cloud-done:before {\n  content: \"\\F378\"; }\n\n.ion-android-cloud-outline:before {\n  content: \"\\F379\"; }\n\n.ion-android-color-palette:before {\n  content: \"\\F37B\"; }\n\n.ion-android-compass:before {\n  content: \"\\F37C\"; }\n\n.ion-android-contact:before {\n  content: \"\\F2D8\"; }\n\n.ion-android-contacts:before {\n  content: \"\\F2D9\"; }\n\n.ion-android-contract:before {\n  content: \"\\F37D\"; }\n\n.ion-android-create:before {\n  content: \"\\F37E\"; }\n\n.ion-android-delete:before {\n  content: \"\\F37F\"; }\n\n.ion-android-desktop:before {\n  content: \"\\F380\"; }\n\n.ion-android-document:before {\n  content: \"\\F381\"; }\n\n.ion-android-done:before {\n  content: \"\\F383\"; }\n\n.ion-android-done-all:before {\n  content: \"\\F382\"; }\n\n.ion-android-download:before {\n  content: \"\\F2DD\"; }\n\n.ion-android-drafts:before {\n  content: \"\\F384\"; }\n\n.ion-android-exit:before {\n  content: \"\\F385\"; }\n\n.ion-android-expand:before {\n  content: \"\\F386\"; }\n\n.ion-android-favorite:before {\n  content: \"\\F388\"; }\n\n.ion-android-favorite-outline:before {\n  content: \"\\F387\"; }\n\n.ion-android-film:before {\n  content: \"\\F389\"; }\n\n.ion-android-folder:before {\n  content: \"\\F2E0\"; }\n\n.ion-android-folder-open:before {\n  content: \"\\F38A\"; }\n\n.ion-android-funnel:before {\n  content: \"\\F38B\"; }\n\n.ion-android-globe:before {\n  content: \"\\F38C\"; }\n\n.ion-android-hand:before {\n  content: \"\\F2E3\"; }\n\n.ion-android-hangout:before {\n  content: \"\\F38D\"; }\n\n.ion-android-happy:before {\n  content: \"\\F38E\"; }\n\n.ion-android-home:before {\n  content: \"\\F38F\"; }\n\n.ion-android-image:before {\n  content: \"\\F2E4\"; }\n\n.ion-android-laptop:before {\n  content: \"\\F390\"; }\n\n.ion-android-list:before {\n  content: \"\\F391\"; }\n\n.ion-android-locate:before {\n  content: \"\\F2E9\"; }\n\n.ion-android-lock:before {\n  content: \"\\F392\"; }\n\n.ion-android-mail:before {\n  content: \"\\F2EB\"; }\n\n.ion-android-map:before {\n  content: \"\\F393\"; }\n\n.ion-android-menu:before {\n  content: \"\\F394\"; }\n\n.ion-android-microphone:before {\n  content: \"\\F2EC\"; }\n\n.ion-android-microphone-off:before {\n  content: \"\\F395\"; }\n\n.ion-android-more-horizontal:before {\n  content: \"\\F396\"; }\n\n.ion-android-more-vertical:before {\n  content: \"\\F397\"; }\n\n.ion-android-navigate:before {\n  content: \"\\F398\"; }\n\n.ion-android-notifications:before {\n  content: \"\\F39B\"; }\n\n.ion-android-notifications-none:before {\n  content: \"\\F399\"; }\n\n.ion-android-notifications-off:before {\n  content: \"\\F39A\"; }\n\n.ion-android-open:before {\n  content: \"\\F39C\"; }\n\n.ion-android-options:before {\n  content: \"\\F39D\"; }\n\n.ion-android-people:before {\n  content: \"\\F39E\"; }\n\n.ion-android-person:before {\n  content: \"\\F3A0\"; }\n\n.ion-android-person-add:before {\n  content: \"\\F39F\"; }\n\n.ion-android-phone-landscape:before {\n  content: \"\\F3A1\"; }\n\n.ion-android-phone-portrait:before {\n  content: \"\\F3A2\"; }\n\n.ion-android-pin:before {\n  content: \"\\F3A3\"; }\n\n.ion-android-plane:before {\n  content: \"\\F3A4\"; }\n\n.ion-android-playstore:before {\n  content: \"\\F2F0\"; }\n\n.ion-android-print:before {\n  content: \"\\F3A5\"; }\n\n.ion-android-radio-button-off:before {\n  content: \"\\F3A6\"; }\n\n.ion-android-radio-button-on:before {\n  content: \"\\F3A7\"; }\n\n.ion-android-refresh:before {\n  content: \"\\F3A8\"; }\n\n.ion-android-remove:before {\n  content: \"\\F2F4\"; }\n\n.ion-android-remove-circle:before {\n  content: \"\\F3A9\"; }\n\n.ion-android-restaurant:before {\n  content: \"\\F3AA\"; }\n\n.ion-android-sad:before {\n  content: \"\\F3AB\"; }\n\n.ion-android-search:before {\n  content: \"\\F2F5\"; }\n\n.ion-android-send:before {\n  content: \"\\F2F6\"; }\n\n.ion-android-settings:before {\n  content: \"\\F2F7\"; }\n\n.ion-android-share:before {\n  content: \"\\F2F8\"; }\n\n.ion-android-share-alt:before {\n  content: \"\\F3AC\"; }\n\n.ion-android-star:before {\n  content: \"\\F2FC\"; }\n\n.ion-android-star-half:before {\n  content: \"\\F3AD\"; }\n\n.ion-android-star-outline:before {\n  content: \"\\F3AE\"; }\n\n.ion-android-stopwatch:before {\n  content: \"\\F2FD\"; }\n\n.ion-android-subway:before {\n  content: \"\\F3AF\"; }\n\n.ion-android-sunny:before {\n  content: \"\\F3B0\"; }\n\n.ion-android-sync:before {\n  content: \"\\F3B1\"; }\n\n.ion-android-textsms:before {\n  content: \"\\F3B2\"; }\n\n.ion-android-time:before {\n  content: \"\\F3B3\"; }\n\n.ion-android-train:before {\n  content: \"\\F3B4\"; }\n\n.ion-android-unlock:before {\n  content: \"\\F3B5\"; }\n\n.ion-android-upload:before {\n  content: \"\\F3B6\"; }\n\n.ion-android-volume-down:before {\n  content: \"\\F3B7\"; }\n\n.ion-android-volume-mute:before {\n  content: \"\\F3B8\"; }\n\n.ion-android-volume-off:before {\n  content: \"\\F3B9\"; }\n\n.ion-android-volume-up:before {\n  content: \"\\F3BA\"; }\n\n.ion-android-walk:before {\n  content: \"\\F3BB\"; }\n\n.ion-android-warning:before {\n  content: \"\\F3BC\"; }\n\n.ion-android-watch:before {\n  content: \"\\F3BD\"; }\n\n.ion-android-wifi:before {\n  content: \"\\F305\"; }\n\n.ion-aperture:before {\n  content: \"\\F313\"; }\n\n.ion-archive:before {\n  content: \"\\F102\"; }\n\n.ion-arrow-down-a:before {\n  content: \"\\F103\"; }\n\n.ion-arrow-down-b:before {\n  content: \"\\F104\"; }\n\n.ion-arrow-down-c:before {\n  content: \"\\F105\"; }\n\n.ion-arrow-expand:before {\n  content: \"\\F25E\"; }\n\n.ion-arrow-graph-down-left:before {\n  content: \"\\F25F\"; }\n\n.ion-arrow-graph-down-right:before {\n  content: \"\\F260\"; }\n\n.ion-arrow-graph-up-left:before {\n  content: \"\\F261\"; }\n\n.ion-arrow-graph-up-right:before {\n  content: \"\\F262\"; }\n\n.ion-arrow-left-a:before {\n  content: \"\\F106\"; }\n\n.ion-arrow-left-b:before {\n  content: \"\\F107\"; }\n\n.ion-arrow-left-c:before {\n  content: \"\\F108\"; }\n\n.ion-arrow-move:before {\n  content: \"\\F263\"; }\n\n.ion-arrow-resize:before {\n  content: \"\\F264\"; }\n\n.ion-arrow-return-left:before {\n  content: \"\\F265\"; }\n\n.ion-arrow-return-right:before {\n  content: \"\\F266\"; }\n\n.ion-arrow-right-a:before {\n  content: \"\\F109\"; }\n\n.ion-arrow-right-b:before {\n  content: \"\\F10A\"; }\n\n.ion-arrow-right-c:before {\n  content: \"\\F10B\"; }\n\n.ion-arrow-shrink:before {\n  content: \"\\F267\"; }\n\n.ion-arrow-swap:before {\n  content: \"\\F268\"; }\n\n.ion-arrow-up-a:before {\n  content: \"\\F10C\"; }\n\n.ion-arrow-up-b:before {\n  content: \"\\F10D\"; }\n\n.ion-arrow-up-c:before {\n  content: \"\\F10E\"; }\n\n.ion-asterisk:before {\n  content: \"\\F314\"; }\n\n.ion-at:before {\n  content: \"\\F10F\"; }\n\n.ion-backspace:before {\n  content: \"\\F3BF\"; }\n\n.ion-backspace-outline:before {\n  content: \"\\F3BE\"; }\n\n.ion-bag:before {\n  content: \"\\F110\"; }\n\n.ion-battery-charging:before {\n  content: \"\\F111\"; }\n\n.ion-battery-empty:before {\n  content: \"\\F112\"; }\n\n.ion-battery-full:before {\n  content: \"\\F113\"; }\n\n.ion-battery-half:before {\n  content: \"\\F114\"; }\n\n.ion-battery-low:before {\n  content: \"\\F115\"; }\n\n.ion-beaker:before {\n  content: \"\\F269\"; }\n\n.ion-beer:before {\n  content: \"\\F26A\"; }\n\n.ion-bluetooth:before {\n  content: \"\\F116\"; }\n\n.ion-bonfire:before {\n  content: \"\\F315\"; }\n\n.ion-bookmark:before {\n  content: \"\\F26B\"; }\n\n.ion-bowtie:before {\n  content: \"\\F3C0\"; }\n\n.ion-briefcase:before {\n  content: \"\\F26C\"; }\n\n.ion-bug:before {\n  content: \"\\F2BE\"; }\n\n.ion-calculator:before {\n  content: \"\\F26D\"; }\n\n.ion-calendar:before {\n  content: \"\\F117\"; }\n\n.ion-camera:before {\n  content: \"\\F118\"; }\n\n.ion-card:before {\n  content: \"\\F119\"; }\n\n.ion-cash:before {\n  content: \"\\F316\"; }\n\n.ion-chatbox:before {\n  content: \"\\F11B\"; }\n\n.ion-chatbox-working:before {\n  content: \"\\F11A\"; }\n\n.ion-chatboxes:before {\n  content: \"\\F11C\"; }\n\n.ion-chatbubble:before {\n  content: \"\\F11E\"; }\n\n.ion-chatbubble-working:before {\n  content: \"\\F11D\"; }\n\n.ion-chatbubbles:before {\n  content: \"\\F11F\"; }\n\n.ion-checkmark:before {\n  content: \"\\F122\"; }\n\n.ion-checkmark-circled:before {\n  content: \"\\F120\"; }\n\n.ion-checkmark-round:before {\n  content: \"\\F121\"; }\n\n.ion-chevron-down:before {\n  content: \"\\F123\"; }\n\n.ion-chevron-left:before {\n  content: \"\\F124\"; }\n\n.ion-chevron-right:before {\n  content: \"\\F125\"; }\n\n.ion-chevron-up:before {\n  content: \"\\F126\"; }\n\n.ion-clipboard:before {\n  content: \"\\F127\"; }\n\n.ion-clock:before {\n  content: \"\\F26E\"; }\n\n.ion-close:before {\n  content: \"\\F12A\"; }\n\n.ion-close-circled:before {\n  content: \"\\F128\"; }\n\n.ion-close-round:before {\n  content: \"\\F129\"; }\n\n.ion-closed-captioning:before {\n  content: \"\\F317\"; }\n\n.ion-cloud:before {\n  content: \"\\F12B\"; }\n\n.ion-code:before {\n  content: \"\\F271\"; }\n\n.ion-code-download:before {\n  content: \"\\F26F\"; }\n\n.ion-code-working:before {\n  content: \"\\F270\"; }\n\n.ion-coffee:before {\n  content: \"\\F272\"; }\n\n.ion-compass:before {\n  content: \"\\F273\"; }\n\n.ion-compose:before {\n  content: \"\\F12C\"; }\n\n.ion-connection-bars:before {\n  content: \"\\F274\"; }\n\n.ion-contrast:before {\n  content: \"\\F275\"; }\n\n.ion-crop:before {\n  content: \"\\F3C1\"; }\n\n.ion-cube:before {\n  content: \"\\F318\"; }\n\n.ion-disc:before {\n  content: \"\\F12D\"; }\n\n.ion-document:before {\n  content: \"\\F12F\"; }\n\n.ion-document-text:before {\n  content: \"\\F12E\"; }\n\n.ion-drag:before {\n  content: \"\\F130\"; }\n\n.ion-earth:before {\n  content: \"\\F276\"; }\n\n.ion-easel:before {\n  content: \"\\F3C2\"; }\n\n.ion-edit:before {\n  content: \"\\F2BF\"; }\n\n.ion-egg:before {\n  content: \"\\F277\"; }\n\n.ion-eject:before {\n  content: \"\\F131\"; }\n\n.ion-email:before {\n  content: \"\\F132\"; }\n\n.ion-email-unread:before {\n  content: \"\\F3C3\"; }\n\n.ion-erlenmeyer-flask:before {\n  content: \"\\F3C5\"; }\n\n.ion-erlenmeyer-flask-bubbles:before {\n  content: \"\\F3C4\"; }\n\n.ion-eye:before {\n  content: \"\\F133\"; }\n\n.ion-eye-disabled:before {\n  content: \"\\F306\"; }\n\n.ion-female:before {\n  content: \"\\F278\"; }\n\n.ion-filing:before {\n  content: \"\\F134\"; }\n\n.ion-film-marker:before {\n  content: \"\\F135\"; }\n\n.ion-fireball:before {\n  content: \"\\F319\"; }\n\n.ion-flag:before {\n  content: \"\\F279\"; }\n\n.ion-flame:before {\n  content: \"\\F31A\"; }\n\n.ion-flash:before {\n  content: \"\\F137\"; }\n\n.ion-flash-off:before {\n  content: \"\\F136\"; }\n\n.ion-folder:before {\n  content: \"\\F139\"; }\n\n.ion-fork:before {\n  content: \"\\F27A\"; }\n\n.ion-fork-repo:before {\n  content: \"\\F2C0\"; }\n\n.ion-forward:before {\n  content: \"\\F13A\"; }\n\n.ion-funnel:before {\n  content: \"\\F31B\"; }\n\n.ion-gear-a:before {\n  content: \"\\F13D\"; }\n\n.ion-gear-b:before {\n  content: \"\\F13E\"; }\n\n.ion-grid:before {\n  content: \"\\F13F\"; }\n\n.ion-hammer:before {\n  content: \"\\F27B\"; }\n\n.ion-happy:before {\n  content: \"\\F31C\"; }\n\n.ion-happy-outline:before {\n  content: \"\\F3C6\"; }\n\n.ion-headphone:before {\n  content: \"\\F140\"; }\n\n.ion-heart:before {\n  content: \"\\F141\"; }\n\n.ion-heart-broken:before {\n  content: \"\\F31D\"; }\n\n.ion-help:before {\n  content: \"\\F143\"; }\n\n.ion-help-buoy:before {\n  content: \"\\F27C\"; }\n\n.ion-help-circled:before {\n  content: \"\\F142\"; }\n\n.ion-home:before {\n  content: \"\\F144\"; }\n\n.ion-icecream:before {\n  content: \"\\F27D\"; }\n\n.ion-image:before {\n  content: \"\\F147\"; }\n\n.ion-images:before {\n  content: \"\\F148\"; }\n\n.ion-information:before {\n  content: \"\\F14A\"; }\n\n.ion-information-circled:before {\n  content: \"\\F149\"; }\n\n.ion-ionic:before {\n  content: \"\\F14B\"; }\n\n.ion-ios-alarm:before {\n  content: \"\\F3C8\"; }\n\n.ion-ios-alarm-outline:before {\n  content: \"\\F3C7\"; }\n\n.ion-ios-albums:before {\n  content: \"\\F3CA\"; }\n\n.ion-ios-albums-outline:before {\n  content: \"\\F3C9\"; }\n\n.ion-ios-americanfootball:before {\n  content: \"\\F3CC\"; }\n\n.ion-ios-americanfootball-outline:before {\n  content: \"\\F3CB\"; }\n\n.ion-ios-analytics:before {\n  content: \"\\F3CE\"; }\n\n.ion-ios-analytics-outline:before {\n  content: \"\\F3CD\"; }\n\n.ion-ios-arrow-back:before {\n  content: \"\\F3CF\"; }\n\n.ion-ios-arrow-down:before {\n  content: \"\\F3D0\"; }\n\n.ion-ios-arrow-forward:before {\n  content: \"\\F3D1\"; }\n\n.ion-ios-arrow-left:before {\n  content: \"\\F3D2\"; }\n\n.ion-ios-arrow-right:before {\n  content: \"\\F3D3\"; }\n\n.ion-ios-arrow-thin-down:before {\n  content: \"\\F3D4\"; }\n\n.ion-ios-arrow-thin-left:before {\n  content: \"\\F3D5\"; }\n\n.ion-ios-arrow-thin-right:before {\n  content: \"\\F3D6\"; }\n\n.ion-ios-arrow-thin-up:before {\n  content: \"\\F3D7\"; }\n\n.ion-ios-arrow-up:before {\n  content: \"\\F3D8\"; }\n\n.ion-ios-at:before {\n  content: \"\\F3DA\"; }\n\n.ion-ios-at-outline:before {\n  content: \"\\F3D9\"; }\n\n.ion-ios-barcode:before {\n  content: \"\\F3DC\"; }\n\n.ion-ios-barcode-outline:before {\n  content: \"\\F3DB\"; }\n\n.ion-ios-baseball:before {\n  content: \"\\F3DE\"; }\n\n.ion-ios-baseball-outline:before {\n  content: \"\\F3DD\"; }\n\n.ion-ios-basketball:before {\n  content: \"\\F3E0\"; }\n\n.ion-ios-basketball-outline:before {\n  content: \"\\F3DF\"; }\n\n.ion-ios-bell:before {\n  content: \"\\F3E2\"; }\n\n.ion-ios-bell-outline:before {\n  content: \"\\F3E1\"; }\n\n.ion-ios-body:before {\n  content: \"\\F3E4\"; }\n\n.ion-ios-body-outline:before {\n  content: \"\\F3E3\"; }\n\n.ion-ios-bolt:before {\n  content: \"\\F3E6\"; }\n\n.ion-ios-bolt-outline:before {\n  content: \"\\F3E5\"; }\n\n.ion-ios-book:before {\n  content: \"\\F3E8\"; }\n\n.ion-ios-book-outline:before {\n  content: \"\\F3E7\"; }\n\n.ion-ios-bookmarks:before {\n  content: \"\\F3EA\"; }\n\n.ion-ios-bookmarks-outline:before {\n  content: \"\\F3E9\"; }\n\n.ion-ios-box:before {\n  content: \"\\F3EC\"; }\n\n.ion-ios-box-outline:before {\n  content: \"\\F3EB\"; }\n\n.ion-ios-briefcase:before {\n  content: \"\\F3EE\"; }\n\n.ion-ios-briefcase-outline:before {\n  content: \"\\F3ED\"; }\n\n.ion-ios-browsers:before {\n  content: \"\\F3F0\"; }\n\n.ion-ios-browsers-outline:before {\n  content: \"\\F3EF\"; }\n\n.ion-ios-calculator:before {\n  content: \"\\F3F2\"; }\n\n.ion-ios-calculator-outline:before {\n  content: \"\\F3F1\"; }\n\n.ion-ios-calendar:before {\n  content: \"\\F3F4\"; }\n\n.ion-ios-calendar-outline:before {\n  content: \"\\F3F3\"; }\n\n.ion-ios-camera:before {\n  content: \"\\F3F6\"; }\n\n.ion-ios-camera-outline:before {\n  content: \"\\F3F5\"; }\n\n.ion-ios-cart:before {\n  content: \"\\F3F8\"; }\n\n.ion-ios-cart-outline:before {\n  content: \"\\F3F7\"; }\n\n.ion-ios-chatboxes:before {\n  content: \"\\F3FA\"; }\n\n.ion-ios-chatboxes-outline:before {\n  content: \"\\F3F9\"; }\n\n.ion-ios-chatbubble:before {\n  content: \"\\F3FC\"; }\n\n.ion-ios-chatbubble-outline:before {\n  content: \"\\F3FB\"; }\n\n.ion-ios-checkmark:before {\n  content: \"\\F3FF\"; }\n\n.ion-ios-checkmark-empty:before {\n  content: \"\\F3FD\"; }\n\n.ion-ios-checkmark-outline:before {\n  content: \"\\F3FE\"; }\n\n.ion-ios-circle-filled:before {\n  content: \"\\F400\"; }\n\n.ion-ios-circle-outline:before {\n  content: \"\\F401\"; }\n\n.ion-ios-clock:before {\n  content: \"\\F403\"; }\n\n.ion-ios-clock-outline:before {\n  content: \"\\F402\"; }\n\n.ion-ios-close:before {\n  content: \"\\F406\"; }\n\n.ion-ios-close-empty:before {\n  content: \"\\F404\"; }\n\n.ion-ios-close-outline:before {\n  content: \"\\F405\"; }\n\n.ion-ios-cloud:before {\n  content: \"\\F40C\"; }\n\n.ion-ios-cloud-download:before {\n  content: \"\\F408\"; }\n\n.ion-ios-cloud-download-outline:before {\n  content: \"\\F407\"; }\n\n.ion-ios-cloud-outline:before {\n  content: \"\\F409\"; }\n\n.ion-ios-cloud-upload:before {\n  content: \"\\F40B\"; }\n\n.ion-ios-cloud-upload-outline:before {\n  content: \"\\F40A\"; }\n\n.ion-ios-cloudy:before {\n  content: \"\\F410\"; }\n\n.ion-ios-cloudy-night:before {\n  content: \"\\F40E\"; }\n\n.ion-ios-cloudy-night-outline:before {\n  content: \"\\F40D\"; }\n\n.ion-ios-cloudy-outline:before {\n  content: \"\\F40F\"; }\n\n.ion-ios-cog:before {\n  content: \"\\F412\"; }\n\n.ion-ios-cog-outline:before {\n  content: \"\\F411\"; }\n\n.ion-ios-color-filter:before {\n  content: \"\\F414\"; }\n\n.ion-ios-color-filter-outline:before {\n  content: \"\\F413\"; }\n\n.ion-ios-color-wand:before {\n  content: \"\\F416\"; }\n\n.ion-ios-color-wand-outline:before {\n  content: \"\\F415\"; }\n\n.ion-ios-compose:before {\n  content: \"\\F418\"; }\n\n.ion-ios-compose-outline:before {\n  content: \"\\F417\"; }\n\n.ion-ios-contact:before {\n  content: \"\\F41A\"; }\n\n.ion-ios-contact-outline:before {\n  content: \"\\F419\"; }\n\n.ion-ios-copy:before {\n  content: \"\\F41C\"; }\n\n.ion-ios-copy-outline:before {\n  content: \"\\F41B\"; }\n\n.ion-ios-crop:before {\n  content: \"\\F41E\"; }\n\n.ion-ios-crop-strong:before {\n  content: \"\\F41D\"; }\n\n.ion-ios-download:before {\n  content: \"\\F420\"; }\n\n.ion-ios-download-outline:before {\n  content: \"\\F41F\"; }\n\n.ion-ios-drag:before {\n  content: \"\\F421\"; }\n\n.ion-ios-email:before {\n  content: \"\\F423\"; }\n\n.ion-ios-email-outline:before {\n  content: \"\\F422\"; }\n\n.ion-ios-eye:before {\n  content: \"\\F425\"; }\n\n.ion-ios-eye-outline:before {\n  content: \"\\F424\"; }\n\n.ion-ios-fastforward:before {\n  content: \"\\F427\"; }\n\n.ion-ios-fastforward-outline:before {\n  content: \"\\F426\"; }\n\n.ion-ios-filing:before {\n  content: \"\\F429\"; }\n\n.ion-ios-filing-outline:before {\n  content: \"\\F428\"; }\n\n.ion-ios-film:before {\n  content: \"\\F42B\"; }\n\n.ion-ios-film-outline:before {\n  content: \"\\F42A\"; }\n\n.ion-ios-flag:before {\n  content: \"\\F42D\"; }\n\n.ion-ios-flag-outline:before {\n  content: \"\\F42C\"; }\n\n.ion-ios-flame:before {\n  content: \"\\F42F\"; }\n\n.ion-ios-flame-outline:before {\n  content: \"\\F42E\"; }\n\n.ion-ios-flask:before {\n  content: \"\\F431\"; }\n\n.ion-ios-flask-outline:before {\n  content: \"\\F430\"; }\n\n.ion-ios-flower:before {\n  content: \"\\F433\"; }\n\n.ion-ios-flower-outline:before {\n  content: \"\\F432\"; }\n\n.ion-ios-folder:before {\n  content: \"\\F435\"; }\n\n.ion-ios-folder-outline:before {\n  content: \"\\F434\"; }\n\n.ion-ios-football:before {\n  content: \"\\F437\"; }\n\n.ion-ios-football-outline:before {\n  content: \"\\F436\"; }\n\n.ion-ios-game-controller-a:before {\n  content: \"\\F439\"; }\n\n.ion-ios-game-controller-a-outline:before {\n  content: \"\\F438\"; }\n\n.ion-ios-game-controller-b:before {\n  content: \"\\F43B\"; }\n\n.ion-ios-game-controller-b-outline:before {\n  content: \"\\F43A\"; }\n\n.ion-ios-gear:before {\n  content: \"\\F43D\"; }\n\n.ion-ios-gear-outline:before {\n  content: \"\\F43C\"; }\n\n.ion-ios-glasses:before {\n  content: \"\\F43F\"; }\n\n.ion-ios-glasses-outline:before {\n  content: \"\\F43E\"; }\n\n.ion-ios-grid-view:before {\n  content: \"\\F441\"; }\n\n.ion-ios-grid-view-outline:before {\n  content: \"\\F440\"; }\n\n.ion-ios-heart:before {\n  content: \"\\F443\"; }\n\n.ion-ios-heart-outline:before {\n  content: \"\\F442\"; }\n\n.ion-ios-help:before {\n  content: \"\\F446\"; }\n\n.ion-ios-help-empty:before {\n  content: \"\\F444\"; }\n\n.ion-ios-help-outline:before {\n  content: \"\\F445\"; }\n\n.ion-ios-home:before {\n  content: \"\\F448\"; }\n\n.ion-ios-home-outline:before {\n  content: \"\\F447\"; }\n\n.ion-ios-infinite:before {\n  content: \"\\F44A\"; }\n\n.ion-ios-infinite-outline:before {\n  content: \"\\F449\"; }\n\n.ion-ios-information:before {\n  content: \"\\F44D\"; }\n\n.ion-ios-information-empty:before {\n  content: \"\\F44B\"; }\n\n.ion-ios-information-outline:before {\n  content: \"\\F44C\"; }\n\n.ion-ios-ionic-outline:before {\n  content: \"\\F44E\"; }\n\n.ion-ios-keypad:before {\n  content: \"\\F450\"; }\n\n.ion-ios-keypad-outline:before {\n  content: \"\\F44F\"; }\n\n.ion-ios-lightbulb:before {\n  content: \"\\F452\"; }\n\n.ion-ios-lightbulb-outline:before {\n  content: \"\\F451\"; }\n\n.ion-ios-list:before {\n  content: \"\\F454\"; }\n\n.ion-ios-list-outline:before {\n  content: \"\\F453\"; }\n\n.ion-ios-location:before {\n  content: \"\\F456\"; }\n\n.ion-ios-location-outline:before {\n  content: \"\\F455\"; }\n\n.ion-ios-locked:before {\n  content: \"\\F458\"; }\n\n.ion-ios-locked-outline:before {\n  content: \"\\F457\"; }\n\n.ion-ios-loop:before {\n  content: \"\\F45A\"; }\n\n.ion-ios-loop-strong:before {\n  content: \"\\F459\"; }\n\n.ion-ios-medical:before {\n  content: \"\\F45C\"; }\n\n.ion-ios-medical-outline:before {\n  content: \"\\F45B\"; }\n\n.ion-ios-medkit:before {\n  content: \"\\F45E\"; }\n\n.ion-ios-medkit-outline:before {\n  content: \"\\F45D\"; }\n\n.ion-ios-mic:before {\n  content: \"\\F461\"; }\n\n.ion-ios-mic-off:before {\n  content: \"\\F45F\"; }\n\n.ion-ios-mic-outline:before {\n  content: \"\\F460\"; }\n\n.ion-ios-minus:before {\n  content: \"\\F464\"; }\n\n.ion-ios-minus-empty:before {\n  content: \"\\F462\"; }\n\n.ion-ios-minus-outline:before {\n  content: \"\\F463\"; }\n\n.ion-ios-monitor:before {\n  content: \"\\F466\"; }\n\n.ion-ios-monitor-outline:before {\n  content: \"\\F465\"; }\n\n.ion-ios-moon:before {\n  content: \"\\F468\"; }\n\n.ion-ios-moon-outline:before {\n  content: \"\\F467\"; }\n\n.ion-ios-more:before {\n  content: \"\\F46A\"; }\n\n.ion-ios-more-outline:before {\n  content: \"\\F469\"; }\n\n.ion-ios-musical-note:before {\n  content: \"\\F46B\"; }\n\n.ion-ios-musical-notes:before {\n  content: \"\\F46C\"; }\n\n.ion-ios-navigate:before {\n  content: \"\\F46E\"; }\n\n.ion-ios-navigate-outline:before {\n  content: \"\\F46D\"; }\n\n.ion-ios-nutrition:before {\n  content: \"\\F470\"; }\n\n.ion-ios-nutrition-outline:before {\n  content: \"\\F46F\"; }\n\n.ion-ios-paper:before {\n  content: \"\\F472\"; }\n\n.ion-ios-paper-outline:before {\n  content: \"\\F471\"; }\n\n.ion-ios-paperplane:before {\n  content: \"\\F474\"; }\n\n.ion-ios-paperplane-outline:before {\n  content: \"\\F473\"; }\n\n.ion-ios-partlysunny:before {\n  content: \"\\F476\"; }\n\n.ion-ios-partlysunny-outline:before {\n  content: \"\\F475\"; }\n\n.ion-ios-pause:before {\n  content: \"\\F478\"; }\n\n.ion-ios-pause-outline:before {\n  content: \"\\F477\"; }\n\n.ion-ios-paw:before {\n  content: \"\\F47A\"; }\n\n.ion-ios-paw-outline:before {\n  content: \"\\F479\"; }\n\n.ion-ios-people:before {\n  content: \"\\F47C\"; }\n\n.ion-ios-people-outline:before {\n  content: \"\\F47B\"; }\n\n.ion-ios-person:before {\n  content: \"\\F47E\"; }\n\n.ion-ios-person-outline:before {\n  content: \"\\F47D\"; }\n\n.ion-ios-personadd:before {\n  content: \"\\F480\"; }\n\n.ion-ios-personadd-outline:before {\n  content: \"\\F47F\"; }\n\n.ion-ios-photos:before {\n  content: \"\\F482\"; }\n\n.ion-ios-photos-outline:before {\n  content: \"\\F481\"; }\n\n.ion-ios-pie:before {\n  content: \"\\F484\"; }\n\n.ion-ios-pie-outline:before {\n  content: \"\\F483\"; }\n\n.ion-ios-pint:before {\n  content: \"\\F486\"; }\n\n.ion-ios-pint-outline:before {\n  content: \"\\F485\"; }\n\n.ion-ios-play:before {\n  content: \"\\F488\"; }\n\n.ion-ios-play-outline:before {\n  content: \"\\F487\"; }\n\n.ion-ios-plus:before {\n  content: \"\\F48B\"; }\n\n.ion-ios-plus-empty:before {\n  content: \"\\F489\"; }\n\n.ion-ios-plus-outline:before {\n  content: \"\\F48A\"; }\n\n.ion-ios-pricetag:before {\n  content: \"\\F48D\"; }\n\n.ion-ios-pricetag-outline:before {\n  content: \"\\F48C\"; }\n\n.ion-ios-pricetags:before {\n  content: \"\\F48F\"; }\n\n.ion-ios-pricetags-outline:before {\n  content: \"\\F48E\"; }\n\n.ion-ios-printer:before {\n  content: \"\\F491\"; }\n\n.ion-ios-printer-outline:before {\n  content: \"\\F490\"; }\n\n.ion-ios-pulse:before {\n  content: \"\\F493\"; }\n\n.ion-ios-pulse-strong:before {\n  content: \"\\F492\"; }\n\n.ion-ios-rainy:before {\n  content: \"\\F495\"; }\n\n.ion-ios-rainy-outline:before {\n  content: \"\\F494\"; }\n\n.ion-ios-recording:before {\n  content: \"\\F497\"; }\n\n.ion-ios-recording-outline:before {\n  content: \"\\F496\"; }\n\n.ion-ios-redo:before {\n  content: \"\\F499\"; }\n\n.ion-ios-redo-outline:before {\n  content: \"\\F498\"; }\n\n.ion-ios-refresh:before {\n  content: \"\\F49C\"; }\n\n.ion-ios-refresh-empty:before {\n  content: \"\\F49A\"; }\n\n.ion-ios-refresh-outline:before {\n  content: \"\\F49B\"; }\n\n.ion-ios-reload:before {\n  content: \"\\F49D\"; }\n\n.ion-ios-reverse-camera:before {\n  content: \"\\F49F\"; }\n\n.ion-ios-reverse-camera-outline:before {\n  content: \"\\F49E\"; }\n\n.ion-ios-rewind:before {\n  content: \"\\F4A1\"; }\n\n.ion-ios-rewind-outline:before {\n  content: \"\\F4A0\"; }\n\n.ion-ios-rose:before {\n  content: \"\\F4A3\"; }\n\n.ion-ios-rose-outline:before {\n  content: \"\\F4A2\"; }\n\n.ion-ios-search:before {\n  content: \"\\F4A5\"; }\n\n.ion-ios-search-strong:before {\n  content: \"\\F4A4\"; }\n\n.ion-ios-settings:before {\n  content: \"\\F4A7\"; }\n\n.ion-ios-settings-strong:before {\n  content: \"\\F4A6\"; }\n\n.ion-ios-shuffle:before {\n  content: \"\\F4A9\"; }\n\n.ion-ios-shuffle-strong:before {\n  content: \"\\F4A8\"; }\n\n.ion-ios-skipbackward:before {\n  content: \"\\F4AB\"; }\n\n.ion-ios-skipbackward-outline:before {\n  content: \"\\F4AA\"; }\n\n.ion-ios-skipforward:before {\n  content: \"\\F4AD\"; }\n\n.ion-ios-skipforward-outline:before {\n  content: \"\\F4AC\"; }\n\n.ion-ios-snowy:before {\n  content: \"\\F4AE\"; }\n\n.ion-ios-speedometer:before {\n  content: \"\\F4B0\"; }\n\n.ion-ios-speedometer-outline:before {\n  content: \"\\F4AF\"; }\n\n.ion-ios-star:before {\n  content: \"\\F4B3\"; }\n\n.ion-ios-star-half:before {\n  content: \"\\F4B1\"; }\n\n.ion-ios-star-outline:before {\n  content: \"\\F4B2\"; }\n\n.ion-ios-stopwatch:before {\n  content: \"\\F4B5\"; }\n\n.ion-ios-stopwatch-outline:before {\n  content: \"\\F4B4\"; }\n\n.ion-ios-sunny:before {\n  content: \"\\F4B7\"; }\n\n.ion-ios-sunny-outline:before {\n  content: \"\\F4B6\"; }\n\n.ion-ios-telephone:before {\n  content: \"\\F4B9\"; }\n\n.ion-ios-telephone-outline:before {\n  content: \"\\F4B8\"; }\n\n.ion-ios-tennisball:before {\n  content: \"\\F4BB\"; }\n\n.ion-ios-tennisball-outline:before {\n  content: \"\\F4BA\"; }\n\n.ion-ios-thunderstorm:before {\n  content: \"\\F4BD\"; }\n\n.ion-ios-thunderstorm-outline:before {\n  content: \"\\F4BC\"; }\n\n.ion-ios-time:before {\n  content: \"\\F4BF\"; }\n\n.ion-ios-time-outline:before {\n  content: \"\\F4BE\"; }\n\n.ion-ios-timer:before {\n  content: \"\\F4C1\"; }\n\n.ion-ios-timer-outline:before {\n  content: \"\\F4C0\"; }\n\n.ion-ios-toggle:before {\n  content: \"\\F4C3\"; }\n\n.ion-ios-toggle-outline:before {\n  content: \"\\F4C2\"; }\n\n.ion-ios-trash:before {\n  content: \"\\F4C5\"; }\n\n.ion-ios-trash-outline:before {\n  content: \"\\F4C4\"; }\n\n.ion-ios-undo:before {\n  content: \"\\F4C7\"; }\n\n.ion-ios-undo-outline:before {\n  content: \"\\F4C6\"; }\n\n.ion-ios-unlocked:before {\n  content: \"\\F4C9\"; }\n\n.ion-ios-unlocked-outline:before {\n  content: \"\\F4C8\"; }\n\n.ion-ios-upload:before {\n  content: \"\\F4CB\"; }\n\n.ion-ios-upload-outline:before {\n  content: \"\\F4CA\"; }\n\n.ion-ios-videocam:before {\n  content: \"\\F4CD\"; }\n\n.ion-ios-videocam-outline:before {\n  content: \"\\F4CC\"; }\n\n.ion-ios-volume-high:before {\n  content: \"\\F4CE\"; }\n\n.ion-ios-volume-low:before {\n  content: \"\\F4CF\"; }\n\n.ion-ios-wineglass:before {\n  content: \"\\F4D1\"; }\n\n.ion-ios-wineglass-outline:before {\n  content: \"\\F4D0\"; }\n\n.ion-ios-world:before {\n  content: \"\\F4D3\"; }\n\n.ion-ios-world-outline:before {\n  content: \"\\F4D2\"; }\n\n.ion-ipad:before {\n  content: \"\\F1F9\"; }\n\n.ion-iphone:before {\n  content: \"\\F1FA\"; }\n\n.ion-ipod:before {\n  content: \"\\F1FB\"; }\n\n.ion-jet:before {\n  content: \"\\F295\"; }\n\n.ion-key:before {\n  content: \"\\F296\"; }\n\n.ion-knife:before {\n  content: \"\\F297\"; }\n\n.ion-laptop:before {\n  content: \"\\F1FC\"; }\n\n.ion-leaf:before {\n  content: \"\\F1FD\"; }\n\n.ion-levels:before {\n  content: \"\\F298\"; }\n\n.ion-lightbulb:before {\n  content: \"\\F299\"; }\n\n.ion-link:before {\n  content: \"\\F1FE\"; }\n\n.ion-load-a:before {\n  content: \"\\F29A\"; }\n\n.ion-load-b:before {\n  content: \"\\F29B\"; }\n\n.ion-load-c:before {\n  content: \"\\F29C\"; }\n\n.ion-load-d:before {\n  content: \"\\F29D\"; }\n\n.ion-location:before {\n  content: \"\\F1FF\"; }\n\n.ion-lock-combination:before {\n  content: \"\\F4D4\"; }\n\n.ion-locked:before {\n  content: \"\\F200\"; }\n\n.ion-log-in:before {\n  content: \"\\F29E\"; }\n\n.ion-log-out:before {\n  content: \"\\F29F\"; }\n\n.ion-loop:before {\n  content: \"\\F201\"; }\n\n.ion-magnet:before {\n  content: \"\\F2A0\"; }\n\n.ion-male:before {\n  content: \"\\F2A1\"; }\n\n.ion-man:before {\n  content: \"\\F202\"; }\n\n.ion-map:before {\n  content: \"\\F203\"; }\n\n.ion-medkit:before {\n  content: \"\\F2A2\"; }\n\n.ion-merge:before {\n  content: \"\\F33F\"; }\n\n.ion-mic-a:before {\n  content: \"\\F204\"; }\n\n.ion-mic-b:before {\n  content: \"\\F205\"; }\n\n.ion-mic-c:before {\n  content: \"\\F206\"; }\n\n.ion-minus:before {\n  content: \"\\F209\"; }\n\n.ion-minus-circled:before {\n  content: \"\\F207\"; }\n\n.ion-minus-round:before {\n  content: \"\\F208\"; }\n\n.ion-model-s:before {\n  content: \"\\F2C1\"; }\n\n.ion-monitor:before {\n  content: \"\\F20A\"; }\n\n.ion-more:before {\n  content: \"\\F20B\"; }\n\n.ion-mouse:before {\n  content: \"\\F340\"; }\n\n.ion-music-note:before {\n  content: \"\\F20C\"; }\n\n.ion-navicon:before {\n  content: \"\\F20E\"; }\n\n.ion-navicon-round:before {\n  content: \"\\F20D\"; }\n\n.ion-navigate:before {\n  content: \"\\F2A3\"; }\n\n.ion-network:before {\n  content: \"\\F341\"; }\n\n.ion-no-smoking:before {\n  content: \"\\F2C2\"; }\n\n.ion-nuclear:before {\n  content: \"\\F2A4\"; }\n\n.ion-outlet:before {\n  content: \"\\F342\"; }\n\n.ion-paintbrush:before {\n  content: \"\\F4D5\"; }\n\n.ion-paintbucket:before {\n  content: \"\\F4D6\"; }\n\n.ion-paper-airplane:before {\n  content: \"\\F2C3\"; }\n\n.ion-paperclip:before {\n  content: \"\\F20F\"; }\n\n.ion-pause:before {\n  content: \"\\F210\"; }\n\n.ion-person:before {\n  content: \"\\F213\"; }\n\n.ion-person-add:before {\n  content: \"\\F211\"; }\n\n.ion-person-stalker:before {\n  content: \"\\F212\"; }\n\n.ion-pie-graph:before {\n  content: \"\\F2A5\"; }\n\n.ion-pin:before {\n  content: \"\\F2A6\"; }\n\n.ion-pinpoint:before {\n  content: \"\\F2A7\"; }\n\n.ion-pizza:before {\n  content: \"\\F2A8\"; }\n\n.ion-plane:before {\n  content: \"\\F214\"; }\n\n.ion-planet:before {\n  content: \"\\F343\"; }\n\n.ion-play:before {\n  content: \"\\F215\"; }\n\n.ion-playstation:before {\n  content: \"\\F30A\"; }\n\n.ion-plus:before {\n  content: \"\\F218\"; }\n\n.ion-plus-circled:before {\n  content: \"\\F216\"; }\n\n.ion-plus-round:before {\n  content: \"\\F217\"; }\n\n.ion-podium:before {\n  content: \"\\F344\"; }\n\n.ion-pound:before {\n  content: \"\\F219\"; }\n\n.ion-power:before {\n  content: \"\\F2A9\"; }\n\n.ion-pricetag:before {\n  content: \"\\F2AA\"; }\n\n.ion-pricetags:before {\n  content: \"\\F2AB\"; }\n\n.ion-printer:before {\n  content: \"\\F21A\"; }\n\n.ion-pull-request:before {\n  content: \"\\F345\"; }\n\n.ion-qr-scanner:before {\n  content: \"\\F346\"; }\n\n.ion-quote:before {\n  content: \"\\F347\"; }\n\n.ion-radio-waves:before {\n  content: \"\\F2AC\"; }\n\n.ion-record:before {\n  content: \"\\F21B\"; }\n\n.ion-refresh:before {\n  content: \"\\F21C\"; }\n\n.ion-reply:before {\n  content: \"\\F21E\"; }\n\n.ion-reply-all:before {\n  content: \"\\F21D\"; }\n\n.ion-ribbon-a:before {\n  content: \"\\F348\"; }\n\n.ion-ribbon-b:before {\n  content: \"\\F349\"; }\n\n.ion-sad:before {\n  content: \"\\F34A\"; }\n\n.ion-sad-outline:before {\n  content: \"\\F4D7\"; }\n\n.ion-scissors:before {\n  content: \"\\F34B\"; }\n\n.ion-search:before {\n  content: \"\\F21F\"; }\n\n.ion-settings:before {\n  content: \"\\F2AD\"; }\n\n.ion-share:before {\n  content: \"\\F220\"; }\n\n.ion-shuffle:before {\n  content: \"\\F221\"; }\n\n.ion-skip-backward:before {\n  content: \"\\F222\"; }\n\n.ion-skip-forward:before {\n  content: \"\\F223\"; }\n\n.ion-social-android:before {\n  content: \"\\F225\"; }\n\n.ion-social-android-outline:before {\n  content: \"\\F224\"; }\n\n.ion-social-angular:before {\n  content: \"\\F4D9\"; }\n\n.ion-social-angular-outline:before {\n  content: \"\\F4D8\"; }\n\n.ion-social-apple:before {\n  content: \"\\F227\"; }\n\n.ion-social-apple-outline:before {\n  content: \"\\F226\"; }\n\n.ion-social-bitcoin:before {\n  content: \"\\F2AF\"; }\n\n.ion-social-bitcoin-outline:before {\n  content: \"\\F2AE\"; }\n\n.ion-social-buffer:before {\n  content: \"\\F229\"; }\n\n.ion-social-buffer-outline:before {\n  content: \"\\F228\"; }\n\n.ion-social-chrome:before {\n  content: \"\\F4DB\"; }\n\n.ion-social-chrome-outline:before {\n  content: \"\\F4DA\"; }\n\n.ion-social-codepen:before {\n  content: \"\\F4DD\"; }\n\n.ion-social-codepen-outline:before {\n  content: \"\\F4DC\"; }\n\n.ion-social-css3:before {\n  content: \"\\F4DF\"; }\n\n.ion-social-css3-outline:before {\n  content: \"\\F4DE\"; }\n\n.ion-social-designernews:before {\n  content: \"\\F22B\"; }\n\n.ion-social-designernews-outline:before {\n  content: \"\\F22A\"; }\n\n.ion-social-dribbble:before {\n  content: \"\\F22D\"; }\n\n.ion-social-dribbble-outline:before {\n  content: \"\\F22C\"; }\n\n.ion-social-dropbox:before {\n  content: \"\\F22F\"; }\n\n.ion-social-dropbox-outline:before {\n  content: \"\\F22E\"; }\n\n.ion-social-euro:before {\n  content: \"\\F4E1\"; }\n\n.ion-social-euro-outline:before {\n  content: \"\\F4E0\"; }\n\n.ion-social-facebook:before {\n  content: \"\\F231\"; }\n\n.ion-social-facebook-outline:before {\n  content: \"\\F230\"; }\n\n.ion-social-foursquare:before {\n  content: \"\\F34D\"; }\n\n.ion-social-foursquare-outline:before {\n  content: \"\\F34C\"; }\n\n.ion-social-freebsd-devil:before {\n  content: \"\\F2C4\"; }\n\n.ion-social-github:before {\n  content: \"\\F233\"; }\n\n.ion-social-github-outline:before {\n  content: \"\\F232\"; }\n\n.ion-social-google:before {\n  content: \"\\F34F\"; }\n\n.ion-social-google-outline:before {\n  content: \"\\F34E\"; }\n\n.ion-social-googleplus:before {\n  content: \"\\F235\"; }\n\n.ion-social-googleplus-outline:before {\n  content: \"\\F234\"; }\n\n.ion-social-hackernews:before {\n  content: \"\\F237\"; }\n\n.ion-social-hackernews-outline:before {\n  content: \"\\F236\"; }\n\n.ion-social-html5:before {\n  content: \"\\F4E3\"; }\n\n.ion-social-html5-outline:before {\n  content: \"\\F4E2\"; }\n\n.ion-social-instagram:before {\n  content: \"\\F351\"; }\n\n.ion-social-instagram-outline:before {\n  content: \"\\F350\"; }\n\n.ion-social-javascript:before {\n  content: \"\\F4E5\"; }\n\n.ion-social-javascript-outline:before {\n  content: \"\\F4E4\"; }\n\n.ion-social-linkedin:before {\n  content: \"\\F239\"; }\n\n.ion-social-linkedin-outline:before {\n  content: \"\\F238\"; }\n\n.ion-social-markdown:before {\n  content: \"\\F4E6\"; }\n\n.ion-social-nodejs:before {\n  content: \"\\F4E7\"; }\n\n.ion-social-octocat:before {\n  content: \"\\F4E8\"; }\n\n.ion-social-pinterest:before {\n  content: \"\\F2B1\"; }\n\n.ion-social-pinterest-outline:before {\n  content: \"\\F2B0\"; }\n\n.ion-social-python:before {\n  content: \"\\F4E9\"; }\n\n.ion-social-reddit:before {\n  content: \"\\F23B\"; }\n\n.ion-social-reddit-outline:before {\n  content: \"\\F23A\"; }\n\n.ion-social-rss:before {\n  content: \"\\F23D\"; }\n\n.ion-social-rss-outline:before {\n  content: \"\\F23C\"; }\n\n.ion-social-sass:before {\n  content: \"\\F4EA\"; }\n\n.ion-social-skype:before {\n  content: \"\\F23F\"; }\n\n.ion-social-skype-outline:before {\n  content: \"\\F23E\"; }\n\n.ion-social-snapchat:before {\n  content: \"\\F4EC\"; }\n\n.ion-social-snapchat-outline:before {\n  content: \"\\F4EB\"; }\n\n.ion-social-tumblr:before {\n  content: \"\\F241\"; }\n\n.ion-social-tumblr-outline:before {\n  content: \"\\F240\"; }\n\n.ion-social-tux:before {\n  content: \"\\F2C5\"; }\n\n.ion-social-twitch:before {\n  content: \"\\F4EE\"; }\n\n.ion-social-twitch-outline:before {\n  content: \"\\F4ED\"; }\n\n.ion-social-twitter:before {\n  content: \"\\F243\"; }\n\n.ion-social-twitter-outline:before {\n  content: \"\\F242\"; }\n\n.ion-social-usd:before {\n  content: \"\\F353\"; }\n\n.ion-social-usd-outline:before {\n  content: \"\\F352\"; }\n\n.ion-social-vimeo:before {\n  content: \"\\F245\"; }\n\n.ion-social-vimeo-outline:before {\n  content: \"\\F244\"; }\n\n.ion-social-whatsapp:before {\n  content: \"\\F4F0\"; }\n\n.ion-social-whatsapp-outline:before {\n  content: \"\\F4EF\"; }\n\n.ion-social-windows:before {\n  content: \"\\F247\"; }\n\n.ion-social-windows-outline:before {\n  content: \"\\F246\"; }\n\n.ion-social-wordpress:before {\n  content: \"\\F249\"; }\n\n.ion-social-wordpress-outline:before {\n  content: \"\\F248\"; }\n\n.ion-social-yahoo:before {\n  content: \"\\F24B\"; }\n\n.ion-social-yahoo-outline:before {\n  content: \"\\F24A\"; }\n\n.ion-social-yen:before {\n  content: \"\\F4F2\"; }\n\n.ion-social-yen-outline:before {\n  content: \"\\F4F1\"; }\n\n.ion-social-youtube:before {\n  content: \"\\F24D\"; }\n\n.ion-social-youtube-outline:before {\n  content: \"\\F24C\"; }\n\n.ion-soup-can:before {\n  content: \"\\F4F4\"; }\n\n.ion-soup-can-outline:before {\n  content: \"\\F4F3\"; }\n\n.ion-speakerphone:before {\n  content: \"\\F2B2\"; }\n\n.ion-speedometer:before {\n  content: \"\\F2B3\"; }\n\n.ion-spoon:before {\n  content: \"\\F2B4\"; }\n\n.ion-star:before {\n  content: \"\\F24E\"; }\n\n.ion-stats-bars:before {\n  content: \"\\F2B5\"; }\n\n.ion-steam:before {\n  content: \"\\F30B\"; }\n\n.ion-stop:before {\n  content: \"\\F24F\"; }\n\n.ion-thermometer:before {\n  content: \"\\F2B6\"; }\n\n.ion-thumbsdown:before {\n  content: \"\\F250\"; }\n\n.ion-thumbsup:before {\n  content: \"\\F251\"; }\n\n.ion-toggle:before {\n  content: \"\\F355\"; }\n\n.ion-toggle-filled:before {\n  content: \"\\F354\"; }\n\n.ion-transgender:before {\n  content: \"\\F4F5\"; }\n\n.ion-trash-a:before {\n  content: \"\\F252\"; }\n\n.ion-trash-b:before {\n  content: \"\\F253\"; }\n\n.ion-trophy:before {\n  content: \"\\F356\"; }\n\n.ion-tshirt:before {\n  content: \"\\F4F7\"; }\n\n.ion-tshirt-outline:before {\n  content: \"\\F4F6\"; }\n\n.ion-umbrella:before {\n  content: \"\\F2B7\"; }\n\n.ion-university:before {\n  content: \"\\F357\"; }\n\n.ion-unlocked:before {\n  content: \"\\F254\"; }\n\n.ion-upload:before {\n  content: \"\\F255\"; }\n\n.ion-usb:before {\n  content: \"\\F2B8\"; }\n\n.ion-videocamera:before {\n  content: \"\\F256\"; }\n\n.ion-volume-high:before {\n  content: \"\\F257\"; }\n\n.ion-volume-low:before {\n  content: \"\\F258\"; }\n\n.ion-volume-medium:before {\n  content: \"\\F259\"; }\n\n.ion-volume-mute:before {\n  content: \"\\F25A\"; }\n\n.ion-wand:before {\n  content: \"\\F358\"; }\n\n.ion-waterdrop:before {\n  content: \"\\F25B\"; }\n\n.ion-wifi:before {\n  content: \"\\F25C\"; }\n\n.ion-wineglass:before {\n  content: \"\\F2B9\"; }\n\n.ion-woman:before {\n  content: \"\\F25D\"; }\n\n.ion-wrench:before {\n  content: \"\\F2BA\"; }\n\n.ion-xbox:before {\n  content: \"\\F30C\"; }\n\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nfigcaption,\nfigure,\nmain {\n  display: block; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\ndfn {\n  font-style: italic; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\naudio,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails,\nmenu {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ncanvas {\n  display: inline-block; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #292b2c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #0275d8;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #014c8c;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n  a > code {\n    padding: 0;\n    color: inherit;\n    background-color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 8.33333333%;\n          flex: 0 0 8.33333333%;\n  max-width: 8.33333333%; }\n\n.col-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 16.66666667%;\n          flex: 0 0 16.66666667%;\n  max-width: 16.66666667%; }\n\n.col-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 25%;\n          flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33.33333333%;\n          flex: 0 0 33.33333333%;\n  max-width: 33.33333333%; }\n\n.col-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 41.66666667%;\n          flex: 0 0 41.66666667%;\n  max-width: 41.66666667%; }\n\n.col-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 50%;\n          flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 58.33333333%;\n          flex: 0 0 58.33333333%;\n  max-width: 58.33333333%; }\n\n.col-8 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 66.66666667%;\n          flex: 0 0 66.66666667%;\n  max-width: 66.66666667%; }\n\n.col-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 75%;\n          flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 83.33333333%;\n          flex: 0 0 83.33333333%;\n  max-width: 83.33333333%; }\n\n.col-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 91.66666667%;\n          flex: 0 0 91.66666667%;\n  max-width: 91.66666667%; }\n\n.col-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-0 {\n  right: auto; }\n\n.pull-1 {\n  right: 8.33333333%; }\n\n.pull-2 {\n  right: 16.66666667%; }\n\n.pull-3 {\n  right: 25%; }\n\n.pull-4 {\n  right: 33.33333333%; }\n\n.pull-5 {\n  right: 41.66666667%; }\n\n.pull-6 {\n  right: 50%; }\n\n.pull-7 {\n  right: 58.33333333%; }\n\n.pull-8 {\n  right: 66.66666667%; }\n\n.pull-9 {\n  right: 75%; }\n\n.pull-10 {\n  right: 83.33333333%; }\n\n.pull-11 {\n  right: 91.66666667%; }\n\n.pull-12 {\n  right: 100%; }\n\n.push-0 {\n  left: auto; }\n\n.push-1 {\n  left: 8.33333333%; }\n\n.push-2 {\n  left: 16.66666667%; }\n\n.push-3 {\n  left: 25%; }\n\n.push-4 {\n  left: 33.33333333%; }\n\n.push-5 {\n  left: 41.66666667%; }\n\n.push-6 {\n  left: 50%; }\n\n.push-7 {\n  left: 58.33333333%; }\n\n.push-8 {\n  left: 66.66666667%; }\n\n.push-9 {\n  left: 75%; }\n\n.push-10 {\n  left: 83.33333333%; }\n\n.push-11 {\n  left: 91.66666667%; }\n\n.push-12 {\n  left: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333333%; }\n\n.offset-2 {\n  margin-left: 16.66666667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333333%; }\n\n.offset-5 {\n  margin-left: 41.66666667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333333%; }\n\n.offset-8 {\n  margin-left: 66.66666667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333333%; }\n\n.offset-11 {\n  margin-left: 91.66666667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333333%;\n            flex: 0 0 8.33333333%;\n    max-width: 8.33333333%; }\n  .col-sm-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66666667%;\n            flex: 0 0 16.66666667%;\n    max-width: 16.66666667%; }\n  .col-sm-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333333%;\n            flex: 0 0 33.33333333%;\n    max-width: 33.33333333%; }\n  .col-sm-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66666667%;\n            flex: 0 0 41.66666667%;\n    max-width: 41.66666667%; }\n  .col-sm-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333333%;\n            flex: 0 0 58.33333333%;\n    max-width: 58.33333333%; }\n  .col-sm-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66666667%;\n            flex: 0 0 66.66666667%;\n    max-width: 66.66666667%; }\n  .col-sm-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333333%;\n            flex: 0 0 83.33333333%;\n    max-width: 83.33333333%; }\n  .col-sm-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66666667%;\n            flex: 0 0 91.66666667%;\n    max-width: 91.66666667%; }\n  .col-sm-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333333%; }\n  .pull-sm-2 {\n    right: 16.66666667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333333%; }\n  .pull-sm-5 {\n    right: 41.66666667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333333%; }\n  .pull-sm-8 {\n    right: 66.66666667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333333%; }\n  .pull-sm-11 {\n    right: 91.66666667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333333%; }\n  .push-sm-2 {\n    left: 16.66666667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333333%; }\n  .push-sm-5 {\n    left: 41.66666667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333333%; }\n  .push-sm-8 {\n    left: 66.66666667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333333%; }\n  .push-sm-11 {\n    left: 91.66666667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333333%; }\n  .offset-sm-2 {\n    margin-left: 16.66666667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333333%; }\n  .offset-sm-5 {\n    margin-left: 41.66666667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333333%; }\n  .offset-sm-8 {\n    margin-left: 66.66666667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333333%; }\n  .offset-sm-11 {\n    margin-left: 91.66666667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333333%;\n            flex: 0 0 8.33333333%;\n    max-width: 8.33333333%; }\n  .col-md-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66666667%;\n            flex: 0 0 16.66666667%;\n    max-width: 16.66666667%; }\n  .col-md-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333333%;\n            flex: 0 0 33.33333333%;\n    max-width: 33.33333333%; }\n  .col-md-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66666667%;\n            flex: 0 0 41.66666667%;\n    max-width: 41.66666667%; }\n  .col-md-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333333%;\n            flex: 0 0 58.33333333%;\n    max-width: 58.33333333%; }\n  .col-md-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66666667%;\n            flex: 0 0 66.66666667%;\n    max-width: 66.66666667%; }\n  .col-md-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333333%;\n            flex: 0 0 83.33333333%;\n    max-width: 83.33333333%; }\n  .col-md-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66666667%;\n            flex: 0 0 91.66666667%;\n    max-width: 91.66666667%; }\n  .col-md-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333333%; }\n  .pull-md-2 {\n    right: 16.66666667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333333%; }\n  .pull-md-5 {\n    right: 41.66666667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333333%; }\n  .pull-md-8 {\n    right: 66.66666667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333333%; }\n  .pull-md-11 {\n    right: 91.66666667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333333%; }\n  .push-md-2 {\n    left: 16.66666667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333333%; }\n  .push-md-5 {\n    left: 41.66666667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333333%; }\n  .push-md-8 {\n    left: 66.66666667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333333%; }\n  .push-md-11 {\n    left: 91.66666667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333333%; }\n  .offset-md-2 {\n    margin-left: 16.66666667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333333%; }\n  .offset-md-5 {\n    margin-left: 41.66666667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333333%; }\n  .offset-md-8 {\n    margin-left: 66.66666667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333333%; }\n  .offset-md-11 {\n    margin-left: 91.66666667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333333%;\n            flex: 0 0 8.33333333%;\n    max-width: 8.33333333%; }\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66666667%;\n            flex: 0 0 16.66666667%;\n    max-width: 16.66666667%; }\n  .col-lg-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333333%;\n            flex: 0 0 33.33333333%;\n    max-width: 33.33333333%; }\n  .col-lg-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66666667%;\n            flex: 0 0 41.66666667%;\n    max-width: 41.66666667%; }\n  .col-lg-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333333%;\n            flex: 0 0 58.33333333%;\n    max-width: 58.33333333%; }\n  .col-lg-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66666667%;\n            flex: 0 0 66.66666667%;\n    max-width: 66.66666667%; }\n  .col-lg-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333333%;\n            flex: 0 0 83.33333333%;\n    max-width: 83.33333333%; }\n  .col-lg-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66666667%;\n            flex: 0 0 91.66666667%;\n    max-width: 91.66666667%; }\n  .col-lg-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333333%; }\n  .pull-lg-2 {\n    right: 16.66666667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333333%; }\n  .pull-lg-5 {\n    right: 41.66666667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333333%; }\n  .pull-lg-8 {\n    right: 66.66666667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333333%; }\n  .pull-lg-11 {\n    right: 91.66666667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333333%; }\n  .push-lg-2 {\n    left: 16.66666667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333333%; }\n  .push-lg-5 {\n    left: 41.66666667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333333%; }\n  .push-lg-8 {\n    left: 66.66666667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333333%; }\n  .push-lg-11 {\n    left: 91.66666667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333333%; }\n  .offset-lg-2 {\n    margin-left: 16.66666667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333333%; }\n  .offset-lg-5 {\n    margin-left: 41.66666667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333333%; }\n  .offset-lg-8 {\n    margin-left: 66.66666667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333333%; }\n  .offset-lg-11 {\n    margin-left: 91.66666667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333333%;\n            flex: 0 0 8.33333333%;\n    max-width: 8.33333333%; }\n  .col-xl-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66666667%;\n            flex: 0 0 16.66666667%;\n    max-width: 16.66666667%; }\n  .col-xl-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333333%;\n            flex: 0 0 33.33333333%;\n    max-width: 33.33333333%; }\n  .col-xl-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66666667%;\n            flex: 0 0 41.66666667%;\n    max-width: 41.66666667%; }\n  .col-xl-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333333%;\n            flex: 0 0 58.33333333%;\n    max-width: 58.33333333%; }\n  .col-xl-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66666667%;\n            flex: 0 0 66.66666667%;\n    max-width: 66.66666667%; }\n  .col-xl-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333333%;\n            flex: 0 0 83.33333333%;\n    max-width: 83.33333333%; }\n  .col-xl-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66666667%;\n            flex: 0 0 91.66666667%;\n    max-width: 91.66666667%; }\n  .col-xl-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333333%; }\n  .pull-xl-2 {\n    right: 16.66666667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333333%; }\n  .pull-xl-5 {\n    right: 41.66666667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333333%; }\n  .pull-xl-8 {\n    right: 66.66666667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333333%; }\n  .pull-xl-11 {\n    right: 91.66666667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333333%; }\n  .push-xl-2 {\n    left: 16.66666667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333333%; }\n  .push-xl-5 {\n    left: 41.66666667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333333%; }\n  .push-xl-8 {\n    left: 66.66666667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333333%; }\n  .push-xl-11 {\n    left: 91.66666667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333333%; }\n  .offset-xl-2 {\n    margin-left: 16.66666667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333333%; }\n  .offset-xl-5 {\n    margin-left: 41.66666667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333333%; }\n  .offset-xl-8 {\n    margin-left: 66.66666667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333333%; }\n  .offset-xl-11 {\n    margin-left: 91.66666667%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table {\n    background-color: #fff; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #292b2c; }\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #fff;\n  background-color: #292b2c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #fff; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive.table-bordered {\n    border: 0; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #5cb3fd;\n    outline: none; }\n  .form-control::-webkit-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control::placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px); }\n\nselect.form-control:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16666667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem; }\n  .form-check.disabled .form-check-label {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  display: inline-block; }\n  .form-check-inline .form-check-label {\n    vertical-align: middle; }\n  .form-check-inline + .form-check-inline {\n    margin-left: 0.75rem; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.125rem 1.125rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #5cb85c; }\n\n.has-success .form-control {\n  border-color: #5cb85c; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #f0ad4e; }\n\n.has-warning .form-control {\n  border-color: #f0ad4e; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #d9534f; }\n\n.has-danger .form-control {\n  border-color: #d9534f; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n.form-inline {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 0;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row wrap;\n              flex-flow: row wrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-static {\n      display: inline-block; }\n    .form-inline .input-group {\n      width: auto; }\n    .form-inline .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .form-inline .form-check {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0; }\n    .form-inline .form-check-label {\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      padding-left: 0; }\n    .form-inline .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: 0.25rem;\n      vertical-align: text-bottom; }\n    .form-inline .has-feedback .form-control-feedback {\n      top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn:focus, .btn.focus {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25); }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n  .btn:active, .btn.active {\n    background-image: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    background-image: none;\n    border-color: #01549b; }\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #292b2c;\n    background-color: #e6e5e5;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #292b2c;\n    background-color: #e6e5e5;\n    background-image: none;\n    border-color: #adadad; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    background-image: none;\n    border-color: #2aabd2; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    background-image: none;\n    border-color: #419641; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    background-image: none;\n    border-color: #eb9316; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    background-image: none;\n    border-color: #c12e2a; }\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #0275d8;\n    background-color: transparent; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #ccc;\n    background-color: transparent; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #5bc0de;\n    background-color: transparent; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #5cb85c;\n    background-color: transparent; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #f0ad4e;\n    background-color: transparent; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #d9534f;\n    background-color: transparent; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #014c8c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled {\n    color: #636c72; }\n    .btn-link:disabled:focus, .btn-link:disabled:hover {\n      text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity 0.15s linear; }\n  .fade.show {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.show {\n    display: block; }\n\ntr.collapse.show {\n  display: table-row; }\n\ntbody.collapse.show {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #292b2c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #1d1e1f;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: transparent; }\n\n.show > .dropdown-menu {\n  display: block; }\n\n.show > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n  .btn-group .btn + .btn,\n  .btn-group .btn + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group-vertical {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .btn-group-vertical .btn,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0275d8; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #8fcafe; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0275d8;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .custom-controls-stacked .custom-control {\n    margin-bottom: 0.25rem; }\n    .custom-controls-stacked .custom-control + .custom-control {\n      margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #5cb3fd;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #464a4c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #464a4c;\n    background-color: #eceeef;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled {\n      color: #636c72;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #ddd #ddd #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-fill .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0.5rem 1rem; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem; }\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-sm .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-sm .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-sm > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-sm .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-md .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-md .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-md > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-md .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-lg .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-lg .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-lg > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-lg .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-lg .navbar-toggler {\n      display: none; } }\n\n.navbar-toggleable-xl {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-xl > .container {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    .navbar-toggleable-xl .navbar-nav .nav-link {\n      padding-right: .5rem;\n      padding-left: .5rem; }\n  .navbar-toggleable-xl > .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .navbar-toggleable-xl .navbar-collapse {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%; }\n  .navbar-toggleable-xl .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white; }\n  .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n  .navbar-inverse .navbar-toggler:focus,\n  .navbar-inverse .navbar-toggler:hover {\n    color: white; }\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-inverse .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white; }\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n\n.card {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n\n.card-block {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer {\n    background-color: transparent;\n    border-color: rgba(255, 255, 255, 0.2); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer,\n  .card-inverse .card-title,\n  .card-inverse .card-blockquote {\n    color: #fff; }\n  .card-inverse .card-link,\n  .card-inverse .card-text,\n  .card-inverse .card-subtitle,\n  .card-inverse .card-blockquote .blockquote-footer {\n    color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-link:focus, .card-inverse .card-link:hover {\n    color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-deck .card {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n      .card-deck .card:not(:first-child) {\n        margin-left: 15px; }\n      .card-deck .card:not(:last-child) {\n        margin-right: 15px; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-group .card {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    -webkit-column-count: 3;\n            column-count: 3;\n    -webkit-column-gap: 1.25rem;\n            column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%;\n      margin-bottom: 0.75rem; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #636c72;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #636c72; }\n\n.pagination {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #014c8c;\n    text-decoration: none;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-default {\n  background-color: #636c72; }\n  .badge-default[href]:focus, .badge-default[href]:hover {\n    background-color: #4b5257; }\n\n.badge-primary {\n  background-color: #0275d8; }\n  .badge-primary[href]:focus, .badge-primary[href]:hover {\n    background-color: #025aa5; }\n\n.badge-success {\n  background-color: #5cb85c; }\n  .badge-success[href]:focus, .badge-success[href]:hover {\n    background-color: #449d44; }\n\n.badge-info {\n  background-color: #5bc0de; }\n  .badge-info[href]:focus, .badge-info[href]:hover {\n    background-color: #31b0d5; }\n\n.badge-warning {\n  background-color: #f0ad4e; }\n  .badge-warning[href]:focus, .badge-warning[href]:hover {\n    background-color: #ec971f; }\n\n.badge-danger {\n  background-color: #d9534f; }\n  .badge-danger[href]:focus, .badge-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #0275d8; }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n          animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n.media-body {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1; }\n\n.list-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #292b2c; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #464a4c;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .list-group-item-action:active {\n    color: #292b2c;\n    background-color: #eceeef; }\n\n.list-group-item {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item:focus, .list-group-item:hover {\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #fff; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n      color: #636c72; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text {\n      color: #daeeff; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active,\n  button.list-group-item-success.active {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active,\n  button.list-group-item-info.active {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active,\n  button.list-group-item-warning.active {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active,\n  button.list-group-item-danger.active {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714286%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: -webkit-transform 0.3s ease-out;\n    transition: transform 0.3s ease-out;\n    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n    -webkit-transform: translate(0, -25%);\n            transform: translate(0, -25%); }\n  .modal.show .modal-dialog {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 15px; }\n\n.modal-footer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 30px auto; }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #fff; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #fff; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #f7f7f7; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #f7f7f7; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-right-radius: calc(0.3rem - 1px);\n  border-top-left-radius: calc(0.3rem - 1px); }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%; }\n  @media (-webkit-transform-3d) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n  @supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0; }\n\n@media (-webkit-transform-3d) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n@supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5; }\n  .carousel-control-prev:focus, .carousel-control-prev:hover,\n  .carousel-control-next:focus,\n  .carousel-control-next:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto;\n    max-width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0.5); }\n    .carousel-indicators li::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n    .carousel-indicators li::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n  .carousel-indicators .active {\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f7; }\n\n.bg-primary {\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important; }\n\n.bg-success {\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important; }\n\n.bg-info {\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important; }\n\n.bg-warning {\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important; }\n\n.bg-danger {\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important; }\n\n.bg-inverse {\n  background-color: #292b2c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.rounded-0 {\n  border-radius: 0; }\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important; }\n\n.d-inline-flex {\n  display: -webkit-inline-box !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n.flex-first {\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1; }\n\n.flex-last {\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.flex-unordered {\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0; }\n\n.flex-row {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: row !important;\n          flex-direction: row !important; }\n\n.flex-column {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: column !important;\n          flex-direction: column !important; }\n\n.flex-row-reverse {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: row-reverse !important;\n          flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: column-reverse !important;\n          flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  -ms-flex-wrap: wrap !important;\n      flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  -ms-flex-wrap: nowrap !important;\n      flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  -ms-flex-wrap: wrap-reverse !important;\n      flex-wrap: wrap-reverse !important; }\n\n.justify-content-start {\n  -webkit-box-pack: start !important;\n      -ms-flex-pack: start !important;\n          justify-content: flex-start !important; }\n\n.justify-content-end {\n  -webkit-box-pack: end !important;\n      -ms-flex-pack: end !important;\n          justify-content: flex-end !important; }\n\n.justify-content-center {\n  -webkit-box-pack: center !important;\n      -ms-flex-pack: center !important;\n          justify-content: center !important; }\n\n.justify-content-between {\n  -webkit-box-pack: justify !important;\n      -ms-flex-pack: justify !important;\n          justify-content: space-between !important; }\n\n.justify-content-around {\n  -ms-flex-pack: distribute !important;\n      justify-content: space-around !important; }\n\n.align-items-start {\n  -webkit-box-align: start !important;\n      -ms-flex-align: start !important;\n          align-items: flex-start !important; }\n\n.align-items-end {\n  -webkit-box-align: end !important;\n      -ms-flex-align: end !important;\n          align-items: flex-end !important; }\n\n.align-items-center {\n  -webkit-box-align: center !important;\n      -ms-flex-align: center !important;\n          align-items: center !important; }\n\n.align-items-baseline {\n  -webkit-box-align: baseline !important;\n      -ms-flex-align: baseline !important;\n          align-items: baseline !important; }\n\n.align-items-stretch {\n  -webkit-box-align: stretch !important;\n      -ms-flex-align: stretch !important;\n          align-items: stretch !important; }\n\n.align-content-start {\n  -ms-flex-line-pack: start !important;\n      align-content: flex-start !important; }\n\n.align-content-end {\n  -ms-flex-line-pack: end !important;\n      align-content: flex-end !important; }\n\n.align-content-center {\n  -ms-flex-line-pack: center !important;\n      align-content: center !important; }\n\n.align-content-between {\n  -ms-flex-line-pack: justify !important;\n      align-content: space-between !important; }\n\n.align-content-around {\n  -ms-flex-line-pack: distribute !important;\n      align-content: space-around !important; }\n\n.align-content-stretch {\n  -ms-flex-line-pack: stretch !important;\n      align-content: stretch !important; }\n\n.align-self-auto {\n  -ms-flex-item-align: auto !important;\n      -ms-grid-row-align: auto !important;\n      align-self: auto !important; }\n\n.align-self-start {\n  -ms-flex-item-align: start !important;\n      align-self: flex-start !important; }\n\n.align-self-end {\n  -ms-flex-item-align: end !important;\n      align-self: flex-end !important; }\n\n.align-self-center {\n  -ms-flex-item-align: center !important;\n      -ms-grid-row-align: center !important;\n      align-self: center !important; }\n\n.align-self-baseline {\n  -ms-flex-item-align: baseline !important;\n      align-self: baseline !important; }\n\n.align-self-stretch {\n  -ms-flex-item-align: stretch !important;\n      -ms-grid-row-align: stretch !important;\n      align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-sm-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-sm-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-sm-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-sm-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-sm-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-sm-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-sm-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-sm-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-sm-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-sm-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-sm-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-sm-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-sm-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-sm-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-sm-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-sm-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-sm-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-sm-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-sm-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-sm-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-sm-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-sm-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-sm-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-sm-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-md-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-md-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-md-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-md-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-md-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-md-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-md-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-md-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-md-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-md-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-md-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-md-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-md-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-md-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-md-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-md-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-md-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-md-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-md-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-md-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-md-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-md-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-md-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-md-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-md-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-md-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-md-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-lg-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-lg-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-lg-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-lg-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-lg-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-lg-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-lg-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-lg-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-lg-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-lg-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-lg-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-lg-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-lg-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-lg-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-lg-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-lg-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-lg-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-lg-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-lg-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-lg-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-lg-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-lg-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-lg-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-lg-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-xl-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-xl-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-xl-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-xl-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-xl-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-xl-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-xl-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-xl-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-xl-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-xl-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-xl-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-xl-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-xl-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-xl-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-xl-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-xl-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-xl-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-xl-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-xl-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-xl-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-xl-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-xl-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-xl-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-xl-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1030; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1 {\n  margin-left: 0.25rem !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2 {\n  margin-left: 0.5rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem 1rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mr-3 {\n  margin-right: 1rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3 {\n  margin-left: 1rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4 {\n  margin-left: 1.5rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem 3rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mr-5 {\n  margin-right: 3rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5 {\n  margin-left: 3rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1 {\n  padding-left: 0.25rem !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2 {\n  padding-left: 0.5rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem 1rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pr-3 {\n  padding-right: 1rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3 {\n  padding-left: 1rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4 {\n  padding-left: 1.5rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem 3rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pr-5 {\n  padding-right: 3rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5 {\n  padding-left: 3rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.mr-auto {\n  margin-right: auto !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto {\n  margin-left: auto !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0 {\n    margin-left: 0 !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem 1rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3 {\n    margin-left: 1rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem 3rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5 {\n    margin-left: 3rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 0 !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0 {\n    padding-left: 0 !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem 1rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3 {\n    padding-left: 1rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem 3rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5 {\n    padding-left: 3rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto {\n    margin-left: auto !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0 {\n    margin-left: 0 !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1 {\n    margin-left: 0.25rem !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2 {\n    margin-left: 0.5rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem 1rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3 {\n    margin-left: 1rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4 {\n    margin-left: 1.5rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem 3rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5 {\n    margin-left: 3rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-md-0 {\n    padding: 0 0 !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0 {\n    padding-left: 0 !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1 {\n    padding-left: 0.25rem !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2 {\n    padding-left: 0.5rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem 1rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3 {\n    padding-left: 1rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4 {\n    padding-left: 1.5rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem 3rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5 {\n    padding-left: 3rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto {\n    margin-left: auto !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0 {\n    margin-left: 0 !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem 1rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3 {\n    margin-left: 1rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem 3rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5 {\n    margin-left: 3rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 0 !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0 {\n    padding-left: 0 !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem 1rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3 {\n    padding-left: 1rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem 3rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5 {\n    padding-left: 3rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto {\n    margin-left: auto !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0 {\n    margin-left: 0 !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem 1rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3 {\n    margin-left: 1rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem 3rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5 {\n    margin-left: 3rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 0 !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0 {\n    padding-left: 0 !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem 1rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3 {\n    padding-left: 1rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem 3rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5 {\n    padding-left: 3rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto {\n    margin-left: auto !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #636c72 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important; }\n\n.text-gray-dark {\n  color: #292b2c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n::-webkit-scrollbar {\n  width: 0.5rem;\n  height: 0.5rem; }\n\n::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.3);\n  cursor: pointer; }\n\n::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.7); }\n\nbody {\n  scrollbar-face-color: rgba(0, 0, 0, 0.3);\n  scrollbar-track-color: rgba(255, 255, 255, 0.7);\n  min-width: 320px; }\n\nbody.scrolless {\n  overflow: hidden; }\n\n.nga-theme-default .layout {\n  font-family: Roboto, sans-serif;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: rgba(0, 0, 0, 0.87);\n  background: white;\n  min-height: 100vh; }\n  .nga-theme-default .layout nga-layout-header {\n    font-family: Roboto, sans-serif;\n    font-size: 1rem;\n    line-height: 80px;\n    box-shadow: none; }\n    .nga-theme-default .layout nga-layout-header nav {\n      height: 80px;\n      padding: 0;\n      background: white;\n      color: rgba(0, 0, 0, 0.75); }\n      .nga-theme-default .layout nga-layout-header nav a {\n        color: rgba(0, 0, 0, 0.75); }\n        .nga-theme-default .layout nga-layout-header nav a:focus, .nga-theme-default .layout nga-layout-header nav a:active, .nga-theme-default .layout nga-layout-header nav a:hover {\n          color: rgba(0, 0, 0, 0.75); }\n    .nga-theme-default .layout nga-layout-header.fixed ~ .layout-container {\n      padding-top: 80px; }\n  .nga-theme-default .layout .layout-container .content nga-layout-footer {\n    box-shadow: none; }\n    .nga-theme-default .layout .layout-container .content nga-layout-footer nav {\n      height: 100px;\n      padding: 1rem;\n      background: white;\n      color: rgba(0, 0, 0, 0.87);\n      border-top: 1px solid rgba(0, 0, 0, 0.1); }\n      .nga-theme-default .layout .layout-container .content nga-layout-footer nav a {\n        color: rgba(0, 0, 0, 0.75); }\n        .nga-theme-default .layout .layout-container .content nga-layout-footer nav a:focus, .nga-theme-default .layout .layout-container .content nga-layout-footer nav a:active, .nga-theme-default .layout .layout-container .content nga-layout-footer nav a:hover {\n          color: rgba(0, 0, 0, 0.75); }\n  .nga-theme-default .layout .layout-container .content.center {\n    width: 1312px;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 1312px;\n            flex: 0 1 1312px; }\n  .nga-theme-default .layout .layout-container .content .columns nga-layout-column {\n    padding: 0; }\n\n.nga-theme-default nga-sidebar {\n  font-size: 1rem;\n  line-height: 1.25;\n  width: 12rem;\n  background: white;\n  color: white; }\n  .nga-theme-default nga-sidebar ::-webkit-scrollbar {\n    width: 0.4em;\n    height: 0.4em; }\n  .nga-theme-default nga-sidebar ::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.6);\n    cursor: pointer; }\n  .nga-theme-default nga-sidebar ::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.7); }\n  .nga-theme-default nga-sidebar body {\n    scrollbar-face-color: rgba(0, 0, 0, 0.6);\n    scrollbar-track-color: rgba(255, 255, 255, 0.7); }\n  .nga-theme-default nga-sidebar > .scrollable {\n    height: 100vh;\n    position: fixed;\n    width: 12rem;\n    background: white;\n    box-shadow: none; }\n    .nga-theme-default nga-sidebar > .scrollable > .main-container {\n      padding: 0.5rem; }\n  .nga-theme-default nga-sidebar.collapsed {\n    width: 0;\n    padding: 0; }\n    .nga-theme-default nga-sidebar.collapsed > .scrollable {\n      width: 0;\n      padding: 0; }\n  .nga-theme-default nga-sidebar.compacted {\n    width: 3.5rem; }\n    .nga-theme-default nga-sidebar.compacted > .scrollable {\n      width: 3.5rem; }\n  .nga-theme-default nga-sidebar.expanded {\n    width: 12rem; }\n    .nga-theme-default nga-sidebar.expanded > .scrollable {\n      width: 12rem; }\n  .nga-theme-default nga-sidebar nga-sidebar-header {\n    padding: 0.5rem;\n    height: 3.5rem; }\n  .nga-theme-default nga-sidebar nga-sidebar-footer {\n    padding: 0.5rem;\n    height: 3.5rem; }\n  .nga-theme-default nga-sidebar nga-menu {\n    margin: 0 -0.5rem; }\n\n.nga-theme-default nga-card {\n  font-size: 1rem;\n  line-height: 1.25;\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n  margin-bottom: 1rem;\n  border-radius: 0.5rem;\n  box-shadow: none;\n  font-weight: 400; }\n  .nga-theme-default nga-card ::-webkit-scrollbar {\n    width: 0.4em;\n    height: 0.4em; }\n  .nga-theme-default nga-card ::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.6);\n    cursor: pointer; }\n  .nga-theme-default nga-card ::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.7); }\n  .nga-theme-default nga-card body {\n    scrollbar-face-color: rgba(0, 0, 0, 0.6);\n    scrollbar-track-color: rgba(255, 255, 255, 0.7); }\n  .nga-theme-default nga-card.small-card {\n    height: 120px; }\n  .nga-theme-default nga-card.xsmall-card {\n    height: 192px; }\n  .nga-theme-default nga-card.medium-card {\n    height: 400px; }\n  .nga-theme-default nga-card.xmedium-card {\n    height: 576px; }\n  .nga-theme-default nga-card.large-card {\n    height: 960px; }\n  .nga-theme-default nga-card.active-card nga-card-header {\n    background-color: rgba(0, 0, 0, 0.87);\n    border-bottom-color: rgba(0, 0, 0, 0.87);\n    color: white; }\n  .nga-theme-default nga-card.disabled-card nga-card-header {\n    background-color: rgba(255, 255, 255, 0.4);\n    border-bottom-color: rgba(255, 255, 255, 0.4); }\n  .nga-theme-default nga-card.primary-card nga-card-header {\n    background-color: #ff241f;\n    border-bottom-color: #ff241f; }\n  .nga-theme-default nga-card.info-card nga-card-header {\n    background-color: #3377ff;\n    border-bottom-color: #3377ff; }\n  .nga-theme-default nga-card.success-card nga-card-header {\n    background-color: #00cc66;\n    border-bottom-color: #00cc66; }\n  .nga-theme-default nga-card.warning-card nga-card-header {\n    background-color: #e5b045;\n    border-bottom-color: #e5b045; }\n  .nga-theme-default nga-card.danger-card nga-card-header {\n    background-color: #ff3355;\n    border-bottom-color: #ff3355; }\n  .nga-theme-default nga-card nga-card-body {\n    padding: 1rem; }\n  .nga-theme-default nga-card nga-card-footer {\n    padding: 1rem;\n    border-bottom-left-radius: 0.5rem;\n    border-bottom-right-radius: 0.5rem; }\n  .nga-theme-default nga-card nga-card-header {\n    padding: 1rem;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.87);\n    border-top-left-radius: 0.5rem;\n    border-top-right-radius: 0.5rem;\n    color: rgba(0, 0, 0, 0.87);\n    font-family: Roboto, sans-serif;\n    font-size: 2rem;\n    font-weight: 500; }\n    .nga-theme-default nga-card nga-card-header h1 {\n      margin: 0; }\n    .nga-theme-default nga-card nga-card-header h2 {\n      margin: 0; }\n    .nga-theme-default nga-card nga-card-header h3 {\n      margin: 0; }\n    .nga-theme-default nga-card nga-card-header h4 {\n      margin: 0; }\n    .nga-theme-default nga-card nga-card-header h5 {\n      margin: 0; }\n    .nga-theme-default nga-card nga-card-header h6 {\n      margin: 0; }\n\n.nga-theme-default nga-tabset ::-webkit-scrollbar {\n  width: 0.4em;\n  height: 0.4em; }\n\n.nga-theme-default nga-tabset ::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.6);\n  cursor: pointer; }\n\n.nga-theme-default nga-tabset ::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.7); }\n\n.nga-theme-default nga-tabset body {\n  scrollbar-face-color: rgba(0, 0, 0, 0.6);\n  scrollbar-track-color: rgba(255, 255, 255, 0.7); }\n\n.nga-theme-default nga-tabset ul {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.87);\n  font-size: 2rem;\n  padding: 0 1.25rem; }\n  .nga-theme-default nga-tabset ul li {\n    background: transparent;\n    min-width: 100px; }\n    .nga-theme-default nga-tabset ul li a {\n      padding: 1.25rem;\n      color: rgba(0, 0, 0, 0.87); }\n      .nga-theme-default nga-tabset ul li a::before {\n        background-image: linear-gradient(to right, #00ccaa, #00cc66);\n        box-shadow: 0 0 16px -2px #00cc88; }\n    .nga-theme-default nga-tabset ul li.active {\n      background: transparent; }\n      .nga-theme-default nga-tabset ul li.active a {\n        font-weight: 500;\n        color: #ffffff; }\n\n.nga-theme-default nga-tabset nga-tab {\n  font-size: 1rem;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: transparent;\n  padding: 1.25rem; }\n\n.nga-theme-default nga-route-tabset ::-webkit-scrollbar {\n  width: 0.4em;\n  height: 0.4em; }\n\n.nga-theme-default nga-route-tabset ::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.6);\n  cursor: pointer; }\n\n.nga-theme-default nga-route-tabset ::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.7); }\n\n.nga-theme-default nga-route-tabset body {\n  scrollbar-face-color: rgba(0, 0, 0, 0.6);\n  scrollbar-track-color: rgba(255, 255, 255, 0.7); }\n\n.nga-theme-default nga-route-tabset ul {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.87);\n  font-size: 2rem;\n  padding: 0 1.25rem; }\n  .nga-theme-default nga-route-tabset ul li {\n    background: transparent;\n    min-width: 100px; }\n    .nga-theme-default nga-route-tabset ul li a {\n      padding: 1.25rem;\n      color: rgba(0, 0, 0, 0.87); }\n      .nga-theme-default nga-route-tabset ul li a::before {\n        background-image: linear-gradient(to right, #00ccaa, #00cc66);\n        box-shadow: 0 0 16px -2px #00cc88; }\n    .nga-theme-default nga-route-tabset ul li.active {\n      background: transparent; }\n      .nga-theme-default nga-route-tabset ul li.active a {\n        font-weight: 500;\n        color: #ffffff; }\n\n.nga-theme-default nga-menu {\n  font-family: Roboto, sans-serif;\n  font-size: 1.25rem;\n  line-height: 1.25; }\n  .nga-theme-default nga-menu.inverse ul > li a, .nga-theme-default nga-menu.inverse ul > li .menu-group {\n    color: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default nga-menu.inverse ul > li a:focus, .nga-theme-default nga-menu.inverse ul > li a:active, .nga-theme-default nga-menu.inverse ul > li a:hover, .nga-theme-default nga-menu.inverse ul > li .menu-group:focus, .nga-theme-default nga-menu.inverse ul > li .menu-group:active, .nga-theme-default nga-menu.inverse ul > li .menu-group:hover {\n      color: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default nga-menu.inverse ul > li a.active, .nga-theme-default nga-menu.inverse ul > li .menu-group.active {\n      background: rgba(0, 0, 0, 0.87);\n      color: white; }\n  .nga-theme-default nga-menu ul > li .menu-group {\n    font-weight: 500;\n    font-size: 0.875rem; }\n  .nga-theme-default nga-menu ul > li a, .nga-theme-default nga-menu ul > li .menu-group {\n    color: rgba(0, 0, 0, 0.87);\n    padding: 0.5rem 1rem; }\n    .nga-theme-default nga-menu ul > li a:focus, .nga-theme-default nga-menu ul > li a:active, .nga-theme-default nga-menu ul > li a:hover, .nga-theme-default nga-menu ul > li .menu-group:focus, .nga-theme-default nga-menu ul > li .menu-group:active, .nga-theme-default nga-menu ul > li .menu-group:hover {\n      color: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default nga-menu ul > li a.active, .nga-theme-default nga-menu ul > li .menu-group.active {\n      background: white;\n      color: rgba(0, 0, 0, 0.87); }\n  .nga-theme-default nga-menu ul > li .menu-group {\n    color: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default nga-menu ul > li .menu-group:focus, .nga-theme-default nga-menu ul > li .menu-group:active, .nga-theme-default nga-menu ul > li .menu-group:hover {\n      color: rgba(0, 0, 0, 0.87); }\n  .nga-theme-default nga-menu ul.menu-expanded {\n    background: white; }\n    .nga-theme-default nga-menu ul.menu-expanded li, .nga-theme-default nga-menu ul.menu-expanded a, .nga-theme-default nga-menu ul.menu-expanded .menu-group {\n      color: rgba(0, 0, 0, 0.87); }\n      .nga-theme-default nga-menu ul.menu-expanded li:focus, .nga-theme-default nga-menu ul.menu-expanded li:active, .nga-theme-default nga-menu ul.menu-expanded li:hover, .nga-theme-default nga-menu ul.menu-expanded a:focus, .nga-theme-default nga-menu ul.menu-expanded a:active, .nga-theme-default nga-menu ul.menu-expanded a:hover, .nga-theme-default nga-menu ul.menu-expanded .menu-group:focus, .nga-theme-default nga-menu ul.menu-expanded .menu-group:active, .nga-theme-default nga-menu ul.menu-expanded .menu-group:hover {\n        color: rgba(0, 0, 0, 0.87); }\n      .nga-theme-default nga-menu ul.menu-expanded li.active, .nga-theme-default nga-menu ul.menu-expanded a.active, .nga-theme-default nga-menu ul.menu-expanded .menu-group.active {\n        background: white;\n        color: rgba(255, 40, 36, 0.87); }\n\n.nga-theme-default nga-user {\n  font-size: 1rem;\n  line-height: 1.25; }\n  .nga-theme-default nga-user .user-picture {\n    height: 2.5rem;\n    width: 2.5rem;\n    background: white;\n    border: solid 2px #00f9a6; }\n    .nga-theme-default nga-user .user-picture.background {\n      color: rgba(0, 0, 0, 0.87); }\n  .nga-theme-default nga-user .user-name {\n    font-family: Roboto, sans-serif; }\n  .nga-theme-default nga-user.inverse .user-picture {\n    background: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default nga-user.inverse .user-picture.background {\n      color: white; }\n  .nga-theme-default nga-user.small .user-picture {\n    height: 1.5rem;\n    width: 1.5rem;\n    font-size: 80%; }\n  .nga-theme-default nga-user.medium .user-picture {\n    height: 2.5rem;\n    width: 2.5rem; }\n  .nga-theme-default nga-user.xmedium .user-picture {\n    height: 3.25rem;\n    width: 3.25rem; }\n  .nga-theme-default nga-user.large .user-picture {\n    height: 4rem;\n    width: 4rem; }\n  .nga-theme-default nga-user .user-context-menu {\n    background-color: rgba(0, 0, 0, 0.87);\n    border: 1px solid rgba(81, 113, 165, 0.15); }\n    .nga-theme-default nga-user .user-context-menu ul > li > a {\n      color: #285eb8; }\n      .nga-theme-default nga-user .user-context-menu ul > li > a:focus, .nga-theme-default nga-user .user-context-menu ul > li > a:active, .nga-theme-default nga-user .user-context-menu ul > li > a:hover {\n        color: #2750a0; }\n    .nga-theme-default nga-user .user-context-menu ul > li.arrow {\n      border-bottom: 11px solid !important; }\n      .nga-theme-default nga-user .user-context-menu ul > li.arrow::after {\n        border-bottom: 11px solid rgba(0, 0, 0, 0.87) !important; }\n\n.nga-theme-default nga-actions {\n  font-size: 1rem;\n  line-height: 1.25; }\n  .nga-theme-default nga-actions nga-action {\n    height: 1.5rem;\n    padding: 0 1.25rem;\n    border-left: 1px solid rgba(0, 0, 0, 0.3);\n    background: transparent; }\n    .nga-theme-default nga-actions nga-action i.control-icon {\n      color: white;\n      font-size: 1.5rem; }\n  .nga-theme-default nga-actions.inverse nga-action {\n    border-left: 1px solid rgba(0, 0, 0, 0.3); }\n    .nga-theme-default nga-actions.inverse nga-action i.control-icon {\n      color: rgba(0, 0, 0, 0.87); }\n  .nga-theme-default nga-actions.small nga-action {\n    height: 1.5rem; }\n    .nga-theme-default nga-actions.small nga-action i.control-icon {\n      font-size: 1.5rem; }\n  .nga-theme-default nga-actions.medium nga-action {\n    height: 2.5rem; }\n    .nga-theme-default nga-actions.medium nga-action i.control-icon {\n      font-size: 2.5rem; }\n  .nga-theme-default nga-actions.large nga-action {\n    height: 4rem; }\n    .nga-theme-default nga-actions.large nga-action i.control-icon {\n      font-size: 4rem; }\n\n.nga-theme-default nga-search-field .search {\n  background: linear-gradient(to right, #171749, #413789); }\n  .nga-theme-default nga-search-field .search button {\n    color: #a1a1e5; }\n  .nga-theme-default nga-search-field .search span {\n    color: #a1a1e5; }\n  .nga-theme-default nga-search-field .search input {\n    color: color-inverse;\n    border-bottom: 4px solid #a1a1e5; }\n    .nga-theme-default nga-search-field .search input::-webkit-input-placeholder {\n      color: #a1a1e5; }\n    .nga-theme-default nga-search-field .search input:-ms-input-placeholder {\n      color: #a1a1e5; }\n    .nga-theme-default nga-search-field .search input::placeholder {\n      color: #a1a1e5; }\n    .nga-theme-default nga-search-field .search input::-ms-clear {\n      display: none; }\n\n.nga-theme-default nga-search-field.rotate-layout .wrapper {\n  opacity: 0;\n  background: linear-gradient(to right, #171749, #413789); }\n\n.nga-theme-de" +
"fault nga-search-field.modal-zoomin .search::before,\n.nga-theme-default nga-search-field.modal-zoomin .search::after {\n  border: 1.5rem solid rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default nga-search-field.modal-half .form-wrapper {\n  background: linear-gradient(to right, #171749, #413789); }\n\n.nga-theme-default nga-search-field.modal-half .search::before {\n  background: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default nga-search-field.modal-drop .form-content::after {\n  background: #a1a1e5; }\n\n.nga-theme-default nga-search-field.modal-drop .search::before {\n  background: linear-gradient(to right, #171749, #413789); }\n\n.nga-theme-default nga-search-field.curtain .search::after {\n  background: linear-gradient(to right, #171749, #413789); }\n\n.nga-theme-default nga-search-field.curtain .search {\n  background: linear-gradient(to right, #171749, #413789); }\n\n.nga-theme-default nga-search-field.column-curtain .wrapper::before {\n  background: linear-gradient(to right, #171749, #413789); }\n\n.nga-theme-default nga-search-field.column-curtain .wrapper::after {\n  background: transparent; }\n\n.nga-theme-default nga-search-field.column-curtain.show .wrapper::after {\n  background: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default nga-search-field.simple-search input {\n  border-bottom: 1px solid #a1a1e5; }\n\n.nga-theme-default nga-search button {\n  color: #a1a1e5; }\n\n.nga-theme-default .btn {\n  color: #ffffff;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  font-weight: 500;\n  font-family: Roboto, sans-serif;\n  border: 2px solid transparent;\n  transition: none;\n  padding: 0.75rem 1.5rem;\n  font-size: 1rem;\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-rectangle {\n  padding: 0.75rem 1.5rem;\n  font-size: 1rem;\n  border-radius: 4px; }\n\n.nga-theme-default .btn.btn-semi-round {\n  padding: 0.75rem 1.5rem;\n  font-size: 1rem;\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-round {\n  padding: 0.75rem 1.5rem;\n  font-size: 1rem;\n  border-radius: 24px; }\n\n.nga-theme-default .btn.btn-lg, .nga-theme-default .btn-group-lg > .btn {\n  line-height: 1.375rem;\n  padding: 1.25rem 1.75rem;\n  font-size: 1.25rem;\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-md {\n  line-height: 1.125rem;\n  padding: 1rem 1.5rem;\n  font-size: 1rem;\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-sm, .nga-theme-default .btn-group-sm > .btn {\n  line-height: 1rem;\n  padding: 0.875rem 1.5rem;\n  font-size: 0.875rem;\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-tn {\n  line-height: 0.875rem;\n  padding: 0.625rem 1.25rem;\n  font-size: 0.75rem;\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-primary {\n  background-color: #ff241f; }\n  .nga-theme-default .btn.btn-primary:focus, .nga-theme-default .btn.btn-primary.focus {\n    background-color: #db1f1b;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-primary:hover, .nga-theme-default .btn.btn-primary.hover {\n    background-color: #ff433e;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-primary:active, .nga-theme-default .btn.btn-primary.active {\n    background-color: #db1f1b;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-warning {\n  background-color: #e5b045; }\n  .nga-theme-default .btn.btn-warning:focus, .nga-theme-default .btn.btn-warning.focus {\n    background-color: #c5973b;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-warning:hover, .nga-theme-default .btn.btn-warning.hover {\n    background-color: #e9bb5f;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-warning:active, .nga-theme-default .btn.btn-warning.active {\n    background-color: #c5973b;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-info {\n  background-color: #3377ff; }\n  .nga-theme-default .btn.btn-info:focus, .nga-theme-default .btn.btn-info.focus {\n    background-color: #2c66db;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-info:hover, .nga-theme-default .btn.btn-info.hover {\n    background-color: #508aff;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-info:active, .nga-theme-default .btn.btn-info.active {\n    background-color: #2c66db;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-success {\n  background-color: #00cc66; }\n  .nga-theme-default .btn.btn-success:focus, .nga-theme-default .btn.btn-success.focus {\n    background-color: #00af58;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-success:hover, .nga-theme-default .btn.btn-success.hover {\n    background-color: #24d37b;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-success:active, .nga-theme-default .btn.btn-success.active {\n    background-color: #00af58;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-danger {\n  background-color: #ff3355; }\n  .nga-theme-default .btn.btn-danger:focus, .nga-theme-default .btn.btn-danger.focus {\n    background-color: #db2c49;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-danger:hover, .nga-theme-default .btn.btn-danger.hover {\n    background-color: #ff506d;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-danger:active, .nga-theme-default .btn.btn-danger.active {\n    background-color: #db2c49;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-secondary {\n  border: 2px solid #bdbaff;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-secondary:focus, .nga-theme-default .btn.btn-secondary.focus {\n    background-color: #a3a0db;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-secondary:hover, .nga-theme-default .btn.btn-secondary.hover {\n    background-color: #c6c4ff;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-secondary:active, .nga-theme-default .btn.btn-secondary.active {\n    background-color: #a3a0db;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-hero-primary {\n  background-image: linear-gradient(to right, #ff6f1f, #ff241f);\n  box-shadow: 0 3px 0 0 #db3f1b, 0 2px 12px 0 #ff491f, 0 4px 10px 0 rgba(33, 7, 77, 0.5);\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none; }\n  .nga-theme-default .btn.btn-hero-primary:focus,\n  .nga-theme-default .btn.btn-hero-primary .focus {\n    background-image: linear-gradient(to right, #db5f1b, #db1f1b);\n    box-shadow: none;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-hero-primary:hover,\n  .nga-theme-default .btn.btn-hero-primary .hover {\n    background-image: linear-gradient(to right, #ff833e, #ff433e); }\n  .nga-theme-default .btn.btn-hero-primary:active,\n  .nga-theme-default .btn.btn-hero-primary .active {\n    background-image: linear-gradient(to right, #db5f1b, #db1f1b);\n    box-shadow: none;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-hero-warning {\n  background-image: linear-gradient(to right, #e5e545, #e5b045);\n  box-shadow: 0 3px 0 0 #c5af3b, 0 2px 12px 0 #e5cb45, 0 4px 10px 0 rgba(33, 7, 77, 0.5);\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none; }\n  .nga-theme-default .btn.btn-hero-warning:focus,\n  .nga-theme-default .btn.btn-hero-warning .focus {\n    background-image: linear-gradient(to right, #c5c53b, #c5973b);\n    box-shadow: none;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-hero-warning:hover,\n  .nga-theme-default .btn.btn-hero-warning .hover {\n    background-image: linear-gradient(to right, #e8e95f, #e9bb5f); }\n  .nga-theme-default .btn.btn-hero-warning:active,\n  .nga-theme-default .btn.btn-hero-warning .active {\n    background-image: linear-gradient(to right, #c5c53b, #c5973b);\n    box-shadow: none;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-hero-success {\n  background-image: linear-gradient(to right, #00ccaa, #00cc66);\n  box-shadow: 0 3px 0 0 #00af75, 0 2px 12px 0 #00cc88, 0 4px 10px 0 rgba(33, 7, 77, 0.5);\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none; }\n  .nga-theme-default .btn.btn-hero-success:focus,\n  .nga-theme-default .btn.btn-hero-success .focus {\n    background-image: linear-gradient(to right, #00af92, #00af58);\n    box-shadow: none;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-hero-success:hover,\n  .nga-theme-default .btn.btn-hero-success .hover {\n    background-image: linear-gradient(to right, #24d3b6, #24d37b); }\n  .nga-theme-default .btn.btn-hero-success:active,\n  .nga-theme-default .btn.btn-hero-success .active {\n    background-image: linear-gradient(to right, #00af92, #00af58);\n    box-shadow: none;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-hero-info {\n  background-image: linear-gradient(to right, #33bbff, #3377ff);\n  box-shadow: 0 3px 0 0 #2c84db, 0 2px 12px 0 #3399ff, 0 4px 10px 0 rgba(33, 7, 77, 0.5);\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none; }\n  .nga-theme-default .btn.btn-hero-info:focus,\n  .nga-theme-default .btn.btn-hero-info .focus {\n    background-image: linear-gradient(to right, #2ca1db, #2c66db);\n    box-shadow: none;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-hero-info:hover,\n  .nga-theme-default .btn.btn-hero-info .hover {\n    background-image: linear-gradient(to right, #50c5ff, #508aff); }\n  .nga-theme-default .btn.btn-hero-info:active,\n  .nga-theme-default .btn.btn-hero-info .active {\n    background-image: linear-gradient(to right, #2ca1db, #2c66db);\n    box-shadow: none;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-hero-danger {\n  background-image: linear-gradient(to right, #ff3399, #ff3355);\n  box-shadow: 0 3px 0 0 #db2c66, 0 2px 12px 0 #ff3377, 0 4px 10px 0 rgba(33, 7, 77, 0.5);\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none; }\n  .nga-theme-default .btn.btn-hero-danger:focus,\n  .nga-theme-default .btn.btn-hero-danger .focus {\n    background-image: linear-gradient(to right, #db2c84, #db2c49);\n    box-shadow: none;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-hero-danger:hover,\n  .nga-theme-default .btn.btn-hero-danger .hover {\n    background-image: linear-gradient(to right, #ff50a7, #ff506d); }\n  .nga-theme-default .btn.btn-hero-danger:active,\n  .nga-theme-default .btn.btn-hero-danger .active {\n    background-image: linear-gradient(to right, #db2c84, #db2c49);\n    box-shadow: none;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-hero-secondary {\n  background-color: transparent;\n  box-shadow: 0 3px 0 0 #ada0db, 0 2px 12px 0 #c9baff, 0 4px 10px 0 rgba(33, 7, 77, 0.5);\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: 2px solid #bdbaff; }\n  .nga-theme-default .btn.btn-hero-secondary:focus,\n  .nga-theme-default .btn.btn-hero-secondary .focus {\n    border-color: #a3a0db;\n    box-shadow: none;\n    background: none; }\n  .nga-theme-default .btn.btn-hero-secondary:hover,\n  .nga-theme-default .btn.btn-hero-secondary .hover {\n    background-color: rgba(189, 186, 255, 0.14); }\n  .nga-theme-default .btn.btn-hero-secondary:active,\n  .nga-theme-default .btn.btn-hero-secondary .active {\n    border-color: #a3a0db;\n    box-shadow: none;\n    background: none; }\n\n.nga-theme-default .btn.btn-outline-primary {\n  border: 2px solid #ff241f;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-outline-primary:focus, .nga-theme-default .btn.btn-outline-primary.focus {\n    background-color: #db1f1b;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-outline-primary:hover, .nga-theme-default .btn.btn-outline-primary.hover {\n    background-color: #ff433e;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-outline-primary:active, .nga-theme-default .btn.btn-outline-primary.active {\n    background-color: #db1f1b;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-outline-warning {\n  border: 2px solid #e5b045;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-outline-warning:focus, .nga-theme-default .btn.btn-outline-warning.focus {\n    background-color: #c5973b;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-outline-warning:hover, .nga-theme-default .btn.btn-outline-warning.hover {\n    background-color: #e9bb5f;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-outline-warning:active, .nga-theme-default .btn.btn-outline-warning.active {\n    background-color: #c5973b;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-outline-success {\n  border: 2px solid #00cc66;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-outline-success:focus, .nga-theme-default .btn.btn-outline-success.focus {\n    background-color: #00af58;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-outline-success:hover, .nga-theme-default .btn.btn-outline-success.hover {\n    background-color: #24d37b;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-outline-success:active, .nga-theme-default .btn.btn-outline-success.active {\n    background-color: #00af58;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-outline-info {\n  border: 2px solid #3377ff;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-outline-info:focus, .nga-theme-default .btn.btn-outline-info.focus {\n    background-color: #2c66db;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-outline-info:hover, .nga-theme-default .btn.btn-outline-info.hover {\n    background-color: #508aff;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-outline-info:active, .nga-theme-default .btn.btn-outline-info.active {\n    background-color: #2c66db;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-outline-danger {\n  border: 2px solid #ff3355;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-outline-danger:focus, .nga-theme-default .btn.btn-outline-danger.focus {\n    background-color: #db2c49;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-outline-danger:hover, .nga-theme-default .btn.btn-outline-danger.hover {\n    background-color: #ff506d;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-outline-danger:active, .nga-theme-default .btn.btn-outline-danger.active {\n    background-color: #db2c49;\n    border-color: transparent; }\n\n.nga-theme-default .btn.btn-outline-secondary {\n  border: 2px solid #bdbaff;\n  background-color: transparent; }\n  .nga-theme-default .btn.btn-outline-secondary:focus, .nga-theme-default .btn.btn-outline-secondary.focus {\n    background-color: #a3a0db;\n    border-color: transparent;\n    box-shadow: none; }\n  .nga-theme-default .btn.btn-outline-secondary:hover, .nga-theme-default .btn.btn-outline-secondary.hover {\n    background-color: #c6c4ff;\n    border-color: transparent; }\n  .nga-theme-default .btn.btn-outline-secondary:active, .nga-theme-default .btn.btn-outline-secondary.active {\n    background-color: #a3a0db;\n    border-color: transparent; }\n\n.nga-theme-default .btn + .dropdown-toggle,\n.nga-theme-default .btn-sm + .dropdown-toggle,\n.nga-theme-default .btn-group-sm > .btn + .dropdown-toggle,\n.nga-theme-default .btn-lg + .dropdown-toggle,\n.nga-theme-default .btn-group-lg > .btn + .dropdown-toggle {\n  padding-left: 1rem;\n  padding-right: 1rem; }\n\n.nga-theme-default .btn-group.dropdown > [class*='btn-outline-']:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-right-color: transparent; }\n\n.nga-theme-default .btn-group > [class*='btn-outline-'] + .dropdown-toggle {\n  border-left-color: transparent;\n  margin-left: -4px;\n  padding-left: calc(1rem + 4px); }\n\n.nga-theme-default .btn-group.btn-group-hidden > .btn {\n  background-color: transparent; }\n\n.nga-theme-default .btn-group.btn-group-block {\n  width: 100%; }\n  .nga-theme-default .btn-group.btn-group-block .btn:not(.btn-group-icon) {\n    width: 100%; }\n\n.nga-theme-default .btn-group.btn-group-dropdown-divider > .btn:first-child:not(:last-child):not(.dropdown-toggle).btn-primary,\n.nga-theme-default .btn-group.btn-group-divider > .btn:not(:last-child).btn-primary,\n.nga-theme-default .btn-group > .btn:not(:last-child).btn-group-divider.btn-primary {\n  border-right-color: #db1f1b; }\n\n.nga-theme-default .btn-group.btn-group-dropdown-divider > .btn:first-child:not(:last-child):not(.dropdown-toggle).btn-warning,\n.nga-theme-default .btn-group.btn-group-divider > .btn:not(:last-child).btn-warning,\n.nga-theme-default .btn-group > .btn:not(:last-child).btn-group-divider.btn-warning {\n  border-right-color: #c5973b; }\n\n.nga-theme-default .btn-group.btn-group-dropdown-divider > .btn:first-child:not(:last-child):not(.dropdown-toggle).btn-success,\n.nga-theme-default .btn-group.btn-group-divider > .btn:not(:last-child).btn-success,\n.nga-theme-default .btn-group > .btn:not(:last-child).btn-group-divider.btn-success {\n  border-right-color: #00af58; }\n\n.nga-theme-default .btn-group.btn-group-dropdown-divider > .btn:first-child:not(:last-child):not(.dropdown-toggle).btn-info,\n.nga-theme-default .btn-group.btn-group-divider > .btn:not(:last-child).btn-info,\n.nga-theme-default .btn-group > .btn:not(:last-child).btn-group-divider.btn-info {\n  border-right-color: #2c66db; }\n\n.nga-theme-default .btn-group.btn-group-dropdown-divider > .btn:first-child:not(:last-child):not(.dropdown-toggle).btn-danger,\n.nga-theme-default .btn-group.btn-group-divider > .btn:not(:last-child).btn-danger,\n.nga-theme-default .btn-group > .btn:not(:last-child).btn-group-divider.btn-danger {\n  border-right-color: #db2c49; }\n\n.nga-theme-default .btn-group.btn-group-dropdown-divider > .btn:first-child:not(:last-child):not(.dropdown-toggle).btn-secondary,\n.nga-theme-default .btn-group.btn-group-divider > .btn:not(:last-child).btn-secondary,\n.nga-theme-default .btn-group > .btn:not(:last-child).btn-group-divider.btn-secondary {\n  border-right-color: #a3a0db; }\n\n.nga-theme-default .btn-group > .btn.btn-group-icon {\n  font-size: 1.5rem;\n  padding: 0 1rem; }\n\n.nga-theme-default .btn-group.btn-group-pagination > .btn {\n  padding-left: 1.125rem;\n  padding-right: 1.125rem; }\n\n.nga-theme-default .btn-group.btn-group-divided .btn.active.btn-primary, .nga-theme-default .btn-group.btn-group-divided .btn.active.btn-outline-primary {\n  box-shadow: 0 2px 12px 0 #ff491f; }\n\n.nga-theme-default .btn-group.btn-group-divided .btn.active.btn-warning, .nga-theme-default .btn-group.btn-group-divided .btn.active.btn-outline-warning {\n  box-shadow: 0 2px 12px 0 #e5cb45; }\n\n.nga-theme-default .btn-group.btn-group-divided .btn.active.btn-success, .nga-theme-default .btn-group.btn-group-divided .btn.active.btn-outline-success {\n  box-shadow: 0 2px 12px 0 #00cc88; }\n\n.nga-theme-default .btn-group.btn-group-divided .btn.active.btn-info, .nga-theme-default .btn-group.btn-group-divided .btn.active.btn-outline-info {\n  box-shadow: 0 2px 12px 0 #3399ff; }\n\n.nga-theme-default .btn-group.btn-group-divided .btn.active.btn-danger, .nga-theme-default .btn-group.btn-group-divided .btn.active.btn-outline-danger {\n  box-shadow: 0 2px 12px 0 #ff3377; }\n\n.nga-theme-default .btn-group.btn-group-divided .btn.active.btn-secondary, .nga-theme-default .btn-group.btn-group-divided .btn.active.btn-outline-secondary {\n  box-shadow: 0 2px 12px 0 #c9baff; }\n\n.nga-theme-default .btn-group.btn-group-divided > .btn {\n  border-radius: 12px; }\n\n.nga-theme-default .btn-group.btn-group-divided > .btn:not(.active) {\n  border-color: #342e73; }\n\n.nga-theme-default .btn-group.btn-group-divided > .btn:not(:last-child) {\n  margin-right: 0.5rem; }\n\n.nga-theme-default .btn-group.btn-group-divided-hidden .btn:not(.active) {\n  background-color: transparent; }\n\n.nga-theme-default .btn-group.btn-group-divided-hidden .btn:not(:last-child) {\n  margin-right: 1rem; }\n\n.nga-theme-default .btn-group.btn-group-divided-hidden .btn:first-child:not(:last-child):not(.dropdown-toggle),\n.nga-theme-default .btn-group.btn-group-divided .btn:first-child:not(:last-child):not(.dropdown-toggle),\n.nga-theme-default .btn-group.btn-group-divided-hidden .btn:not(:first-child):not(:last-child):not(.dropdown-toggle),\n.nga-theme-default .btn-group.btn-group-divided .btn:not(:first-child):not(:last-child):not(.dropdown-toggle),\n.nga-theme-default .btn-group.btn-group-divided .btn,\n.nga-theme-default .btn-group.btn-group-divided-hidden .btn {\n  border-radius: 12px; }\n\n.nga-theme-default .btn.btn-icon {\n  font-size: 1.5rem;\n  padding: 0.5rem 1rem; }\n\n.nga-theme-default .form-control {\n  color: #ffffff;\n  background-color: rgba(0, 0, 0, 0.87);\n  border: 2px solid white; }\n  .nga-theme-default .form-control:focus {\n    border: 2px solid #ff241f;\n    background-color: white; }\n  .nga-theme-default .form-control .form-control-feedback,\n  .nga-theme-default .form-control .form-control-label,\n  .nga-theme-default .form-control .col-form-label,\n  .nga-theme-default .form-control .form-check-label,\n  .nga-theme-default .form-control .custom-control {\n    color: #a1a1e5; }\n  .nga-theme-default .form-control .form-control {\n    border-color: #a1a1e5; }\n  .nga-theme-default .form-control .input-group-addon {\n    color: #a1a1e5;\n    border-color: #a1a1e5;\n    background-color: white; }\n  .nga-theme-default .form-control[placeholder] {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    opacity: 1;\n    transition: opacity 0.3s ease;\n    text-overflow: ellipsis; }\n  .nga-theme-default .form-control::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    opacity: 1;\n    transition: opacity 0.3s ease;\n    text-overflow: ellipsis; }\n  .nga-theme-default .form-control:focus::-webkit-input-placeholder {\n    opacity: 0;\n    transition: opacity 0.3s ease; }\n  .nga-theme-default .form-control::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    opacity: 1;\n    transition: opacity 0.3s ease;\n    text-overflow: ellipsis; }\n  .nga-theme-default .form-control:focus::-moz-placeholder {\n    opacity: 0;\n    transition: opacity 0.3s ease; }\n  .nga-theme-default .form-control:-moz-placeholder {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    opacity: 1;\n    transition: opacity 0.3s ease;\n    text-overflow: ellipsis; }\n  .nga-theme-default .form-control:focus:-moz-placeholder {\n    opacity: 0;\n    transition: opacity 0.3s ease; }\n  .nga-theme-default .form-control:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    opacity: 1;\n    transition: opacity 0.3s ease;\n    text-overflow: ellipsis; }\n  .nga-theme-default .form-control:focus:-ms-input-placeholder {\n    opacity: 0;\n    transition: opacity 0.3s ease; }\n\n.nga-theme-default .form-control-label {\n  color: #ffffff;\n  font-weight: 400; }\n\n.nga-theme-default .form-control-feedback {\n  font-size: 0.875rem;\n  font-weight: 400; }\n\n.nga-theme-default .form-control {\n  font-size: 1rem; }\n\n.nga-theme-default .form-control.input-sm {\n  font-size: 0.875rem;\n  line-height: 1rem; }\n\n.nga-theme-default .form-control.input-lg {\n  font-size: 1.25rem;\n  line-height: 1.25rem; }\n\n.nga-theme-default .has-danger .form-control:not(:focus) {\n  border-color: #ff3355; }\n\n.nga-theme-default .form-control-danger {\n  border-color: #ff3355; }\n\n.nga-theme-default .has-success .form-control:not(:focus) {\n  border-color: #00cc66; }\n\n.nga-theme-default .form-control-success:not(:focus) {\n  border-color: #00cc66; }\n\n.nga-theme-default .ngx-charts .pie-label {\n  fill: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default .ngx-charts .grid-line-path {\n  stroke: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default .ngx-charts text {\n  fill: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default .chart-legend .legend-labels {\n  background: #e9e9e9; }\n\n.nga-theme-default ng2-smart-table {\n  color: rgba(0, 0, 0, 0.87); }\n  .nga-theme-default ng2-smart-table th,\n  .nga-theme-default ng2-smart-table td {\n    border: 1px solid rgba(0, 0, 0, 0.87) !important;\n    line-height: 35px;\n    vertical-align: middle; }\n  .nga-theme-default ng2-smart-table table tr td {\n    padding: 0 8px; }\n  .nga-theme-default ng2-smart-table input {\n    line-height: 1.5 !important; }\n  .nga-theme-default ng2-smart-table ng2-smart-table-cell {\n    color: rgba(0, 0, 0, 0.87);\n    line-height: 35px; }\n  .nga-theme-default ng2-smart-table tbody tr {\n    color: rgba(0, 0, 0, 0.87); }\n  .nga-theme-default ng2-smart-table tbody tr:hover {\n    background: rgba(0, 0, 0, 0.03); }\n  .nga-theme-default ng2-smart-table a.ng2-smart-sort-link {\n    font-size: 14px !important;\n    color: rgba(0, 0, 0, 0.87);\n    font-weight: 500; }\n    .nga-theme-default ng2-smart-table a.ng2-smart-sort-link.sort {\n      font-weight: 500 !important; }\n      .nga-theme-default ng2-smart-table a.ng2-smart-sort-link.sort::after {\n        border-bottom-color: rgba(0, 0, 0, 0.87) !important; }\n  .nga-theme-default ng2-smart-table .ng2-smart-actions {\n    width: 70px;\n    text-align: center; }\n    .nga-theme-default ng2-smart-table .ng2-smart-actions .actions {\n      float: none;\n      text-align: center; }\n  .nga-theme-default ng2-smart-table .ng2-smart-actions-title-add {\n    text-align: center; }\n  .nga-theme-default ng2-smart-table a.ng2-smart-action,\n  .nga-theme-default ng2-smart-table .ng2-smart-title {\n    font-size: 14px !important;\n    color: rgba(0, 0, 0, 0.87);\n    padding: 0 5px;\n    display: inline-block; }\n    .nga-theme-default ng2-smart-table a.ng2-smart-action.ng2-smart-action-add-add,\n    .nga-theme-default ng2-smart-table .ng2-smart-title.ng2-smart-action-add-add {\n      font-size: 25px !important; }\n  .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 16px; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .ng2-smart-pagination {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .ng2-smart-pagination .page-item.disabled .page-link, .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .ng2-smart-pagination .page-item.disabled .page-link:focus, .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .ng2-smart-pagination .page-item.disabled .page-link:hover {\n        background: rgba(0, 0, 0, 0.03);\n        color: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > a, .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > span {\n      background: transparent; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:first-child > a, .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:first-child > span {\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:last-child > a, .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:last-child > span {\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > a,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > span {\n      color: rgba(0, 0, 0, 0.87);\n      border-color: rgba(0, 0, 0, 0.87); }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:first-of-type > a,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:first-of-type > span {\n      border-top-left-radius: 5px;\n      border-bottom-left-radius: 5px; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:last-of-type > a,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li:last-of-type > span {\n      border-top-right-radius: 5px;\n      border-bottom-right-radius: 5px; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > .active > a,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > .active > span,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > .active > a:hover,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > .active > span:hover,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > .active > a:focus,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > .active > span:focus {\n      background-color: rgba(0, 0, 0, 0.3) !important;\n      border-color: rgba(0, 0, 0, 0.87) !important; }\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > a:hover,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > span:hover,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > a:focus,\n    .nga-theme-default ng2-smart-table nav.ng2-smart-pagination-nav .pagination > li > span:focus {\n      background-color: rgba(0, 0, 0, 0.2);\n      color: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default .toast-close-button {\n  position: absolute;\n  right: 0.15rem;\n  top: 0.2rem;\n  opacity: 1;\n  background-color: transparent;\n  border-radius: 3px;\n  font-size: 1.5rem;\n  color: color-inverse;\n  text-shadow: none; }\n  .nga-theme-default .toast-close-button button {\n    padding: 5px; }\n  .nga-theme-default .toast-close-button:hover, .nga-theme-default .toast-close-button:focus {\n    opacity: 1;\n    outline: none; }\n\n.nga-theme-default .toast {\n  color: color-inverse !important;\n  background-color: #ff241f;\n  box-shadow: none !important;\n  opacity: 0.8 !important; }\n  .nga-theme-default .toast:hover {\n    box-shadow: none;\n    opacity: 1 !important; }\n\n.nga-theme-default .toast-success {\n  background-color: #00cc66;\n  color: #ffffff !important; }\n  .nga-theme-default .toast-success .toast-close-button {\n    color: #ffffff; }\n\n.nga-theme-default .toast-error {\n  background-color: #ff3355;\n  color: #ffffff !important; }\n  .nga-theme-default .toast-error .toast-close-button {\n    color: #ffffff; }\n\n.nga-theme-default .toast-info {\n  background-color: #3377ff;\n  color: color-inverse !important; }\n  .nga-theme-default .toast-info .toast-close-button {\n    color: #ffffff; }\n\n.nga-theme-default .toast-wait {\n  background-color: yellow;\n  color: #ffffff !important; }\n  .nga-theme-default .toast-wait .toast-close-button {\n    color: #ffffff; }\n  .nga-theme-default .toast-wait .icon-wait {\n    background-image: url(\"data:image/gif;base64,R0lGODlhHgAeAKUAAASq/ITW/ES+/MTq/GTK/CS2/KTe/OT2/FTG/HTO/LTm/BSy/DS6/PT6/JTa/NTy/HzW/Ayu/EzC/Cy2/Kzi/FzG/HzS/Lzm/Pz+/ASu/Iza/ETC/Mzu/GzO/KTi/Oz6/HTS/Byy/Dy+/PT+/Jze/Nzy/Cy6/FzK/Lzq/ACq/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJDAApACwAAAAAHgAeAAAG98CUcEgsGo/IpHLJbDqfRACCQK0SIkPGArppYL7gwpDS8JieXfBXLKR8RwGAU6PGsFNuMCXDFHnVdx0fag5ySREldXZEC3lfEkogYAcEI4tRJGAchkYZiY8pAh93Q4hgAkgmYAOGGyFHJ2AaSARgHUwLq0gQYBtNB18lnEQBYCJNn8JHHWAETBF/HEgiYB5IE0MbYCRIEYMYDaRDCggpAChg5UgOYChYRRcjJ8xfB+9HBd8YCltECoogltCrB4LThToD+CgBQAdMg34pDk56xQSABYcQJYI58UQEuodDNL6p8AQAAxD3QFDwsHKlAYpQYsqcSbPmkiAAIfkECQwAKQAsAAAAAB4AHgCFBKr8hNb8RL78xOr8JLb8ZMr8pOL85Pb8FK78dM78VMb8NLr8vOb89Pr8lNr81PL8HLb8fNb8DK78TML8LLb8rOL8HLL8fNL8/P78BK78jNr8RML8zO78bM787Pr8FLL8dNL8XMr8PL78vOr89P78nN783PL8LLr8rOb8AKr/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AlHBILBqPyOFHBEg6kYAHpyB5WocgDMajIVyfn4ZWy7B8j4iLeGyqnoki03gcGGY6zauCNB9DhgoYFRlWInxjD1oVQwAMWg55SBJyWgcCCB4YG0MEcxNOWZVeKRomkQAlYxyRRRmUmkMUBUWTYwJIC2MDrIRFBWMaSL9aHVYfukgRY5tWB1qmRwFjIleU0EYdYyFWEmscSCJjBlYTYyWSmRgNo0MSCoyOWu9IDmMjbkIFq0LZlfhGBNZguEBkAAYmHQ5hAPGk38EhuTAMGDFnQK8kADRg2CckVR8MJj5cAXBhlpAwHweIPBPJYaUOF98IQdFnnkwiAARUOMTgJg4SCxHksPNJa4JNom+CAAAh+QQJDAAnACwAAAAAHgAeAIUEqvyE1vxEvvzE6vxkyvwktvyk4vzk9vwUrvxUxvx00vy05vz0+vyU2vzU8vw0uvwMrvxMwvwcsvxcxvx80vy85vz8/vw8vvwErvyM2vxEwvzM7vxszvys4vzs+vwUsvz0/vyc3vzc8vw0vvxcyvx81vy86vwAqv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG8sCTcEgsPorIpHJoUACWUKXBoohaiVPqdQm5cDIii7i6JSIoYbF6/Cxf0uv1BlJOgOLxDcIdNxEuFWIbH2UQcAcCTBaDRBeJSwpqBxJYeo0eG21IGHAaRQp7QyMeYo9ID2oDmkoEahmsahxWH6lKJWqeVgdiIqtDAWoXV2m9SRxqJFYQDIJKAmoGVhFqIUoQpBYLqxoYRACBYglLDRYmdEMaDOdCx2IH60gFHfDpFucA7WNR28z2EAkm1gzotqWeGGxrRBDaEqEfHjEmKNV56I6Drysk1jgY0CACvDJCMor5CLLIhDskSxLJeFElkQkErQQBACH5BAkMAC4ALAAAAAAeAB4AhQSq/ITW/ES+/MTq/GTK/CS2/OT2/Kzi/BSu/NTu/HTO/FTG/JTa/DS6/PT6/EzG/Lzm/By2/Nz2/HzW/Ayu/EzC/Mzu/GzO/Byy/Nzy/HzS/Jze/Dy+/Pz+/ASu/Iza/ETC/MTu/GTO/Cy6/Oz6/LTm/BSy/NTy/HTS/FzK/JTe/DS+/PT+/Lzq/ACq/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb6QJdwSCwaj8hkkUJROo+X1HMqBFgGACqRwrl8GJoHAtTpNLQuhCZTbncchvJGy5G4722HabrA+8sXTxx3EAQcDQsbdydZSRRsZQYcRX1tCRceSihtBgVGJWUHII1JHpAdIEYjGRMYVA1tLaRDCE1aBG2BUwgiDEgBbalPASQdGbNDwB0kI1OQx1AWF7ZOFG0WSBTIVUcVbXNUEQEBRgAQbQtPHgIHZWdFF5zURyYKJ20hswDxbQpOH3cOFAAAwMSCFm4GZFIywg8JEg4WuXqC8I+bFhOfVLJo4MI2R3FaNJhQIsGJFgwqzKMCrAIaJxhOrHxp5B3Nm06CAAAh+QQJDAAoACwAAAAAHgAeAIUEqvyE1vxEwvzE6vwktvzk9vyk4vxkyvwUrvzU7vxUxvz0+vy05vyU2vw0uvx00vwctvzc9vwMrvxMwvwcsvzc8vz8/vy85vwErvyM2vzM7vwsuvzs+vys4vxszvwUsvzU8vxcxvz0/vyU3vw8vvx80vxMxvy86vwAqv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG60CUcEgsGo/IpHLJbDqfSwnJk2mUFB8joIkoVSzg8MKwGRIaTME3zAaLAgBKhbFUiNp4MON7UZLuYRcHJA4mDRx4fUgSaxYFJEYUHW2KRw9hBRRIBAtslUUYjQJIEI1gn0QbHKsMW5EaCyKxsXRHABK4rkYSCB+9vxJQwsPExUgCGgPJyyFIJAzQHkgheA26RAAnYQpICm0j10QemMFH1GwMWUUA42EPSedsBQ8EAAAfCtphAxhJ3hYg8Czg0IkNCE3wLFgrkafNCYTwwAlxoA9PAQ/hjny4BmBDCQYaQJxoMKGcsZMoU6psEgQAIfkECQwALQAsAAAAAB4AHgCFBKr8hNb8RL78xOr8ZMr85Pb8JLb8pOL8FK78VMb81PL8dM789Pr8lNr8NLr8tOb8TMb8fNb8DK78TML8zO787Pb8HLL83PL8fNL8/P78nN78PL78vOb8BK78jNr8RML8xO78bM78LLr8rOL8FLL8XMr8dNL89P78lN78NL787Pr83Pb8vOr8AKr/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AlnBILBqPyKRyyWw6n0vJJuRpYBIkKBGBKWS+YMZIpP2swGjwKQBwJhjp+HfUYQpOaA5h44A0VGgNTCIacAUbRhYjaBNCAAZJJAsWSB0HYBQIBBQRWkQSF2oZJ5BEbU4SKGkjRhEHG6dIFhGhaR9FEl4ZFAQSSCkjeGgXsUIlaSoeIsVDFhhnXyFFAANxFyZ1SBIJHCoIRQ5pFRC+TVlFGmmknkMkKrzpXwPlRyL0RiKwLRZwXw/npkJkKBCglBKBYAqYMAAAAIkELNA8YGYEgIc4DFT0A6OAEhMAGITJ+cLCo5MUEeUUCEHxowMMDygoYNFgwj12OHPq3JkzCAAh+QQJDAAsACwAAAAAHgAeAIUEqvyE1vxEvvzE6vwktvyk4vxkyvzk9vx0zvwUrvw0uvy05vyU2vzU8vz0+vxUxvx81vwMrvwstvys4vxszvx80vwcsvw8vvy85vyc3vzc8vz8/vwErvyM2vxMwvzM7vxkzvzs+vx00vwUsvw0vvyU3vz0/vxcyvwsuvys5vy86vzc9vwAqv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG6kCWcEgsGo/IpHLJbDqfy8iF0mFAHiMoMVE5bL5gxwSlZZ3AaLApANBS0vAJx70wkBQeRgjNaCdRHX5IFhNoHn9eGYJHHBlgH4tDKF5fikoRGmACRpNpGXNJBmAdRZ1wlkgjYANEEitwYH1JlBqCALcAAZq4RhcYKhgmXybAKhREb18nShWwG3JEF2AFSgDNaSkRRRF7Gw4E1ddfC9pGDKvlSdcLkUME3RsLWUnWE+lHyV8HIgS3Iw/HhtxaAqADHAchHHxhA8WaMGcbGEIhocLZARDtmABAUWHBhwYYGHi4V6akyZMoUw4JAgAh+QQJDAArACwAAAAAHgAeAIUEqvyE1vxEvvzE6vwktvxkyvyk4vzk9vwUrvxUxvy05vzU8vw0uvx0zvz0+vyU2vwctvwMrvxMwvys4vwcsvxcxvy85vzc8vw8vvx81vz8/vwErvyM2vxEwvzM7vwsuvxszvzs+vwUsvw0vvx80vz0/vyc3vys5vxcyvy86vzc9vwAqv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG+sCVcEgsGo/IpHLJbDqfzQrnkUmIoMiGZqtxTD5QSEAyhDi421IAsAR0JtsBW2hAcycbpAi0sDOGIgwSDyFoD3NECHV2GiZHInBcZEcEAWdcDldGACZcHohFABd2DUgRo1sCSAyeJiELoEQFXBxIs1sgKwggBHpcA0gZXB1NB1sXsUIBXBhNqCrJKyBcKEhuESsRlx5IGFwGSQ8HJLeNpoVdvUcfjAnhv9hHFnYkmkZmXAr2RAmMDiZgjJTTMI4AqAjG0CwAgeAIAA7+FsRbQeJOh2hDAJAo0W4IgQUBKDwZkcJOCkQYlQD4QEKBBw8W9mGZSbOmzZtLggAAO2JnY3dIeDd0b3M4bHdiQ1dsQW5kV2V1RmFJWlpyNzYvRzArWVhDM0tRQlA1ZVFVdFBSVTVLUDZTaDNmMzlqZEs=\") !important; }\n\n.nga-theme-default .toast-warning {\n  background-color: #e5b045 !important;\n  color: #ffffff; }\n  .nga-theme-default .toast-warning .toast-close-button {\n    color: #ffffff; }\n\n.nga-theme-default .toast-title {\n  word-wrap: break-word; }\n\n.nga-theme-default .ui-kitten {\n  font-family: Righteous, cursive; }\n\n.nga-theme-default a {\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.87); }\n\n.nga-theme-default .layout {\n  font-family: Roboto, sans-serif;\n  font-weight: 300; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./assets/articles/customization.md":
/***/ (function(module, exports) {

module.exports = "### Overview\nCustomization of `react-native-ui-kitten` is really easy and very extensible. \nIt allows you to build beautiful and flexible component styles in a simple and elegant way.\n\n### rkType\n\nMost of the components in this framework contain *rkType* property.\nFor those who familiar with web, you can think of it as an HTML *class* property.\nFundamentally, the idea is to separate styles definition from jsx templates.\nOur components already have a set of predefined rkTypes. \nMoreover you can configure *rkType*s somewhere in your application and then you're able to reuse that style in your components by just passing it as an input property.\nAs well, it's always possible to override types for some specific component.\n\nFor example, consider this code: \n\n```\nimport {RkButton} from 'react-native-ui-kitten';\n\n//... \n\n<RkButton rkType='outline small'>\n  Say Hello\n</RkButton>\n\n```\n\nIn this case, `RkButton` will have two styles: *outline* (style that \ndraws a rounded border for a button) and *small* (the one that reduces button size).\n\nYou're able to create your custom *rkType*s for specific components.\nHere is the example of creating *rkType* for rkButton:\n\n```jsx\nimport {RkButton, RkTheme} from 'react-native-ui-kitten';\n\nlet accent = '#ed1c4d';\n\nRkTheme.setType('RkButton', 'accent', {\n  backgroundColor: accent,\n  color: 'white'\n});\n\n//...\n\n<RkButton rkType='accent'>\n  Click me.\n</RkButton>\n```\n\n### Platform-dependent styles\n\nIn some cases, it may be necessary to write different styles depending on current platform. It's possible to define a platform dependent value. Let's create `rkType` for `RkButton` which on *iOS* will have a blue background color and green on *Android*.\n\n```jsx\nimport {RkTheme} from 'react-native-ui-kitten';\n\n//...\n\nRkTheme.setType('RkButton','different',{\n  backgroundColor: {\n    ios: 'blue',\n    android: 'green'\n  }\n});\n\n//... or using internal control components:\n\nRkTheme.setType('RkButton','different',{\n  container: {\n    backgroundColor: {\n      ios: 'blue',\n      android: 'green'\n    }\n  }\n});\n\n```\n\n### Default values\nSometimes it very useful to set default style for all components in whole application without need to set explicitly `rkType`\nfor each component. All *rk-components* have a type which always applied. Name of this type is set in `RkComponent.defaultType` variable.\nAll standard *rk-components* has defaultType `basic`. In order to change the style for all components - just override this type.\n\nLet's change color and size for all `RkText` components in the app:\n\n```jsx\n  RkTheme.setType('RkText', 'basic', {\n    fontSize: 12,\n    color: 'midnightblue'\n  });\n```\n\n### Themes\n\nAll base *rkTypes* depends on theme of application. *Theme* contains base values (colors, fontSizes etc) for all *rk-components*.\nYou can easily override values in theme or even define your own theme using `RkTheme`.\nBut user-defined *rkType*s should also be able to respond theme changes.\nFor this purpose can be used property functions instead of values.\nLet's create `rkType` for `RkText` which will depend on some value from the theme.\n\n```jsx\nRkTheme.setType('RkText','primaryBackground',{\n  backgroundColor: theme => theme.colors.primary\n});\n```\n\nVariable `theme` here is an instance of the current theme. So in case the theme was switched using `RkTheme.setTheme` function, the `rkType`\n created above will be also changed and all components using this type will be also updated.\n\nSometimes there is a necessity to use their values for regular components. In this case, you need to use `RkStyleSheet`.\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./assets/articles/guide.md":
/***/ (function(module, exports) {

module.exports = "### Overview\nReact Native UI Kitten has strong customization implemented based on custom *rk-components*. This guide discovers how to create your own *rk-component* from scratch.\n\nLet's create *avatar component* which will have an image of a user, text with the user name and optional user description.\n\n### RkComponent \n\nAll *rk-components* are inherited from `RkComponent` class. This class contains methods responsible for customization.\nHere is a complete code of our avatar component:\n\n```jsx\n// avatar.js\n\nexport class Avatar extends RkComponent {\n  \n  constructor(props) {\n    super(props);\n  }\n    \n render() {\n\n    let description = this.props.description ? \n      (<RkText>{this.props.description}</RkText>) : \n      (<View/>);\n\n    return (\n      <View>\n        <Image source={this.props.source}/>\n        <View>\n          <RkText>{this.props.name}</RkText>\n          {description}\n        </View>\n      </View>\n    )\n  }\n}\n\n```\n\nAvatar component now looks like this:\n\n![](assets/avatar/avatar1.png)\n\nAt this point, we created a skeleton of the component. Now we need to add styles in order to make the component prettier.\nAll *rk-components* have a default style for each internal component. Here we have 4 internal components: `container`, `image`,\n`username` and `description`. (We won't include View that wraps texts because it just helps to group them).\nSo we need to add default styles for these components.\nThese styles should include not only layout styles but also color and font styles. And also it would be nice to make this component\ndependent on a theme.\n\nHere we need to use method `registerComponent` from `RkTheme`. This method accepts name of a component and a function which returns an object with styles. Let's start with the first parameter. The name should be set in `componentName` property of your component.\nLet's stand with `Avatar` name:\n\n```jsx\n// avatar.js\n\nexport class Avatar extends RkComponent {\n  componentName = 'Avatar';\n    \n  constructor(props) {\n       super(props);\n     }\n//...\n  \n}\n```\nNow we have to define a base style for the component.\n\n### Define base style \nEach *rk-component* has a base style. This style applied by default for all instances of the component. Base style should be named `_base`.\nYou can change base style using `RkTheme.setType` method.\n\nHere we define base style for avatar component:\n\n```javascript\n// avatarTypes.js\n\nexport const AvatarTypes = (theme) => {\n  return({\n     _base: {\n       container: {\n         flex: 1,\n         alignItems: 'center',\n         flexDirection: 'row',\n         marginVertical:4\n       },\n       image: {\n         width: 40,\n         height: 40\n       },\n       username: {\n         paddingLeft: 10,\n         color: theme.colors.text.base\n       },\n       description:{\n         paddingLeft: 10,\n         color: theme.colors.text.hint,\n         fontSize: theme.fonts.sizes.small\n       },\n     }\n  });\n}\n\n```\n\nHere we export function which accepts the theme object. Using `theme` we can set values based on the current theme. If theme will change - \nthose values will be also changed.\n\n### Register rk-component\n\nNow we have all parameters for `registerComponent` method. Let's call it. Best place to do this - some kind of bootstrap method \nwhich will be called on app startup.\n\n```jsx\n//index.ios.js\n\nimport {RkTheme} from 'react-native-ui-kitten';\nimport {AvatarTypes} from 'avatarTypes.js';\n\n//....\n\nRkTheme.registerComponent('Avatar', AvatarTypes);\n\n```\n\nAfter this step `RkTheme` knows about `Avatar` class. And can compile styles for it according to the current theme.\nNow we need to set computed styles in our controls.\nFirst, let's add a special mapping object to the component. It can be used in order to provide more user-friendly properties\nfor your component. This will be described a bit later. Now you only need to create a skeleton of this mapping.\n\nThis is just an object where properties are names of inner components:\n\n```jsx\n//avatar.js\n\nexport class Avatar extends RkComponent {\n  componentName = 'Avatar';\n  typeMapping = {\n    container: {},\n    image: {},\n    username: {},\n    description: {}\n  };\n  \n  constructor(props) {\n       super(props);\n     }\n//...\n  \n}\n```\n\nLast step is to set computed styles in according components. Here we should use method `defineStyles` of `RkComponent`:\n\n```jsx\n// avatar.js\n\nexport class Avatar extends RkComponent {\n\n  componentName = 'Avatar';\n  typeMapping = {\n    container: {},\n    image: {},\n    username: {},\n    description: {}\n  };\n\n  constructor(props) {\n    super(props);\n  }\n\n  render() {\n    let {container, image, username, description: descriptionStyle} = this.defineStyles();\n    let description = this.props.description ? (<RkText style={descriptionStyle}>{this.props.description}</RkText>) :\n      <View/>;\n\n    return (\n      <View style={container}>\n        <Image style={image} source={this.props.source}/>\n        <View>\n          <RkText style={username}>{this.props.name}</RkText>\n          {description}\n        </View>\n      </View>\n    )\n  }\n}\n```\n\nAfter this last step, we have a nice looking, theme-dependent component. We can use our component in the application:\n\n```jsx\nimport {Avatar} from 'avatar.js'\n\n//...\n\n<Avatar source={require('../img/aGilbert.png')}\n        name='Alex Gilbert' \n        description='developer'/>\n\n```\n\nComponent now looks much better:\n\n![](assets/avatar/avatar2.png)\n\nNow if we change for example a color for a hint text in the theme -\navatar's description color will be also changed.\n\nFor example:\n```jsx\n// index.ios.js\n\nimport {RkTheme} from 'react-native-ui-kitten';\n\nRkTheme.setTheme({\n  colors: {\n    text: {\n      hint: 'red'\n    }\n  }\n});\n```\n\nNow avatar should look like this:\n\n![](assets/avatar/avatar3.png)\n\n### Adding rkTypes to component.\n\nAs long as `Avatar` is *rk-component* we can define rkTypes for it. As a base style, we may want to create types that also will depend on the current theme. In order to add such types, we need to make changes into `avatarTypes.js`.\nLet's add couple new types for `Avatar`:\n\n```jsx\n// avatarTypes.js\n\nexport const AvatarTypes = (theme) => {\n  return({\n  \n//...\n    round: {\n      image: {\n        borderRadius: 20,\n        width: 36,\n        height: 36,\n        margin: 2\n      }\n    },\n    info: {\n      container: {\n        backgroundColor: theme.colors.screen.info,\n      },\n      username:{\n        color: theme.colors.text.subtitle\n      },\n      description:{\n        color: theme.colors.text.subtitle\n      }\n    }\n  });\n}\n```\n\nNow we have two new `rkType` which we can use in our app:\n\n```jsx\nimport {Avatar} from 'avatar.js'\n\n//...\n\n<Avatar rkType='round'\n        source={require('../img/aGilbert.png')}\n        name='Alex Gilbert' \n        description='developer'/>\n        \n<Avatar rkType='info round'\n        source={require('../img/aGilbert.png')}\n        name='Alex Gilbert' \n        description='developer'/>\n\n```\n\nHere is result of code above:\n\n![](assets/avatar/avatar4.png)\n\n### User-friendly properties\n\nFor advanced styling of `Avatar` component, we need to know all customizable elements. But more often we need to change only\nsome base properties such as background color, text color etc. To set this values you still need to know the internal structure of the component.\nReact Native UI Kitten provides the ability to define simplified property and then map them to some internal component.\n\nLet's define properties `backgroundColor`, `color` and `descriptionColor` for `Avatar` component.\nThere are only a few things to change in our component. \nCurrently in our component we have variable `typeMapping` which has next structure:\n\n```jsx\n// avatar.js\n\n//...\n\n  typeMapping = {\n    container: {},\n    image: {},\n    username: {},\n    description: {}\n  };\n\n//...\n\n```\n\nAll we need to do is to put it in this mapping key-value pair. Where `name` is desired user-friendly name of the property.\n`Value` is a name of the property which should be customized.\n\nLet's add `backgroundColor` for `Avatar` component. Background color should apply to the whole component. In our case, it should\napply to `container` component of control. And should be mapped to the `backgroundColor` property of it:\n\n```jsx\n// avatar.js\n\n//...\n\n  typeMapping = {\n    container: {\n      backgroundColor: 'backgroundColor'\n    },\n    image: {},\n    username: {},\n    description: {}\n  };\n\n//...\n\n```\n\nLet's add other two properties. `color` property should be applied to the `username` component and mapped to the `color` property,\n`descriptionColor` property should be applied to the `description` component and mapped to the `color` property:\n\n```jsx\n// avatar.js\n\n//...\n\n  typeMapping = {\n    container: {\n      backgroundColor: 'backgroundColor'\n    },\n    image: {},\n    username: {\n      color: 'color'\n    },\n    description: {\n      descriptionColor: 'color'\n    }\n  };\n\n//...\n\n```\n\nAnd that's all! Now you can use this property to define `rkType`.\nLet's rewrite defined above 'info' type using new properties.\n\n```jsx\n// avatarTypes.js\n\nexport const AvatarTypes = (theme) => {\n  return({\n  \n//...\n    info: {\n      backgroundColor: theme.colors.screen.info,\n      color: theme.colors.text.subtitle,\n      descriptionColor: theme.colors.text.subtitle\n    }\n  })\n};\n```\n\nNow it's much cleaner and user-friendly.\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./assets/articles/index.md":
/***/ (function(module, exports) {

module.exports = "### What is react-native-ui-kitten?\n\n*React Native UI Kitten* is a mobile framework with a set of easily customizable elements. \nIt aims on boosting your mobile application development and allows you to focus on business logic instead of view composition. \nIt helps you to bring your MVP to life in shorter period of time.\n\n### What is a main benefit of using this kitten?\n\nUsing React Native UI Kitten you will be able to create style configurations of components you use the most (buttons, inputs etc.). \nThese styles can be reused then in the process of development. Configure them once and use anywhere!\n\n### Can I use this kitten with other react libraries?\n\nYes, it's just set of UI components. It doesn't force you to use any specific library for business logic implementation.\n\n### How to install\n\nSimply add it as an npm dependency:\n\n```\nnpm install --save react-native-ui-kitten\n```\n\nAnd include the component you need into your application:\n```\nimport {RkButton} from 'react-native-ui-kitten';\n```\n\nThen just use:\n\n```\nrender() {\n  return (\n    <View>\n      <RkButton>Click me!</RkButton>\n    </View>\n  )\n}\n```\n\n### Customization\nAll components are flexible and can be customized.\nMore detailed about stylization of components you can find [here](/#/docs/quick-start/customization)"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./assets/articles/theme.md":
/***/ (function(module, exports) {

module.exports = "### Overview\nAll components introduced in this framework depends on the application *theme*. Theme - is an object with base values: colors, font sizes etc. \nThey also organized in groups by purpose and also have inheritance.\n All interactions with the theme and other customizations should be done using `RkTheme` object.\n\nTheme has a definition for most of the base values like regular text color or size, success button color or color of subtitles.\nThat means if you change a regular text color in theme - all *rk-components* which use this color will apply it. So you can easily \nadjust color for the whole app.\n\nHere is an example from our default theme:\n```javascript\nimport {RkTheme} from 'react-native-ui-kitten'\n\n//...\n\nlet Values = {\n  fontSize: 15\n};\n\n//...\nfonts: {\n  sizes: {\n    base: Values.fontSize, \n    small: Values.fontSize *** 0.8,\n    medium: Values.fontSize,\n    large: Values.fontSize *** 1.2,\n//...\n```\n\nThis code defines base font size and also font sizes for different semantic values like *small*, *large* etc. Our *rk-components*\nuse this theme values. So for example `RkButton` with predefined `rkType` small will use *small* value as font size for content.\n\n### Overriding Theme\n\nDefault theme is just a set of predefined values. However, it can be easily overridden using `RkTheme` object.\n\nLet's override base font size of the text.\n\n```javascript\nimport {RkTheme} from 'react-native-ui-kitten'\n\n//...\n \nRkTheme.setTheme({\n  fonts: {\n    sizes: {\n      base: 24\n    }\n  }\n});\n```\nNow all *rk-components* which use *base* font size will have new size.\n\n### Using theme in your own components\n\nDuring app development it can be necessary to use values of current theme for regular components: for example - set background\nfor `View`. To get values of current theme you can use `RkTheme.current` property. It returns current theme for the application.\n\n```\nimport {RkTheme} from 'react-native-ui-kitten'\n\n\nrender() {\n  return() {\n    <View style={{backgroundColor: RkTheme.current.colors.success}}>\n      //...\n    </View>\n  }\n}\n```\n\nIn other cases, you may need to create your own *rk-like* component with a support of `rkType`, theming and other features.\nActually, it's quite easy to implement. [Here](/#/docs/quick-start/create-custom-component) is a guide of how to create such component.\n\n"

/***/ }),

/***/ "./node_modules/style-loader/index.js!./app/styles/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/exports-loader/index.js?module.exports.toString()!./node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!./node_modules/postcss-loader/index.js?{\"ident\":\"postcss\"}!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false,\"precision\":8,\"includePaths\":[]}!./app/styles/styles.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/exports-loader/index.js?module.exports.toString()!../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/postcss-loader/index.js??postcss!../../node_modules/sass-loader/lib/loader.js??ref--6-3!./styles.scss", function() {
			var newContent = require("!!../../node_modules/exports-loader/index.js?module.exports.toString()!../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/postcss-loader/index.js??postcss!../../node_modules/sass-loader/lib/loader.js??ref--6-3!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./output.json":
/***/ (function(module, exports) {

module.exports = {
	"metadata": {
		"language": "javascript",
		"generator": "docjs",
		"framework": "react"
	},
	"classes": [
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Sample Usage:",
					"code": "\n<RkAvoidKeyboard>\n  <RkTextInput/>\n</RkAvoidKeyboard>\n"
				}
			],
			"props": [],
			"methods": [],
			"name": "RkAvoidKeyboard",
			"description": "",
			"shortDescription": "RkAvoidKeyboard  is a component for handling keyboard appearing on the screen.\nThis component is just a container for other react components. In order to avoid keyboard it just changes  top  value according to keyboard height.\nIt doesn't have any customization. We also recommend not customize it. ",
			"styles": []
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Simple usage example:",
					"code": "\n<RkButton>Button</RkButton>\n"
				},
				{
					"shortDescription": "Custom content inside button",
					"description": "`RkButton` can contains not only text but also other components:",
					"code": "\n<RkButton>\n   <Image\n     style={{width: 50, height: 50}}\n     source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>\n</RkButton>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkButton` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use rkType",
					"code": "\n<RkButton rkType='success'>Accept</RkButton>\n<RkButton rkType='danger small'>Cancel</RkButton>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\nNew rkTypes are defined using `setType` method of `RkTheme`:",
					"code": "\nimport {RkTheme} from 'react-native-ui-kitten';\n\n RkTheme.setType('RkButton', 'dark', {\n  backgroundColor: 'gray',\n  borderRadius: 10,\n});\n\n RkTheme.setType('RkButton', 'icon', {\n  fontSize: 24,\n  width: 46,\n  borderRadius: 25\n});\n\n//...\n\n<RkButton rkType='dark'>SUBMIT</RkButton>\n\n<RkButton rkType='dark icon' style={{marginLeft: 20}}>\n   <Text>+</Text>\n</RkButton>\n\n"
				},
				{
					"shortDescription": "Advanced Styling",
					"description": "It's also possible to implement more detailed styling. `RkButton` consists from couple of base react component.\nIt's easy to set styles for each component.",
					"code": "\nRkTheme.setType('RkButton', 'faded', {\n  content: {\n    opacity: 0.6,\n  }\n});\n"
				},
				{
					"shortDescription": "Inline styling",
					"description": "It's possible to set styles inline. Use props `style` for container component and `contentStyle` for content component.",
					"code": "\n<RkButton\n   style={{backgroundColor: 'red'}}\n   contentStyle={{color: 'white'}}>Hello</RkButton>\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization\nBy default  RkButton  supports following types:  primary ,  info ,  warning ,  danger ,  success ,  outline ,  rounded ,\n circle ,  small ,  medium ,  large ,  xlarge ,  clear ,  stretch "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style for button container "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "contentStyle",
					"shortDescription": "",
					"description": "Style for each button's children "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "onPress",
					"shortDescription": "",
					"description": "Called when the touch is released, but not if cancelled. "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "onPressIn",
					"shortDescription": "",
					"description": "Same as  TouchableWithoutFeedback.onPressIn "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "onPressOut",
					"shortDescription": "",
					"description": "Same as  TouchableWithoutFeedback.onPressOut "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "onLongPress",
					"shortDescription": "",
					"description": "Called when the touch is released and is longer than usual press, but not if cancelled "
				}
			],
			"methods": [],
			"name": "RkButton",
			"description": "",
			"shortDescription": "RkButton  is a basic button component. ",
			"styles": [
				{
					"shortDescription": "Available properties:",
					"styles": [
						{
							"name": "color",
							"description": "Color of content of `RkButton`. Applies only if content of `RkButton` is `string`"
						},
						{
							"name": "backgroundColor",
							"description": "Background color of `RkButton`"
						},
						{
							"name": "borderWidth",
							"description": "Width of outer border"
						},
						{
							"name": "borderRadius",
							"description": "Border radius of `RkButton`"
						},
						{
							"name": "borderColor",
							"description": "Color of border"
						},
						{
							"name": "fontSize",
							"description": "Size of content inside. Applied only for first level children of `RkButton`"
						},
						{
							"name": "width",
							"description": "Width of `RkButton`"
						},
						{
							"name": "height",
							"description": "Height of `RkButton`"
						}
					]
				},
				{
					"shortDescription": "Available components:",
					"styles": [
						{
							"name": "container",
							"description": "`TouchableOpacity` - container of `RkButton`"
						},
						{
							"name": "content",
							"description": "If you use plain text then `RkText`. If you insert children - then style will not applied"
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Usage example:",
					"code": "\n<RkCard>\n  <View rkCardHeader>\n    <Text>Header</Text>\n  </View>\n  <Image rkCardImg source={require('../img/sea.jpg')}/>\n  <View rkCardContent>\n    <Text> quick brown fox jumps over the lazy dog</Text>\n  </View>\n  <View rkCardFooter>\n    <Text>Footer</Text>\n  </View>\n</RkCard>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkCard` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use rkType",
					"code": "\n<RkCard rkType='shadowed'>\n  <View rkCardHeader>\n    <Text>Header</Text>\n  </View>\n  <View rkCardContent>\n    <Text>Shadowed card</Text>\n  </View>\n</RkCard>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\n`rkType` used here to set style for each of 6 `rkCard` nested element props.\nNew rkTypes are defined using `setType` method of `RkTheme`:",
					"code": "\nRkTheme.setType('RkCard', 'story', {\n  img: {\n    height: 100,\n    opacity: 0.7\n  },\n  header: {\n    alignSelf: 'center'\n  },\n  content:{\n    alignSelf:'center'\n  }\n});\n\n//...\n\n<RkCard rkType='story'>\n  <Image rkCardImg source={require('../img/sea.jpg')}/>\n  <View rkCardHeader>\n    <RkText rkType='header'>Once upon a time</RkText>\n  </View>\n  <View rkCardContent>\n    <RkText style={{textAlign:'center'}}>\n      One morning, when Gregor Samsa woke from happy dreams,\n      he found himself transformed in ...\n    </RkText>\n  </View>\n  <View rkCardFooter>\n    <RkButton rkType='small outline'>Learn More</RkButton>\n    <RkButton rkType='small'>Read later</RkButton>\n  </View>\n</RkCard>"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization\nBy default  RkCard  supports following types:  shadowed ,  heroImage "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style for root container of  RkCard "
				}
			],
			"methods": [],
			"name": "RkCard",
			"description": "",
			"shortDescription": "RkCard  component used to render card view in your application.\nIt's usually being used with its props applied to standard react or custom components. ",
			"styles": [
				{
					"shortDescription": "Nested element props available for styling:",
					"styles": [
						{
							"name": "container",
							"description": "Style key for `rkCardContainer`"
						},
						{
							"name": "header",
							"description": "Style key for `rkCardHeader`"
						},
						{
							"name": "content",
							"description": "Style key for `rkCardContent`"
						},
						{
							"name": "footer",
							"description": "Style key for `rkCardFooter`"
						},
						{
							"name": "img",
							"description": "Style key for `rkCardImg`"
						},
						{
							"name": "imgOverlay",
							"description": "Style key for `rkCardImgOverlay`"
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Simple usage example:",
					"code": "\n<RkChoice selected={true}/>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkChoice` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use `rkType`:",
					"code": "\n<RkChoice rkType='clear' selected={true}/>\n<RkChoice rkType='posNeg' selected={false}/>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\nNew rkTypes are defined using `setType` method of `RkTheme`:\n`RkChoice` is a component which style depends or it's internal state. There are 4 states for this component:\n- unselected (base)\n- selected\n- unselected & disabled\n- selected & disabled\nEach of this state can be configured using `rkTypes`. That means you can define set of correctly named `RkType`s\nand `RkChoice` will apply them according to its state.\nUse the following convention:\n- `~name` : Unselected state.\n- `~nameSelected` : Selected state.\n- `~nameDisabled` : Unselected & disabled state.\n- `~nameSelectedDisabled`: Selected & disabled state.\nWhere `~name` is name of yours `rkType`.\nOne more note: during state change `RkChoice` not replace base `rkType` with new one. It just add correct.\nSo for example `disabled` component will have actually two `rkTypes` - base and disabled.\nTo define new `rkType` you can use predefined properties which will passed to according element inside component:",
					"code": "\nRkTheme.setType('RkChoice', 'semaphore', {\n  backgroundColor:'crimson',\n  borderWidth:0,\n  borderRadius:20\n});\n\nRkTheme.setType('RkChoice', 'semaphoreSelected', {\n  backgroundColor: 'chartreuse',\n});\n\nRkTheme.setType('RkChoice', 'semaphoreDisabled', {\n  backgroundColor: 'darkgray',\n});\n\nRkTheme.setType('RkChoice', 'semaphoreSelectedDisabled', {\n  backgroundColor: 'lightgray',\n});\n\n//...\n\n<RkChoice rkType='semaphore'/>\n<RkChoice selected rkType='semaphore'/>\n<RkChoice disabled rkType='semaphore'/>\n<RkChoice disabled selected rkType='semaphore'/>\n"
				},
				{
					"shortDescription": "Custom content example",
					"description": "",
					"code": "\nimport Icon from 'react-native-vector-icons/Ionicons';\n\nRkTheme.setType('RkChoice', 'mic', {\n  backgroundColor: 'darkred',\n  borderWidth: 0,\n  borderRadius: 20,\n  content: (\n    <View>\n      <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic-off'}/>\n    </View>\n  )\n});\n\nRkTheme.setType('RkChoice', 'micSelected', {\n  content: (\n    <View>\n      <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic'}/>\n    </View>\n  )\n});\n\n//...\n\n<RkChoice rkType='mic'/>\n"
				},
				{
					"shortDescription": "Advanced Styling",
					"description": "It's also possible to implement more detailed styling. `RkChoice` consists from couple of base react component.\nIt's easy to set styles for each component.\nFor example you can add `disabled` and `disabled + selected` `rkType` for previous example",
					"code": "\nRkTheme.setType('RkChoice', 'micDisabled', {\n  inner: {\n    opacity: 0.7\n  }\n});\n\nRkTheme.setType('RkChoice', 'micSelectedDisabled', {\n  content: (\n    <View>\n      <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic'}/>\n    </View>\n  ),\n  inner: {\n    opacity: 0.7\n  }\n});\n"
				},
				{
					"shortDescription": "Inline styling",
					"description": "It's possible to set styles inline. Use props `style` for `container` component and `contentStyle` for `content` component.",
					"code": "\n<RkChoice style={{backgroundColor: 'green'}}\n   contentStyle={{width: 50, height:50}}\n   rkType='mic'/>\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization\nBy default  RkChoice  supports following types:  clear ,  radio ,  posNeg "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "bool",
					"required": null,
					"name": "selected",
					"shortDescription": "",
					"description": "Determines whether component is checked "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "bool",
					"required": null,
					"name": "disabled",
					"shortDescription": "",
					"description": "Determines whether component is disabled "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "onPress",
					"shortDescription": "",
					"description": "Triggered on press "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style for component container "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "contentStyle",
					"shortDescription": "",
					"description": "Style for content inside component "
				}
			],
			"methods": [],
			"name": "RkChoice",
			"description": "",
			"shortDescription": "RkChoice  component is an analog of html checkbox and radio buttons. ",
			"styles": [
				{
					"shortDescription": "Available properties:",
					"styles": [
						{
							"name": "color",
							"description": "Color of content in `RkChoice`. Applied for `content` property"
						},
						{
							"name": "backgroundColor",
							"description": "Background color of `RkChoice`"
						},
						{
							"name": "borderWidth",
							"description": "Width of outer border"
						},
						{
							"name": "borderRadius",
							"description": "Border radius of `RkChoice`"
						},
						{
							"name": "borderColor",
							"description": "Color of border"
						},
						{
							"name": "width",
							"description": "Width of `RkChoice`"
						},
						{
							"name": "height",
							"description": "Height of `RkChoice`"
						},
						{
							"name": "content",
							"description": "Component tree which will be set into `RkChoice`. As `content` you can use text, icon, image etc"
						}
					]
				},
				{
					"shortDescription": "Available Components:",
					"styles": [
						{
							"name": "container",
							"description": "Can be `View` or `TouchableOpacity` depending on using with `RkChoiceGroup` or without"
						},
						{
							"name": "inner",
							"description": "Applied to `content` property"
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Simple usage with labels",
					"description": "In order to render checkbox/radio with touchable label inside `RkChoiceGroup` should be placed any `touchable` component with `choiceTrigger` prop.\nThis `touchable` component will trigger state change for component",
					"code": "\n<RkChoiceGroup>\n  <TouchableOpacity choiceTrigger>\n    <View style={{flexDirection:'row', alignItems:'center'}}>\n      <RkChoice rkType='posNeg'/>\n      <Text>Label</Text>\n    </View>\n  </TouchableOpacity>\n</RkChoiceGroup>\n"
				},
				{
					"shortDescription": "Radio buttons example",
					"description": "In order to create radio-like component for `RkChoiceGroup` should be set `radio` prop:",
					"code": "\n<RkChoiceGroup radio>\n  <TouchableOpacity choiceTrigger>\n    <View style={{flexDirection:'row', alignItems:'center'}}>\n      <RkChoice rkType='radio'/>\n      <Text>Option 1</Text>\n    </View>\n  </TouchableOpacity>\n  <TouchableOpacity choiceTrigger>\n    <View style={{flexDirection:'row', alignItems:'center'}}>\n      <RkChoice rkType='radio'/>\n      <Text>Option 2</Text>\n    </View>\n  </TouchableOpacity>\n  <TouchableOpacity choiceTrigger>\n    <View style={{flexDirection:'row', alignItems:'center'}}>\n      <RkChoice rkType='radio'/>\n      <Text>Option 3</Text>\n    </View>\n  </TouchableOpacity>\n</RkChoiceGroup>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkChoiceGroup` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use rkType",
					"code": "\n<RkChoiceGroup rkType='bordered'>\n  <TouchableOpacity choiceTrigger>\n    <View style={{flexDirection:'row', alignItems:'center'}}>\n      <RkChoice rkType='posNeg'/>\n      <Text>Label</Text>\n    </View>\n  </TouchableOpacity>\n</RkChoiceGroup>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\nNew rkTypes are defined using `setType` method of `RkTheme`:",
					"code": "\nRkTheme.setType('RkChoiceGroup','rounded',{\n container: {\n   borderRadius: 10\n }\n});\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization\nBy default  RkChoiceGroups  supports following types:  bordered "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style for root container "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "boolean",
					"required": null,
					"name": "radio",
					"shortDescription": "",
					"description": "Enable radio buttons mode "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "number",
					"required": null,
					"name": "selectedIndex",
					"shortDescription": "",
					"description": "Determines which RkChoice component is checked from radio group "
				}
			],
			"methods": [],
			"name": "RkChoiceGroup",
			"description": "",
			"shortDescription": "RkChoiceGroup  component is container for elements that can be used as checkboxes or radio buttons\nUsed usually in combination with  RkChoice  component. ",
			"styles": [
				{
					"shortDescription": "Available properties:",
					"styles": [
						{
							"name": "container",
							"description": "`View` - root element of `RkChoiceGroup`"
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Simple usage:",
					"code": "\n<RkModalImg source={require('../img/river.jpeg')}/>\n"
				},
				{
					"shortDescription": "Custom header and footer",
					"description": "It's possible to render custom header and footer when image is in fullscreen mode. There are special props for this:\n`renderHeader` and `renderFooter`. Functions passed as this props can accept `options` object described below.",
					"code": "\n_renderHeader(options){\n  return (\n    <View>\n      <RkButton onPress={options.closeImage}>Custom Header</RkButton>\n    </View>\n   );\n}\n\n //...\n\n <RkModalImg source={require('../img/river.jpeg')}\n   renderHeader={this._renderHeader}/>\n"
				},
				{
					"shortDescription": "Gallery",
					"description": "Also `RkModalImg` supports multi-image source.\nThis options allows to show several images in a gallery:",
					"code": "javascript\nimport {RkModalImg} from 'react-native-ui-kitten';\n\nlet images = [ require('../img/animal.jpeg'), require('../img/bird.jpeg')]\n\n//...\n\n<RkModalImg source={images} index={0}/>\n<RkModalImg source={images} index={1}/>\n\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "`RkModalImg` doesn't have predefined rkTypes. However, it's easy and very common to create new types.\nMain point for all customization is `RkTheme` object. New rkTypes are defined using `setType` method of `RkTheme`.\n`RkModalImg` consists from couple of base react component. Styles can be applied to each internal component:",
					"code": "\nRkTheme.setType('RkModalImg','small',{\n  img:{\n    width: 50,\n    height: 50,\n    borderRadius: 10\n  }\n});\n\n //...\n\n <RkModalImg rkType='small' source={require('../img/cat.jpeg')}/>\n"
				},
				{
					"shortDescription": "Inline Styling",
					"description": "It's possible to set styles inline. Use props `style` for `img` component, `imgContainerStyle` for `imgContainer` component,\n`modalStyle` for `modal` component, `modalImgStyle` for `modalImg` component, `headerStyle` for `header` component,\n`footerStyle` for `footer` component.",
					"code": "\n<RkModalImg imgContainerStyle={{backgroundColor:'green'}} source={require('../img/cat.jpeg')}/>\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style for image in regular (not modal) mode "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "Image.props",
					"required": null,
					"name": "props",
					"shortDescription": "",
					"description": "Props will be applied to image in regular and modal mods "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "imgContainerStyle",
					"shortDescription": "",
					"description": "Style for wrapper of image in regular (not modal) mode "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "modalStyle",
					"shortDescription": "",
					"description": "Style for root view of modal component "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "modalImgStyle",
					"shortDescription": "",
					"description": "Style for image in modal mode "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "headerStyle",
					"shortDescription": "",
					"description": "Style for header container in modal mode. Applied only if renderHeader prop is not set "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "footerStyle",
					"shortDescription": "",
					"description": "Style for footer container in modal mode. Applied only if renderFooter prop is not set "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "bool",
					"required": null,
					"name": "visible",
					"shortDescription": "",
					"description": "true if modal is opened at the moment "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "animationType",
					"shortDescription": "",
					"description": "Type of animation for Modal component. Available values: 'none', 'slide', 'fade' "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "bool",
					"required": null,
					"name": "transparent",
					"shortDescription": "",
					"description": "Prop will be passed to Modal component "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "modalContainerStyle",
					"shortDescription": "",
					"description": "Style passed to container inside of Modal component "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "renderHeader",
					"shortDescription": "",
					"description": "Function for rendering custom header "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "function",
					"required": null,
					"name": "renderFooter",
					"shortDescription": "",
					"description": "Function for rendering custom footer "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "number",
					"required": null,
					"name": "index",
					"shortDescription": "",
					"description": "Function for rendering custom footer "
				}
			],
			"methods": [],
			"name": "RkModalImg",
			"description": "",
			"shortDescription": "RkModalImg  is extension of basic  Image  that also opens it in full screen on tap. ",
			"styles": [
				{
					"shortDescription": "Available components:",
					"styles": [
						{
							"name": "img",
							"description": "`Image` - Image in regular (not modal) mode"
						},
						{
							"name": "imgContainer",
							"description": "`TouchableWithoutFeedback` - container of `img` in regular (not modal) mode"
						},
						{
							"name": "modal",
							"description": "`View` - Root view of `Modal` component"
						},
						{
							"name": "modalImg",
							"description": "`Image` - Image in modal mode"
						},
						{
							"name": "header",
							"description": "`View` - View container for header in modal mode. Here also will be set content returned form `renderHeader`"
						},
						{
							"name": "headerContent",
							"description": "`View` - View container for header in modal mode (A child of `header` view). Only available if `renderHeader` not passed to component"
						},
						{
							"name": "headerText",
							"description": "`RkText` - Text that render page number in header. Only available if `renderHeader` not passed to component"
						},
						{
							"name": "footer",
							"description": "`View` - View container for footer in modal mode. Here also will be set content returned form `renderFooter` function"
						},
						{
							"name": "footerContent",
							"description": "`View` - View container for footer in modal mode (A child of `footer` view). Only available if `renderFooter` not passed to component"
						}
					]
				},
				{
					"shortDescription": "Options object passed to renderHeader and renderFooter functions",
					"styles": [
						{
							"name": "closeImage",
							"description": "Function that closes modal"
						},
						{
							"name": "pageNumber",
							"description": "Number of current page. Useful if component used as gallery"
						},
						{
							"name": "totalPages",
							"description": "Number of total pages. Useful if component used as gallery"
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [],
			"props": [
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "componentName",
					"shortDescription": "Name of component. Should be overridden in inherited component.",
					"description": ""
				},
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "object",
					"required": null,
					"name": "typeMapping",
					"shortDescription": "Mapping which used for defining predefined properties such as",
					"description": ""
				},
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "baseStyle",
					"shortDescription": "Default component style name. Can be overridden in inherited component",
					"description": ""
				},
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "defaultType",
					"shortDescription": "Default type name for component. Can be overridden in inherited component.",
					"description": ""
				}
			],
			"methods": [
				{
					"examples": [],
					"params": [
						{
							"name": "additionalTypes",
							"type": "string",
							"required": null,
							"shortDescription": "Sometimes inherited component need to apply additional type implicitly.\nFor example - if component state is  selected  component may ask about  selected  type. ",
							"description": ""
						}
					],
					"platform": null,
					"name": "defineStyles",
					"type": [
						"NameExpression"
					],
					"isStatic": false,
					"shortDescription": "Used to collect and compile all rkTypes into styles. Returns object with styles for all internal components. ",
					"description": ""
				},
				{
					"examples": [],
					"params": [
						{
							"name": "styles",
							"type": "object",
							"required": null,
							"shortDescription": "Styles which contains non-style property ",
							"description": ""
						},
						{
							"name": "property",
							"type": "string",
							"required": null,
							"shortDescription": "name of property that should be extracted. ",
							"description": ""
						}
					],
					"platform": null,
					"name": "extractNonStyleValue",
					"type": [
						"NameExpression"
					],
					"isStatic": false,
					"shortDescription": "Extracts property value from type. Often used if need to control non-style properties using types.\nExample -  placeholderTextColor  of  TextInput  component. For some reason this setting should be passed separately from  style  prop.\nSo we keep  placeholderTextColor  as style property of  RkTextInput  but before applying to internal  TextInput  - we extract this value and pass it to according prop. ",
					"description": ""
				}
			],
			"name": "RkComponent",
			"description": "",
			"shortDescription": "RkComponent  is base component for all components in  react-native-ui-kitten  library\nThis component includes core logic for stylization and theming. All themable components should extend this component. ",
			"styles": []
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Usage example:",
					"code": "\n<RkTabView>\n  <RkTabView.Tab title={'Tab 1'}>\n    <Text>Tab 1 Content</Text>\n  </RkTabView.Tab>\n  <RkTabView.Tab title={'Tab 2'}>\n    <Text>Tab 2 Content</Text>\n  </RkTabView.Tab>\n  <RkTabView.Tab title={'Tab 3'}>\n    <Text>Tab 3 Content</Text>\n  </RkTabView.Tab>\n</RkTabView>\n"
				},
				{
					"shortDescription": "Custom tab titles",
					"description": "Often there is need to put into header not only text but more complex view tree. In this case into `title` prop\nshould be passed a function which will render header.\nFunction can accept `isSelected` parameter in order to render selected or regular tab header.\nHere is an example:",
					"code": "\nlet renderTab = (isSelected, title, icon) => {\n let backgroundColor = isSelected ? 'cornflowerblue' : 'white';\n let color = (!isSelected) ? 'cornflowerblue' : 'white';\n return (\n   <View\n     style={{\n       backgroundColor,\n       justifyContent: 'center',\n       flexDirection: 'row',\n       alignItems: 'center',\n       padding: 17,\n     }}>\n     <Icon name={icon} style={{color, fontSize: 16}}/>\n     <RkText style={{color, marginLeft: 11}}>{title}</RkText>\n   </View>);\n};\n\n//...\n\n<RkTabView>\n  <RkTabView.Tab title={(selected) => {\n     return renderTab(selected, 'Bus', 'ios-bus');\n   }}>\n    <Text>Bus</Text>\n  </RkTabView.Tab>\n\n  <RkTabView.Tab title={(selected) => {\n     return renderTab(selected, 'Train', 'ios-train');\n  }}>\n    <Text>Train</Text>\n  </RkTabView.Tab>\n  <RkTabView.Tab title={(selected) => {\n     return renderTab(selected, 'Plain', 'ios-plane');\n   }}>\n    <Text>Plain</Text>\n  </RkTabView.Tab>\n</RkTabView>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkTabView` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use rkType",
					"code": "\n<RkTabView rkType='material'>\n  <RkTabView.Tab title={'Tab 1'}>\n    <Text>Tab 1 Content</Text>\n  </RkTabView.Tab>\n  <RkTabView.Tab title={'Tab 2'}>\n    <Text>Tab 2 Content</Text>\n  </RkTabView.Tab>\n  <RkTabView.Tab title={'Tab 3'}>\n    <Text>Tab 3 Content</Text>\n  </RkTabView.Tab>\n</RkTabView>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\nNew rkTypes are defined using `setType` method of `RkTheme`:\n`RkTabView` is a component which style depends or it's internal state. There are 2 states for this component:\n- unselected (base)\n- selected\nEach of this state can be configured using `rkTypes`. That means you can define set of correctly named `RkType`s\nand `RkTabView` will apply them according to its state.\nUse the following convention:\n- `~name` : Unselected state.\n- `~nameSelected` : Selected state.\nWhere `~name` is name of yours `rkType`.\nOne more note: during state change `RkTabView` not replace base `rkType` with new one. It just add correct.\nSo *selected* component will have actually two `rkType`s - base and selected.\nTo define new `rkType` you can use predefined properties which will passed to according element inside component:",
					"code": "\nRkTheme.setType('RkTabView', 'dark', {\n  backgroundColor:'#778f9b',\n  color:'white',\n  borderColor:'#4a636d'\n});\n\n RkTheme.setType('RkTabView', 'darkSelected', {\n  backgroundColor:'#4a636d',\n  borderColor:'#4a636d'\n});\n\n //...\n\n <RkTabView rkType='dark'>\n   <RkTabView.Tab title={'Tab 1'}/>\n   <RkTabView.Tab title={'Tab 2'}/>\n   <RkTabView.Tab title={'Tab 3'}/>\n </RkTabView>\n"
				},
				{
					"shortDescription": "Advanced Styling",
					"description": "It's also possible to implement more detailed styling. `RkTabView` consists from couple of base react component.\nIt's easy to set styles for each component.",
					"code": "\nRkTheme.setType('RkTabView', 'rounded', {\n  backgroundColor: 'transparent',\n  color: 'white',\n  borderColor: '#4a636d',\n  tabContainer: {\n    padding: 2,\n    borderRadius: 30,\n    overflow: 'hidden',\n    borderWidth: 0,\n    borderLeftWidth: 0,\n    borderRightWidth: 0,\n  },\n  content: {\n    padding: 7\n  },\n  container: {\n    backgroundColor: '#a6bfcc',\n    borderRadius: 20\n  }\n});\n\n RkTheme.setType('RkTabView', 'roundedSelected', {\n  backgroundColor: '#4a636d',\n  borderColor: '#4a636d'\n});\n\n\n <RkTabView rkType='rounded'>\n   <RkTabView.Tab title={'Tab 1'}/>\n   <RkTabView.Tab title={'Tab 2'}/>\n   <RkTabView.Tab title={'Tab 3'}/>\n </RkTabView>\n"
				},
				{
					"shortDescription": "Inline styling",
					"description": "It's possible to set styles inline. Use prop `style` of `RkTabView` for `container` component and\n`headerContainerStyle` for `headerContainer` component.\nUse prop `style` (unselected) and `styleSelected` (selected) of `RkTabView.Tab` for `tabContainer` component.\nUse prop `contentStyle` (unselected) and `contentStyleSelected` (selected) of `RkTabView.Tab` for `contentStyleSelected` component.\nHere is an example of inline styling:",
					"code": "\n <RkTabView style={{\n  padding: 10,\n  backgroundColor: 'lightgray', borderRadius: 5\n  }}>\n   <RkTabView.Tab style={{backgroundColor: 'yellow'}}\n     styleSelected={{backgroundColor: 'cyan'}}\n     title={'Tab 1'}/>\n   <RkTabView.Tab title={'Tab 2'}/>\n   <RkTabView.Tab title={'Tab 3'}/>\n </RkTabView>\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization. By default RkTabView supports following types:  material "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style applied to RkTabView container (tabs & content) "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "headerContainerStyle",
					"shortDescription": "",
					"description": "Style applied to container wrapping tabs (not for the content) "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "number",
					"required": null,
					"name": "maxVisibleTabs",
					"shortDescription": "",
					"description": "If set - tabs will be scrollable and only specified number of tabs will be visible. "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "title",
					"shortDescription": "",
					"description": "(RkTabView.Tab prop) When type of title is string, title is rendered like Text inside of View. Otherwise title is rendered using function passed to this prop, function can apply isSelected argument and should return React component "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "(RkTabView.Tab prop) Style applied to RkTabView.Tab content container (used only when label is text) "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "styleSelected",
					"shortDescription": "",
					"description": "(RkTabView.Tab prop) Style applied to RkTabView.Tab label container when tab is selected (used only when label is text) "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "innerStyle",
					"shortDescription": "",
					"description": "(RkTabView.Tab prop) Style applied to RkTabView.Tab label (used only when label is text) "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "innerStyleSelected",
					"shortDescription": "",
					"description": "(RkTabView.Tab prop) Style applied to RkTabView.Tab label when tab is selected (used only when label is text) "
				}
			],
			"methods": [],
			"name": "RkTabView",
			"description": "",
			"shortDescription": "RkTabView  is a component to display tabs in your application. ",
			"styles": [
				{
					"shortDescription": "Available properties:",
					"styles": [
						{
							"name": "color",
							"description": "Color of content in header of `RkTabView`. Applied for `content` property"
						},
						{
							"name": "backgroundColor",
							"description": "Background color of tab in header"
						},
						{
							"name": "borderWidth",
							"description": "Width of tab border"
						},
						{
							"name": "borderColor",
							"description": "Color of tab border"
						}
					]
				},
				{
					"shortDescription": "Available components:",
					"styles": [
						{
							"name": "container",
							"description": "`View` - root container of `RkTabView`"
						},
						{
							"name": "headerContainer",
							"description": "`View` - container for tab headers"
						},
						{
							"name": "tabContainer",
							"description": "`TouchableOpacity` - wraps each tab's header content"
						},
						{
							"name": "content",
							"description": "`RkText` when `label` prop used as string"
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Simple usage example:",
					"code": "\n<RkText>Text</RkText>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkText` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use rkType",
					"code": "\n<RkText rkType='primary'>Primary</RkText>\n<RkText rkType='danger large'>Danger and Large</RkText>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\nNew rkTypes are defined using `setType` method of `RkTheme`:",
					"code": "\nRkTheme.setType('RkText','hero',{\n fontSize: 40\n});\n\n//...\n\n<RkText rkType='hero'>Header</RkText>\n"
				},
				{
					"shortDescription": "Advanced Styling",
					"description": "It's also possible to implement more detailed styling. `RkText` wraps base `Text` component.\nIt's easy to set styles for each component.",
					"code": "\nRkTheme.setType('RkText','italic',{\n  text:{\n    fontStyle:'italic'\n  }\n});\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization\nBy default RkText supports following types:  primary ,  info ,  warning ,  danger ,  success ,  xxlarge ,  xlarge ,\n large ,  small ,  medium ,  header ,  subtitle "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "Text.props",
					"required": null,
					"name": "props",
					"shortDescription": "",
					"description": "All  Text  props also applied to  RkText "
				}
			],
			"methods": [],
			"name": "RkText",
			"description": "",
			"shortDescription": "RkText  is a component used to render text blocks ",
			"styles": [
				{
					"shortDescription": "Available properties",
					"styles": [
						{
							"name": "color",
							"description": "Color of text"
						},
						{
							"name": "backgroundColor",
							"description": "Background color of `RkText`"
						},
						{
							"name": "fontSize",
							"description": "Font size of text"
						}
					]
				},
				{
					"shortDescription": "Available components:",
					"styles": [
						{
							"name": "text",
							"description": "`Text` - component used to show text."
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Usage sample:",
					"code": "\n<RkTextInput placeholder='Login'/>\n"
				},
				{
					"shortDescription": "Usage with icon or label",
					"description": "`RkTextInput` can contain label or icon. By clicking on label/icon input will be focused.",
					"code": "\nimport Icon from 'react-native-vector-icons/Ionicons';\n\n//...\n\n<RkTextInput label={<Icon name={'ios-search'}/>}/>\n<RkTextInput label='Search'/>\n"
				},
				{
					"shortDescription": "Using rkType prop",
					"description": "`RkTextInput` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.\nThere are already some predefined types. Here is example of how to use rkType",
					"code": "\n<RkTextInput rkType='rounded' label='Search'/>\n"
				},
				{
					"shortDescription": "Define new rkTypes",
					"description": "It's easy and very common to create new types. Main point for all customization is `RkTheme` object.\nNew rkTypes are defined using `setType` method of `RkTheme`:",
					"code": "\nRkTheme.setType('RkTextInput','success',{\n  labelColor:'darkgreen',\n  underlineColor:'darkgreen',\n  underlineWidth:1,\n});\n\n//...\n\n<RkTextInput label='Login' rkType='success'/>\n"
				},
				{
					"shortDescription": "Advanced Styling",
					"description": "It's also possible to implement more detailed styling. `RkTextInput` consists from couple of base react component.\nIt's easy to set styles for each component.",
					"code": "\nRkTheme.setType('RkTextInput', 'frame', {\n  input: {\n    backgroundColor: 'white',\n    marginLeft: 0,\n    marginHorizontal: 0,\n    borderRadius: 5\n  },\n  color: 'gray',\n  backgroundColor: 'gray',\n  borderRadius: 10,\n  container: {\n    paddingHorizontal: 20\n  }\n});\n\n//...\n\n <RkTextInput rkType='frame'/>\n"
				},
				{
					"shortDescription": "Inline styling:",
					"description": "It's possible to set styles inline. Use prop `style` for `container` component, `labelStyle` for `label` component and `inputStyle` for `input`.\nHere is example of inline style usage:",
					"code": "\n<RkTextInput\n labelStyle={{color: 'gray'}}\n label={'Name'}\n inputStyle={{\n    backgroundColor: 'lightgray',\n    color: 'black',\n  }}/>\n"
				}
			],
			"props": [
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "string",
					"required": null,
					"name": "rkType",
					"shortDescription": "",
					"description": "Types for component stylization\nBy default  RkTextInput  supports following types:  bordered ,  rounded ,  form ,  topLabel "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "TextInput.props",
					"required": null,
					"name": "props",
					"shortDescription": "",
					"description": "Regular  TextInput  props will be passed to internal  TextInput  component "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "style",
					"shortDescription": "",
					"description": "Style for TouchableOpacity wrapping input and label "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "labelStyle",
					"shortDescription": "",
					"description": "Style applied to label "
				},
				{
					"kind": "prop",
					"platform": null,
					"isStatic": false,
					"type": "style",
					"required": null,
					"name": "inputStyle",
					"shortDescription": "",
					"description": "Style applied to text input "
				}
			],
			"methods": [],
			"name": "RkTextInput",
			"description": "",
			"shortDescription": "RkTextInput  is a component to be used as a basic text input. ",
			"styles": [
				{
					"shortDescription": "Available properties:",
					"styles": [
						{
							"name": "color",
							"description": "Color of typed text inside `RkTextInput`"
						},
						{
							"name": "inputBackgroundColor",
							"description": "Background color of `TextInput` inside `RkTextInput`"
						},
						{
							"name": "placeholderTextColor",
							"description": "Color of placeholder text"
						},
						{
							"name": "labelColor",
							"description": "Color of label/icon"
						},
						{
							"name": "labelFontSize",
							"description": "Font size of label"
						},
						{
							"name": "backgroundColor",
							"description": "Background color of `RkTextInput`"
						},
						{
							"name": "borderWidth",
							"description": "Width of outer border"
						},
						{
							"name": "borderRadius",
							"description": "Border radius of `RkTextInput`"
						},
						{
							"name": "borderColor",
							"description": "Color of border"
						},
						{
							"name": "underlineWidth",
							"description": "Width of bottom border of component"
						},
						{
							"name": "underlineColor",
							"description": "Color of bottom border of component"
						},
						{
							"name": "width",
							"description": "Width of `RkTextInput`"
						},
						{
							"name": "height",
							"description": "Height of `RkTextInput`"
						}
					]
				},
				{
					"shortDescription": "Available components:",
					"styles": [
						{
							"name": "container",
							"description": "`TouchableOpacity` - container of `RkTextInput`."
						},
						{
							"name": "input",
							"description": "`TextInput`."
						},
						{
							"name": "label",
							"description": "`Text` or other View tree that you had specified in `label` props."
						}
					]
				}
			]
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [
				{
					"shortDescription": "Usage sample",
					"description": "`RkStyleSheet` usually used when some style values should change depending on current theme.\nThis is important for application that change theme on the fly.",
					"code": "\n<View style={styles.root}>\n  //...\n</View>\n\nlet styles = RkStyleSheer.create(theme => ({\n    root: {\n      backgroundColor: theme.colors.screen.base\n    }\n  })\n);\n"
				}
			],
			"props": [],
			"methods": [
				{
					"examples": [],
					"params": [
						{
							"name": "style",
							"required": null,
							"shortDescription": "Object with styles or function which returns themed styles object. ",
							"description": ""
						}
					],
					"platform": null,
					"name": "create",
					"type": [
						"NameExpression"
					],
					"isStatic": false,
					"shortDescription": "Creates a  RkStyleSheet  style object from the given object or function. ",
					"description": ""
				}
			],
			"name": "ThemedStyleSheet",
			"description": "RkStyleSheet  - replace for regular  StyleSheet . Can be helpful if there is need to use dynamic theme values in standard components. ",
			"shortDescription": "RkStyleSheet  - replace for regular  StyleSheet . ",
			"styles": []
		},
		{
			"kind": "class",
			"platform": null,
			"examples": [],
			"props": [
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "object",
					"required": null,
					"name": "current",
					"shortDescription": "Returns current theme object.",
					"description": ""
				},
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "object",
					"required": null,
					"name": "styles",
					"shortDescription": "Returns auto styles. Deprecated.",
					"description": ""
				},
				{
					"kind": "property",
					"platform": null,
					"isStatic": false,
					"type": "object",
					"required": null,
					"name": "colors",
					"shortDescription": "Returns object contains material colors.",
					"description": ""
				}
			],
			"methods": [
				{
					"examples": [],
					"params": [
						{
							"name": "theme",
							"type": "object",
							"required": null,
							"shortDescription": "new theme. ",
							"description": ""
						}
					],
					"platform": null,
					"name": "setTheme",
					"type": [
						"void"
					],
					"isStatic": false,
					"shortDescription": "Updates current theme with new one. Note: function will always merge new theme with current. ",
					"description": ""
				},
				{
					"examples": [],
					"params": [
						{
							"name": "element",
							"type": "string",
							"required": null,
							"shortDescription": "component name for which new rkType should applied. ",
							"description": ""
						},
						{
							"name": "name",
							"type": "string",
							"required": null,
							"shortDescription": "name of new rkType ",
							"description": ""
						},
						{
							"name": "value",
							"type": "object",
							"required": null,
							"shortDescription": "style object for new rkType ",
							"description": ""
						}
					],
					"platform": null,
					"name": "setType",
					"type": [
						"void"
					],
					"isStatic": false,
					"shortDescription": "Creates new rkType for passed component. ",
					"description": ""
				},
				{
					"examples": [],
					"params": [
						{
							"name": "element",
							"type": "string",
							"required": null,
							"shortDescription": "element name which will be registered. ",
							"description": ""
						},
						{
							"name": "types",
							"type": "func",
							"required": null,
							"shortDescription": "function which takes theme and returns object with themed rkTypes ",
							"description": ""
						}
					],
					"platform": null,
					"name": "registerComponent",
					"type": [
						"void"
					],
					"isStatic": false,
					"shortDescription": "Register component in theming system in order to predefine rkTypes. ",
					"description": ""
				},
				{
					"examples": [],
					"params": [
						{
							"name": "name",
							"type": "string",
							"required": null,
							"shortDescription": "name of new color ",
							"description": ""
						},
						{
							"name": "value",
							"type": "string",
							"required": null,
							"shortDescription": "color value. ",
							"description": ""
						}
					],
					"platform": null,
					"name": "setColor",
					"type": [
						"void"
					],
					"isStatic": false,
					"shortDescription": "Add new color to theme ",
					"description": ""
				}
			],
			"name": "ThemeManager",
			"description": "",
			"shortDescription": "RkTheme  object is entry point for all manipulations with customization. ",
			"styles": []
		}
	]
};

/***/ }),

/***/ "./structure.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STRUCTURE; });
var STRUCTURE = [
    {
        type: 'section',
        name: 'Quick Start',
        children: [
            {
                type: 'page',
                name: 'Getting Started',
                children: [
                    {
                        type: 'block',
                        block: 'markdown',
                        source: 'index.md'
                    }
                ]
            },
            {
                type: 'page',
                name: 'Customization',
                children: [
                    {
                        type: 'block',
                        block: 'markdown',
                        source: 'customization.md'
                    }
                ]
            },
            {
                type: 'page',
                name: 'Theme',
                children: [
                    {
                        type: 'block',
                        block: 'markdown',
                        source: 'theme.md'
                    }
                ]
            },
            {
                type: 'page',
                name: 'Create custom component',
                children: [
                    {
                        type: 'block',
                        block: 'markdown',
                        source: 'guide.md'
                    }
                ]
            },
        ],
    },
    {
        type: 'section',
        name: 'UI Components',
        children: [
            {
                type: 'page',
                name: 'RkButton',
                demogif: 'button.gif',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkButton',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkButton',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkButton',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkButton',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkCard',
                demogif: 'card.gif',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkCard',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkCard',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkCard',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkCard',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkAvoidKeyboard',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkAvoidKeyboard',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkAvoidKeyboard',
                    },
                ]
            },
            {
                type: 'page',
                name: 'RkChoice',
                demogif: 'choice.gif',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkChoice',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkChoice',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkChoice',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkChoice',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkChoiceGroup',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkChoiceGroup',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkChoiceGroup',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkChoiceGroup',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkChoiceGroup',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkModalImg',
                demogif: 'image.gif',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkModalImg',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkModalImg',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkModalImg',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkModalImg',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkTabView',
                demogif: 'tab.gif',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkTabView',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkTabView',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkTabView',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkTabView',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkText',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkText',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkText',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkText',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkText',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkTextInput',
                demogif: 'input.gif',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkTextInput',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'RkTextInput',
                    },
                    {
                        type: 'block',
                        block: 'rk-props',
                        klass: 'RkTextInput',
                    },
                    {
                        type: 'block',
                        block: 'rk-styles',
                        klass: 'RkTextInput',
                    }
                ]
            },
        ],
    },
    {
        type: 'section',
        name: 'API',
        children: [
            {
                type: 'page',
                name: 'RkComponent',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'RkComponent',
                    },
                    {
                        type: 'block',
                        block: 'rk-properties',
                        klass: 'RkComponent',
                    },
                    {
                        type: 'block',
                        block: 'rk-methods',
                        klass: 'RkComponent',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkTheme',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'ThemeManager',
                    },
                    {
                        type: 'block',
                        block: 'rk-methods',
                        klass: 'ThemeManager',
                    }
                ]
            },
            {
                type: 'page',
                name: 'RkStyleSheet',
                children: [
                    {
                        type: 'block',
                        block: 'rk-description',
                        klass: 'ThemedStyleSheet',
                    },
                    {
                        type: 'block',
                        block: 'rk-examples',
                        klass: 'ThemedStyleSheet',
                    },
                    {
                        type: 'block',
                        block: 'rk-methods',
                        klass: 'ThemedStyleSheet',
                    }
                ]
            },
        ],
    },
];
//# sourceMappingURL=structure.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
