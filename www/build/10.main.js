webpackJsonp([10],{

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsPageModule", function() { return ProductDetailsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProductDetailsPageModule = (function () {
    function ProductDetailsPageModule() {
    }
    return ProductDetailsPageModule;
}());
ProductDetailsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__product_details__["a" /* ProductDetailsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__product_details__["a" /* ProductDetailsPage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__product_details__["a" /* ProductDetailsPage */]
        ]
    })
], ProductDetailsPageModule);

//# sourceMappingURL=product-details.module.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_cart_service__ = __webpack_require__(283);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductDetailsPage = (function () {
    function ProductDetailsPage(navCtrl, af, db, navParams, cartService, alertCtrl, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.af = af;
        this.db = db;
        this.navParams = navParams;
        this.cartService = cartService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.FireVisible = false;
        this.count = 1;
        this.resFevrt = {};
        this.menuItems = {};
        this.cart = {
            itemId: String,
            extraOptions: [],
            price: {
                name: "",
                value: Number,
                currency: ''
            },
            title: '',
            thumb: String,
            itemQunatity: this.count
        };
        this.Cart = [];
        this.selectedItems = [];
        this.visible = false;
        this.Cart = JSON.parse(localStorage.getItem('Cart'));
        if (localStorage.getItem('Cart') != null) {
            this.noOfItems = this.Cart.length;
        }
        this.id = this.navParams.get('id');
        this.menuItem = db.object('/menuItems/' + this.id);
        this.menuItem.subscribe(function (data) {
            _this.menuItems = data;
            _this.cart.title = data.title;
            _this.cart.itemId = data.$key;
            _this.cart.thumb = data.thumb;
            if (_this.af.auth.currentUser) {
                _this.db.object('/users/' + _this.af.auth.currentUser.uid + '/favourite/' + _this.id).subscribe(function (res) {
                    _this.resFevrt = res;
                });
            }
        });
    }
    ProductDetailsPage.prototype.addQuantity = function () {
        if (this.count < 10) {
            this.count = this.count + 1;
            this.cart.itemQunatity = this.count;
        }
    };
    ProductDetailsPage.prototype.removeQuantity = function () {
        if (this.count > 1) {
            this.count = this.count - 1;
            this.cart.itemQunatity = this.count;
        }
    };
    ProductDetailsPage.prototype.navcart = function () {
        this.navCtrl.push("CartPage");
    };
    ProductDetailsPage.prototype.home = function () {
        this.navCtrl.push("HomePage");
    };
    ProductDetailsPage.prototype.sizeOptions = function (price) {
        this.cart.price = price;
    };
    ProductDetailsPage.prototype.checkOptions = function (extraOption) {
        if (this.cart.extraOptions.length != 0) {
            for (var i = 0; i <= this.cart.extraOptions.length - 1; i++) {
                if (this.cart.extraOptions[i].name == extraOption.name) {
                    this.cart.extraOptions.splice(i, 1);
                    break;
                }
                else {
                    this.cart.extraOptions.push(extraOption);
                    break;
                }
            }
        }
        else {
            this.cart.extraOptions.push(extraOption);
        }
    };
    ProductDetailsPage.prototype.addToCart = function () {
        console.log("item.cart" + JSON.stringify(this.cart.price));
        if (this.cart.price.name == "") {
            console.log('if');
            var alert_1 = this.alertCtrl.create({
                title: 'Please!',
                subTitle: 'Select Size and Price!',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            console.log('else');
            this.cartService.OnsaveLS(this.cart);
            this.navCtrl.push("CartPage");
        }
    };
    ProductDetailsPage.prototype.addToFevrt = function (key) {
        var _this = this;
        if (this.af.auth.currentUser) {
            //console.log('uid' + res.auth.uid);
            this.db.object('/users/' + this.af.auth.currentUser.uid + '/favourite/' + key).update({
                thumb: this.menuItems.thumb,
                title: this.menuItems.title,
                description: this.menuItems.description
            }).then(function (res) {
                _this.createToaster('added to favourites', '3000');
            });
        }
    };
    ProductDetailsPage.prototype.removeFevrt = function (key) {
        if (this.af.auth.currentUser) {
            console.log('uid' + this.af.auth.currentUser.uid);
            this.db.object('/users/' + this.af.auth.currentUser.uid + '/favourite/' + key).remove();
            this.createToaster('removed from favourites', '3000');
        }
    };
    ProductDetailsPage.prototype.createToaster = function (message, duration) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    };
    return ProductDetailsPage;
}());
ProductDetailsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-product-details',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/product-details/product-details.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="title">{{ cart.title | translate}}\n      <span class="cart-icon-nav"><ion-icon ios="ios-cart" md="md-cart" (click)="navcart()"></ion-icon> <ion-badge\n        class="carts" item-right color="danger">{{noOfItems}}</ion-badge></span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="item-page">\n  <ion-row class="productImage">\n    <img src={{menuItems.thumb}} alt="{{menuItems.title}} ">\n \n\n  </ion-row><!-- first-row -->\n  <!--favourite-->\n  <span clear text-center *ngIf="resFevrt.$value==null" (click)="addToFevrt(menuItems.$key)">\n        <ion-icon name="heart" class="fav heart-clicked"></ion-icon>\n    </span>\n  <span clear text-center *ngIf="resFevrt.title" (click)="removeFevrt(menuItems.$key)">\n         <ion-icon name="heart" class="fav"></ion-icon>\n    </span>\n  <ion-row>\n    <ion-col col-6>\n      <div class="count">\n            <span class="item-count" (click)="removeQuantity()">\n              -\n            </span>\n        <span class="item-count show-count">\n              {{count}}\n            </span>\n        <span class="item-count" (click)="addQuantity()">\n              +\n            </span>\n      </div>\n    </ion-col>\n\n    <ion-col col-6>\n      <a (click)="addToCart()" ion-button icon-left full class="btn-add-to-cart">\n        <ion-icon name="cart"></ion-icon>\n        &nbsp;\n        {{"ADD TO CART" | translate}}\n      </a>\n    </ion-col>\n  </ion-row><!-- row-2 -->\n  <ion-list radio-group class="size-list">\n    <ion-list-header class="size-list-header" text-center>\n      {{"Size and prices" | translate}}\n    </ion-list-header>\n    <ion-item *ngFor="let item of menuItems.price; let i= index" class="size-list-item">\n      <ion-label *ngIf="item.specialPrice"> {{item.pname}} <span class="cut">${{item.value}}</span> <span\n        class="offer-p">${{item.specialPrice |number:0}}</span></ion-label>\n      <ion-label *ngIf="!item.specialPrice"> {{item.pname}} ${{item.value}}</ion-label>\n      <ion-radio class="checked" (ionSelect)="sizeOptions(item)"></ion-radio>\n    </ion-item>\n  </ion-list>\n  <ion-list class="extra-list" *ngIf="menuItems.extraOptions != null">\n    <ion-list-header class="header" text-center>Add extra choice</ion-list-header>\n    <ion-item *ngFor="let option of menuItems.extraOptions; let i= index" class="list-item">\n      <ion-label>{{option.name}} ({{option.value}} USD)</ion-label>\n      <ion-toggle (ionChange)="checkOptions(option)"></ion-toggle>\n    </ion-item>\n  </ion-list>\n\n  <ion-row class="button-fixed">\n    <ion-col col-6>\n      <a (click)="addToCart()" ion-button icon-left full class="btn-add-to-cart">\n        <ion-icon name="cart"></ion-icon>\n        &nbsp;\n        {{"CHECKOUT" | translate}}\n      </a>\n    </ion-col>\n    <ion-col col-6>\n      <a (click)="home()" ion-button icon-left full class="btn-add-to-cart">\n        <ion-icon name="basket"></ion-icon>\n        &nbsp;\n        {{"KEEP SHOPPING" | translate}}\n      </a>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/product-details/product-details.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__pages_cart_service__["a" /* CartService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
], ProductDetailsPage);

//# sourceMappingURL=product-details.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map