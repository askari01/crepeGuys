webpackJsonp([15],{

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favourite__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavouritePageModule", function() { return FavouritePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FavouritePageModule = (function () {
    function FavouritePageModule() {
    }
    return FavouritePageModule;
}());
FavouritePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__favourite__["a" /* FavouritePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__favourite__["a" /* FavouritePage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__favourite__["a" /* FavouritePage */]
        ]
    })
], FavouritePageModule);

//# sourceMappingURL=favourite.module.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavouritePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FavouritePage = (function () {
    function FavouritePage(af, db, navCtrl, toastCtrl) {
        var _this = this;
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.favouriteItems = [];
        if (this.af.auth.currentUser) {
            this.db.list('/users/' + this.af.auth.currentUser.uid + '/favourite/').subscribe(function (res) {
                _this.favouriteItems = res;
            });
        }
    }
    FavouritePage.prototype.isFavourite = function () {
        if (this.favouriteItems.length == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    FavouritePage.prototype.buyNow = function (key) {
        this.navCtrl.push("ProductDetailsPage", { id: key });
    };
    FavouritePage.prototype.navcart = function () {
        this.navCtrl.push("CartPage");
    };
    FavouritePage.prototype.removeFromFavourites = function (key) {
        if (this.af.auth.currentUser) {
            //console.log('uid' + res.auth.uid);
            this.db.object('/users/' + this.af.auth.currentUser.uid + '/favourite/' + key).remove();
            this.createToaster('removed from favourites', '3000');
        }
    };
    FavouritePage.prototype.createToaster = function (message, duration) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    };
    return FavouritePage;
}());
FavouritePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-favourite',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/favourite/favourite.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{"Favourite" | translate}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="royal" (click)="navcart()">\n        <ion-icon name="cart"></ion-icon>\n        <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content [ngClass]="{bg:!isFavourite()}">\n   <div *ngIf="!isFavourite()">\n     <ion-row>\n       <ion-icon class="empty-cart" name="heart"></ion-icon>\n     </ion-row>\n        <h4>Wish List is empty!</h4>\n    </div>\n\n  <div *ngIf="isFavourite()">\n  <ion-card *ngFor="let favouriteItem of favouriteItems">\n    <ion-list>\n      <ion-item>\n        <ion-thumbnail item-left>\n          <img src={{favouriteItem.thumb}}>\n        </ion-thumbnail>\n        <p class="heading">{{favouriteItem.title}}</p>\n        <p>{{favouriteItem.description}}</p>\n        <ion-row>\n          <ion-col col-6>\n            <button class="add" ion-button (click)="buyNow(favouriteItem.$key)">\n            <ion-icon name="cart"></ion-icon>\n            &nbsp; {{"Buy Now" | translate}}\n           </button>\n         </ion-col>\n          <ion-col col-6>\n          <button color="danger" class="delete" ion-button outline (click)="removeFromFavourites(favouriteItem.$key)">\n              <ion-icon  name="trash">\n              </ion-icon>\n            </button>\n          </ion-col>\n      </ion-row>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/favourite/favourite.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
], FavouritePage);

//# sourceMappingURL=favourite.js.map

/***/ })

});
//# sourceMappingURL=15.main.js.map