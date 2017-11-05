webpackJsonp([18],{

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPageModule", function() { return CartPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CartPageModule = (function () {
    function CartPageModule() {
    }
    return CartPageModule;
}());
CartPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */]
        ]
    })
], CartPageModule);

//# sourceMappingURL=cart.module.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CartPage = (function () {
    function CartPage(db, navCtrl, modalCtrl, popoverCtrl, alertCtrl, loadingCtrl, toastCtrl) {
        var _this = this;
        this.db = db;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.Cart = [];
        this.settings = {};
        this.otherTaxes = 0.00;
        this.coupons = [];
        this.couponDiscount = 0;
        this.Cart = JSON.parse(localStorage.getItem('Cart'));
        if (this.Cart != null) {
            this.noOfItems = this.Cart.length;
            this.callFunction();
        }
        this.db.list('/coupons', {
            query: {
                orderByChild: 'value'
            }
        })
            .subscribe(function (response) {
            _this.coupons = response;
        });
    }
    CartPage.prototype.applyCoupon = function () {
        var subTotals = this.subTotal;
        this.deductedPrice = this.decimalFormat(this.couponDiscount / 100 * subTotals);
        subTotals = subTotals - (this.couponDiscount / 100 * subTotals);
        //console.log("subtotal--"+this.subTotal);
        this.GrandTotal = this.decimalFormat(subTotals + this.total);
        this.createToaster('Coupon applied successfully', '3000');
    };
    CartPage.prototype.createToaster = function (message, duration) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    };
    CartPage.prototype.deleteItem = function (itemId) {
        for (var i = 0; i <= this.Cart.length - 1; i++) {
            if (this.Cart[i].item.itemId == itemId) {
                this.Cart.splice(i, 1);
                this.callFunction();
                localStorage.setItem('Cart', JSON.stringify(this.Cart));
                this.Cart = JSON.parse(localStorage.getItem('Cart'));
                this.noOfItems = this.noOfItems - 1;
            }
        }
    };
    CartPage.prototype.callFunction = function () {
        var _this = this;
        this.setting = this.db.object('/settings');
        var subTotal = 0;
        this.setting.subscribe(function (data) {
            _this.settings = data;
            for (var i = 0; i <= _this.Cart.length - 1; i++) {
                subTotal = subTotal + _this.Cart[i].itemTotalPrice;
            }
            _this.subTotal = subTotal;
            _this.total = (_this.subTotal) * _this.settings.totalVat / 100;
            _this.GrandTotal = _this.decimalFormat(_this.subTotal + _this.total);
        });
    };
    CartPage.prototype.nav = function () {
        var _this = this;
        if (localStorage.getItem('uid') == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'SORRY!',
                subTitle: 'You Have to Login First!',
                buttons: [
                    {
                        text: 'Ok',
                        handler: function (data) {
                            _this.navCtrl.push("LoginPage");
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            this.navCtrl.push("CheckoutPage", {
                grandTotal: this.GrandTotal
            });
        }
    };
    CartPage.prototype.add = function (data) {
        if (data.item.itemQunatity < 20) {
            data.item.itemQunatity = data.item.itemQunatity + 1;
            for (var i = 0; i <= this.Cart.length - 1; i++) {
                var ExtotalPrice = 0;
                var totalPrice = 0;
                if (this.Cart[i].item.itemId == data.item.itemId) {
                    this.Cart[i].item.itemQunatity = data.item.itemQunatity;
                    for (var j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
                        ExtotalPrice = ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
                    }
                    if (this.Cart[i].item.price.specialPrice) {
                        totalPrice = ExtotalPrice + this.Cart[i].item.price.specialPrice;
                    }
                    else {
                        totalPrice = ExtotalPrice + this.Cart[i].item.price.value;
                    }
                    this.Cart[i].itemTotalPrice = totalPrice * data.item.itemQunatity;
                }
            }
            localStorage.setItem('Cart', JSON.stringify(this.Cart));
            this.callFunction();
        }
    };
    CartPage.prototype.remove = function (data) {
        if (data.item.itemQunatity > 1) {
            data.item.itemQunatity = data.item.itemQunatity - 1;
            for (var i = 0; i <= this.Cart.length - 1; i++) {
                var ExtotalPrice = 0;
                var totalPrice = 0;
                if (this.Cart[i].item.itemId == data.item.itemId) {
                    this.Cart[i].item.itemQunatity = data.item.itemQunatity;
                    for (var j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
                        ExtotalPrice = ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
                    }
                    if (this.Cart[i].item.price.specialPrice) {
                        totalPrice = ExtotalPrice + this.Cart[i].item.price.specialPrice;
                    }
                    else {
                        totalPrice = ExtotalPrice + this.Cart[i].item.price.value;
                    }
                    this.Cart[i].itemTotalPrice = totalPrice * data.item.itemQunatity;
                }
            }
            localStorage.setItem('Cart', JSON.stringify(this.Cart));
            this.callFunction();
        }
    };
    CartPage.prototype.isCart = function () {
        if (localStorage.getItem('Cart') == null || this.Cart.length == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    CartPage.prototype.gotoHome = function () {
        localStorage.removeItem('Cart');
        this.navCtrl.push("HomePage");
    };
    CartPage.prototype.decimalFormat = function (num) {
        return num.toFixed(2);
    };
    return CartPage;
}());
CartPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-cart',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/cart/cart.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{"MyCart" | translate}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="royal">\n        <ion-icon name="cart"></ion-icon>\n        <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content [ngClass]="{bg:!isCart()}">\n  <div *ngIf="!isCart()">\n    <ion-row>\n       <ion-icon class="empty-cart" name="cart"></ion-icon>\n     </ion-row>\n        <h4>Your Cart is empty!</h4>\n   <button ion-button class="continue-btn" (click)="gotoHome()">{{\'Add Items\' | translate}}</button>\n    </div>\n  <div *ngIf="isCart()">\n    <ion-list class="cart-list" *ngFor="let data of Cart"><!-- item-list -->\n      <ion-item class="cart-item"><!-- item -->\n        <ion-row><!-- col-cancel  button -->\n          <ion-col col-2><!-- col-cancel  button -->\n            <button ion-button icon-only clear color="dark" class="vertical-center"(click)="deleteItem(data.item.itemId)">\n              <ion-icon name="close-circle"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col col-10><!-- col-for item-image and details -->\n            <ion-row>\n              <ion-col col-6><!-- item-image -->\n                <img src={{data.item.thumb}} alt="">\n              </ion-col>\n              <ion-col col-6>\n                <p class="item-name">{{data.item.title}}</p>\n                <p class="item-detail" text-wrap>Quantity: {{data.item.itemQunatity}}</p>\n                <span *ngIf="data.item.price.specialPrice">\n							    <p class="item-detail">Price: <span class="item-price"><strong class="cut">  ${{data.item.price.value}}</strong></span></p>\n                                <p class="item-detail">Special Price:<span class="item-price"><strong> ${{data.item.price.specialPrice}}</strong></span></p>\n                                </span>\n                <span *ngIf="!data.item.price.specialPrice">\n                                <p class="item-detail">Price:<span class="item-price"> ${{data.item.price.value}}</span></p>\n                                </span>\n                <ion-row><!-- row-for count item -->\n                  <div class="count">\n							            <span class="item-count" (click)="remove(data)">\n							              -\n							            </span>\n                    <span class="item-count show-count">\n							             {{data.item.itemQunatity}}\n							            </span>\n                    <span class="item-count" (click)="add(data)">\n							              +\n							            </span>\n                  </div>\n                </ion-row>\n              </ion-col>\n            </ion-row>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n    <ion-row class="price-details">\n      <ion-col class="calculate" col-12>\n        <p class="bill-detail">{{"Price Subtotal" | translate}} <span>$ {{subTotal | number}}</span></p>\n\n        <div *ngIf="deductedPrice">\n          <p class="bill-detail">{{\'Deducted Price\' | translate}} <span> - ${{deductedPrice | number}}</span></p>\n        </div>\n\n        <p class="bill-detail">{{"Total VAT" | translate}}({{settings.totalVat }}%) <span>${{total}}</span></p>\n        <p class="bill-detail">{{"Other Taxes" | translate}} <span> {{otherTaxes}}%</span></p>\n        <hr>\n         <ion-row>\n          <ion-col col-4>\n            <p class="bill-detail">{{"Apply Coupon" | translate}}</p>\n          </ion-col>\n          <ion-col col-8>\n\n            <ion-item class="select-item">\n              <ion-label>{{"Coupons" | translate}}</ion-label>\n              <ion-select [(ngModel)]="couponDiscount" (ionChange)="applyCoupon()">\n                <ion-option *ngFor="let coupon of coupons" value="{{coupon.value}}"> {{coupon.name}} &nbsp; ({{coupon.value}}%)\n                </ion-option>\n              </ion-select>\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n        <p class="cart-total"><strong>{{"Order Total" | translate}}</strong><span class="price"> $ {{GrandTotal | number}}</span>\n        </p>\n      </ion-col>\n    </ion-row><!-- row-bill-deatails -->\n    <!-- continue button -->\n    <ion-row>\n      <ion-col col-12>\n        <button ion-button block class="continue-btn" (click)="nav()">{{"Continue"| translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/cart/cart.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ })

});
//# sourceMappingURL=18.main.js.map