webpackJsonp([17],{

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPageModule", function() { return CategoryPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CategoryPageModule = (function () {
    function CategoryPageModule() {
    }
    return CategoryPageModule;
}());
CategoryPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]
        ]
    })
], CategoryPageModule);

//# sourceMappingURL=category.module.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CategoryPage = (function () {
    function CategoryPage(navCtrl, af, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.af = af;
        this.loadingCtrl = loadingCtrl;
        this.mySlideOptions = {
            initialSlide: 1,
            loop: true,
            autoplay: 2000,
            pager: false
        };
        this.Cart = [];
        this.ComingData = [];
        this.Categories = [];
        this.Cart = JSON.parse(localStorage.getItem('Cart'));
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present().then(function () {
            if (localStorage.getItem('Cart') != null) {
                _this.noOfItems = _this.Cart.length;
            }
            _this.comingData = af.list('/coming');
            _this.categories = af.list('/categories');
            _this.comingData.subscribe(function (data) {
                _this.ComingData = data;
            });
            _this.categories.subscribe(function (data) {
                loader.dismiss();
                _this.Categories = data;
            });
        });
    }
    CategoryPage.prototype.navigate = function (id) {
        this.navCtrl.push("ProductListPage", { id: id });
    };
    CategoryPage.prototype.navcart = function () {
        this.navCtrl.push("CartPage");
    };
    return CategoryPage;
}());
CategoryPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-category',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/category/category.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="title">{{"Category" | translate}}\n      <span class="cart-icon-nav"><ion-icon ios="ios-cart" md="md-cart" (click)="navcart()"></ion-icon> <ion-badge\n        class="carts" item-right color="danger">{{noOfItems}}</ion-badge></span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <img src="assets/img/crepeswhisktillsm.jpg" alt="" class="img">\n  <ion-grid class="grid">\n    <ion-row>\n      <!-- second row -->\n      <ion-card *ngFor="let category of Categories">\n        <ion-list>\n          <ion-item (click)="navigate(category.$key)">\n            <ion-thumbnail item-left>\n              <img src="{{category.thumb}}">\n            </ion-thumbnail>\n            <p class="heading">{{category.title}}</p>\n            <p>{{category.description |limitPipe:50}}</p>\n          </ion-item>\n        </ion-list>\n      </ion-card>\n    </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/category/category.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], CategoryPage);

//# sourceMappingURL=category.js.map

/***/ })

});
//# sourceMappingURL=17.main.js.map