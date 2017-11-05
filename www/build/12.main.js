webpackJsonp([12],{

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offer__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferPageModule", function() { return OfferPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OfferPageModule = (function () {
    function OfferPageModule() {
    }
    return OfferPageModule;
}());
OfferPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__offer__["a" /* OfferPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__offer__["a" /* OfferPage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__offer__["a" /* OfferPage */]
        ]
    })
], OfferPageModule);

//# sourceMappingURL=offer.module.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OfferPage = (function () {
    function OfferPage(af, navCtrl) {
        var _this = this;
        this.af = af;
        this.navCtrl = navCtrl;
        var queryObservable = af.list('/menuItems', {
            query: {
                orderByChild: 'offer',
                equalTo: true
            }
        });
        queryObservable.subscribe(function (queriedItems) {
            _this.offerData = queriedItems;
        });
    }
    OfferPage.prototype.gotoNextSlide = function () {
        this.slides.slideNext();
    };
    OfferPage.prototype.gotoPrevSlide = function () {
        this.slides.slidePrev();
    };
    OfferPage.prototype.addToCart = function (key) {
        this.navCtrl.push("ProductDetailsPage", { id: key });
    };
    return OfferPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], OfferPage.prototype, "slides", void 0);
OfferPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-offer',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/offer/offer.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{"Offers" | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-row class="full-slide"><!-- first row -->\n    <ion-slides initialSlide=0 speed=1000 loop=true>\n      <ion-slide *ngFor="let data of offerData">\n        <div class="overlay">\n          <img src="{{data.thumb}}" class="slider-img">\n          <div class="offer-label">\n            <span class="square text-center light assertive-bg ng-binding">{{data.offerPercentage}}%</span>\n            <i class="triangle"></i>\n          </div>\n          <div class="card-title">\n            <ion-icon name="arrow-dropleft" (click)="gotoPrevSlide()"></ion-icon>\n            &nbsp;&nbsp;&nbsp; {{data.title}} &nbsp;&nbsp;&nbsp;\n            <ion-icon name="arrow-dropright" (click)="gotoNextSlide()"></ion-icon>\n          </div>\n        </div>\n\n        <p class="price"><b>{{"Original Price :" | translate}}</b> <span class="total line">{{data.price[0].value}}</span></p>\n        <p class="price"><b>{{"Offer Price :" | translate}} </b> <span class="total">{{data.price[0].specialPrice | number:0}}</span></p>\n        <p class="desc"><b>{{"Product Description :" | translate}} </b> {{data.description}}</p>\n\n\n        <!-- first row -->\n        <!--botton-->\n        <a (click)="addToCart(data.$key)" ion-button icon-left full class="btn-add-to-cart">\n          <ion-icon name="cart">\n\n          </ion-icon>\n          {{"Buy Now" | translate}}\n        </a>\n      </ion-slide>\n    </ion-slides>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/offer/offer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["b" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], OfferPage);

//# sourceMappingURL=offer.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map