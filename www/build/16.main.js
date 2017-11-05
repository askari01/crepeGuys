webpackJsonp([16],{

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkout__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutPageModule", function() { return CheckoutPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CheckoutPageModule = (function () {
    function CheckoutPageModule() {
    }
    return CheckoutPageModule;
}());
CheckoutPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__checkout__["a" /* CheckoutPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__checkout__["a" /* CheckoutPage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__checkout__["a" /* CheckoutPage */]
        ]
    })
], CheckoutPageModule);

//# sourceMappingURL=checkout.module.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_stripe__ = __webpack_require__(285);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CheckoutPage = (function () {
    function CheckoutPage(af, db, navCtrl, navParams, payPal, stripe) {
        var _this = this;
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.payPal = payPal;
        this.stripe = stripe;
        this.tagHide1 = true;
        this.tagHide2 = true;
        this.order = {};
        this.address = {};
        this.cardDetails = {};
        this.userDetails = {
            email: '',
            name: '',
            mobileNo: '',
            userid: ''
        };
        this.paymentMethod = 'paypal';
        this.disabledCheckout = false;
        this.stripe.setPublishableKey('pk_live_sOPGKgLK99qWMjmw4pncjctr');
        //this.stripe.setPublishableKey('pk_test_P37lCBBdJpL8YKHAadof6rsv');
        this.cardDetails = this.getCardData();
        this.str = '#';
        var num = Math.floor(Math.random() * 900000) + 100000;
        this.color = this.str.concat(num);
        if (this.af.auth.currentUser) {
            this.userId = this.af.auth.currentUser.uid;
        }
        this.grandTotal = this.navParams.get('grandTotal');
        this.userDetail = this.db.object('/users/' + this.userId);
        this.userDetail.subscribe(function (res) {
            _this.userDetails = {
                email: res.email,
                name: res.name,
                mobileNo: res.mobileNo,
                userid: _this.userId
            };
        });
        this.cart = JSON.parse(localStorage.getItem('Cart'));
        this.checkout = db.list('/orders');
        this.order.cod = 'cod';
        // Get CheckoutInfo and DeliveryRange
        this.db.object('/business').subscribe(function (res) {
            _this.checkoutInfo = res.checkoutInfo;
        });
        // default address params
        this.orderId = Date.now();
        var today = new Date();
        today.setDate(today.getDate() + 1);
        this.address.delivery_day = today.toISOString();
        this.address.delivery_time = '08:00';
        this.delivery_addresses = db.list('/delivery_addresses');
    }
    CheckoutPage.prototype.onCheckOut = function (form) {
        // const delivery_day: any = new Date(this.address.delivery_day);
        // const delivery_time: any = this.address.delivery_time.split(':');
        // const delivery_date: any = new Date(delivery_day.getFullYear(), delivery_day.getMonth(), delivery_day.getDate(), delivery_time[0], delivery_time[1], 0);
        // this.date = new Date();
        // this.order.orderId = this.orderId;
        // this.order.cart = this.cart;
        // this.order.address = this.address;
        // this.order.userDetails = this.userDetails;
        // this.order.grandTotal = this.grandTotal;
        // this.order.userId = this.userId;
        // this.order.createdAt = Date.parse(this.date);
        // this.order.status = "pending";
        // this.order.deliveryDate = delivery_date.toString();
        // this.order.payment_method = 'COD';
        // console.log("thisorder", this.order);
        // this.checkout.push(this.order);
        // this.navCtrl.push("ThankyouPage");
    };
    CheckoutPage.prototype.toggle2 = function () {
        this.order.cod = '';
        this.tagHide2 = this.tagHide2 ? false : true;
    };
    CheckoutPage.prototype.toggle3 = function () {
        this.tagHide2 = true;
        this.order.cod = 'cod';
    };
    CheckoutPage.prototype.checkoutAndPay = function () {
        var _this = this;
        var delivery_day = new Date(this.address.delivery_day);
        var delivery_time = this.address.delivery_time.split(':');
        var delivery_date = new Date(delivery_day.getFullYear(), delivery_day.getMonth(), delivery_day.getDate(), delivery_time[0], delivery_time[1], 0);
        this.date = new Date();
        this.order.orderId = this.orderId;
        this.order.cart = this.cart;
        this.order.address = this.address;
        this.order.userDetails = this.userDetails;
        this.order.grandTotal = this.grandTotal;
        this.order.userId = this.userId;
        this.order.createdAt = Date.parse(this.date);
        this.order.status = "pending";
        this.order.deliveryDate = delivery_date.toString();
        if (this.paymentMethod == 'paypal') {
            this.order.payment_method = 'PAYPAL';
            this.payWithPaypal(this.order.grandTotal, 'USD', '#ORDER_' + this.orderId)
                .then(function (data) {
                console.log("Success Paypal", data);
                _this.order.payment_id = data.response.id;
                _this.checkout.push(_this.order);
                _this.navCtrl.push("ThankyouPage");
            })
                .catch(function (err) {
                console.log("Err Paypal", err);
            });
        }
        if (this.paymentMethod == 'stripe') {
            this.order.payment_method = 'STRIPE';
            if (!this.cardDetails.expiryDate || !this.cardDetails.cardNumber || !this.cardDetails.cvv)
                return;
            var expiryDate = this.cardDetails.expiryDate.split('-');
            var card = {
                number: this.cardDetails.cardNumber,
                expMonth: expiryDate[1],
                expYear: expiryDate[0],
                cvc: this.cardDetails.cvv
            };
            console.log(card);
            this.disabledCheckout = true;
            this.stripe.createCardToken(card)
                .then(function (token) {
                _this.disabledCheckout = false;
                _this.saveCardData(_this.cardDetails);
                console.log(token.id);
                _this.order.stripe_token = token.id;
                _this.order.stripe_amount = Math.trunc(_this.order.grandTotal * 100);
                _this.checkout.push(_this.order);
                _this.navCtrl.push("ThankyouPage");
            })
                .catch(function (error) {
                _this.disabledCheckout = false;
                console.error(error);
            });
        }
    };
    CheckoutPage.prototype.payWithPaypal = function (amount, currency, description) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.payPal.init({
                PayPalEnvironmentProduction: 'AbmCyyZwAaWg68hxY7gzQ6h0oI7FnaLzkzNAx03Sd4BtH6ablou8CphlJKvgt0kYG5jlIandG4wjcxVM',
                PayPalEnvironmentSandbox: ''
            }).then(function () {
                _this.payPal.prepareToRender('PayPalEnvironmentProduction', new __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["b" /* PayPalConfiguration */]({
                    acceptCreditCards: false
                })).then(function () {
                    var payment = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["c" /* PayPalPayment */](amount, currency, description, 'sale');
                    _this.payPal.renderSinglePaymentUI(payment).then(function (res) {
                        resolve(res);
                    }, function () { });
                }, function (err) {
                    reject(err);
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    CheckoutPage.prototype.saveCardData = function (card) {
        localStorage.setItem('card', JSON.stringify(card));
    };
    CheckoutPage.prototype.getCardData = function () {
        var card = {};
        try {
            card = JSON.parse(localStorage.getItem('card'));
        }
        catch (err) {
            card = {};
        }
        if (card == null) {
            card = {};
        }
        return card;
    };
    return CheckoutPage;
}());
CheckoutPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-checkout',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/checkout/checkout.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="title">{{"Payment Options" |translate}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="checkOut">\n  <form (ngSubmit)="onCheckOut(f)" #f="ngForm">\n    <ion-row>\n      <ion-col col-12 class="address-header">\n        <ion-icon ios="ios-home" md="md-home"></ion-icon>\n        &nbsp;&nbsp;{{"Address" | translate}}\n      </ion-col>\n    </ion-row><!-- row for address -->\n    <ion-list class="adress-line">\n      <form>\n        <ion-label class="add-heading">\n          <ion-icon ios="ios-home" md="md-home"></ion-icon>\n          &nbsp;&nbsp;{{"ENTER ADDRESS" | translate}}\n        </ion-label>\n        <div>\n          <ion-item class="sub-address">\n            <ion-select [(ngModel)]="address.address" name="address" placeholder="Select address" class="select-address">\n              <ion-option text-wrap *ngFor="let delivery_address of delivery_addresses | async" [value]="delivery_address.street">\n                <div>{{delivery_address.place}}</div>\n                <div>{{delivery_address.street}}</div>\n              </ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class="sub-address">\n            <ion-input type="text" placeholder="Apartment, suite, unit" name="apartment" id="apartment"\n              [(ngModel)]="address.apartment"></ion-input>\n          </ion-item>\n\n          <ion-item class="sub-address">\n            <ion-label class="label">Delivery date</ion-label>\n            <ion-datetime displayFormat="MMM DD" [(ngModel)]="address.delivery_day" name="delivery_day"></ion-datetime>\n          </ion-item>\n\n          <ion-item class="sub-address">\n            <ion-label class="label">Delivery time</ion-label>\n            <ion-datetime displayFormat="HH:mm" hourValues="8,9,10,11" max="11:30" [(ngModel)]="address.delivery_time" name="delivery_time"></ion-datetime>\n          </ion-item>\n\n          <ion-item class="sub-address">\n            <ion-textarea placeholder="Comments" name="comments" class="comments" [(ngModel)]="address.comments"></ion-textarea>\n          </ion-item>\n        </div>\n      </form>\n    </ion-list>\n    <div text-center class="preorder-message">\n      <ion-icon name="information-circle"></ion-icon> {{checkoutInfo}}\n    </div>\n    <ion-row>\n      <ion-col  col-12 class="payment-header">\n        <ion-icon ios="ios-pricetags" md="md-pricetags"></ion-icon>\n        &nbsp;&nbsp;{{"Payment"| translate}}\n      </ion-col>\n    </ion-row>\n    \n    <!-- Select payment method -->\n    <ion-list radio-group [(ngModel)]="paymentMethod" name="paymentMethod">\n      <ion-item>\n        <ion-label>Paypal</ion-label>\n        <ion-radio value="paypal" checked="true"></ion-radio>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Credit Card</ion-label>\n        <ion-radio value="stripe"></ion-radio>\n      </ion-item>\n    </ion-list>\n    \n    <!-- Stripe Card data -->\n    <ion-row *ngIf="paymentMethod == \'stripe\'">\n      <ion-list class="card-list">\n        <ion-item class="card-detail">\n          <form>\n            <ion-row>\n              <ion-col class="no-padd">\n                <ion-item class="card-item">\n                  <ion-input type="number" placeholder="Card number" [(ngModel)]="cardDetails.cardNumber" name="cardNumber"></ion-input>\n                </ion-item>\n              </ion-col>\n            </ion-row>\n            <ion-row style="border-bottom: 1px solid #ccc;">\n              <ion-col width-67 class="no-padd">\n                <ion-item class="card-item date">\n                  <ion-datetime class="expiry-date" min="2017" max="2030-10-20" placeholder="MM/YY" displayFormat="MM/YY" name="expiryDate" [(ngModel)]="cardDetails.expiryDate"></ion-datetime>\n                </ion-item>\n              </ion-col>\n              <ion-col width-33 class="no-padd">\n                <ion-item class="card-item cvv">\n                  <ion-input type="number" placeholder="CVV" [(ngModel)]="cardDetails.cvv" name="cvv"></ion-input>\n                </ion-item>\n              </ion-col>\n            </ion-row>\n          </form>\n        </ion-item>\n      </ion-list>\n    </ion-row>\n\n    <!-- Checkout and Pay -->\n    <button [disabled]="disabledCheckout" full ion-button (click)="checkoutAndPay()">Checkout and Pay</button>\n\n    <!--<button class="checkOut-btn" ion-button block type="submit" [disabled]="!f.valid">\n      <ion-icon ios="ios-cart" md="md-cart"></ion-icon>\n      &nbsp;&nbsp;{{"Check Out" | translate}}\n    </button>-->\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/checkout/checkout.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["a" /* PayPal */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_stripe__["a" /* Stripe */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ })

});
//# sourceMappingURL=16.main.js.map