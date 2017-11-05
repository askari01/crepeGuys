webpackJsonp([11],{

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orders__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersPageModule", function() { return OrdersPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OrdersPageModule = (function () {
    function OrdersPageModule() {
    }
    return OrdersPageModule;
}());
OrdersPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__orders__["a" /* OrdersPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__orders__["a" /* OrdersPage */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__orders__["a" /* OrdersPage */]
        ]
    })
], OrdersPageModule);

//# sourceMappingURL=orders.module.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrdersPage = (function () {
    function OrdersPage(af, db, navCtrl, loadingCtrl) {
        var _this = this;
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ordersDetails = [];
        if (this.af.auth.currentUser) {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait...",
            });
            loader_1.present().then(function () {
                var userID = _this.af.auth.currentUser.uid;
                _this.db.list('/orders', {
                    query: {
                        orderByChild: 'userId',
                        equalTo: userID,
                    }
                }).subscribe(function (response) {
                    _this.ordersDetails = response;
                    loader_1.dismiss();
                }, function (error) {
                    console.error(error);
                    loader_1.dismiss();
                });
            });
        }
    }
    OrdersPage.prototype.orderDetails = function (key, index) {
        //console.log(index+"----index");
        this.navCtrl.push("OrderDetailsPage", {
            orderId: key,
            index: index
        });
    };
    OrdersPage.prototype.isOrders = function () {
        if (this.ordersDetails.length == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    OrdersPage.prototype.navcart = function () {
        this.navCtrl.push("CartPage");
    };
    return OrdersPage;
}());
OrdersPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-orders',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/orders/orders.html"*/'<ion-header>\n  <ion-navbar color="primary" hideBackButton="true">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Orders</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="royal" (click)="navcart()">\n        <ion-icon name="cart"></ion-icon>\n        <ion-badge class="carts" item-right color="danger">{{noOfItems}}</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content [ngClass]="{bg:!isOrders()}">\n  <div *ngIf="!isOrders() ">\n    <ion-row>\n      <ion-icon class="empty-cart" name="timer" item-left></ion-icon>\n    </ion-row>\n    <h4>No Orders</h4>\n  </div>\n  <div *ngIf="isOrders()">\n    <ion-list class="orders-list">\n      <ion-card class="orders-item">\n        <ion-row *ngFor="let order of ordersDetails">\n          <ion-row *ngFor="let item of order.cart ; let i =index ">\n            <ion-col col-4>\n              <img src="{{item.item.thumb}}" alt="">\n            </ion-col>\n            <ion-col col-5>\n              <p class="item-name"><strong>{{item.item.title}}</strong></p>\n              <p class="item-price">${{item.item.price.value}}</p>\n              <p class="date">{{order.createdAt|date}}</p>\n            </ion-col>\n            <ion-col col-3>\n              <button class="btn-view" ion-button color="primary" (click)="orderDetails(order.$key,i)">\n                View\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-row>\n      </ion-card>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/orders/orders.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], OrdersPage);

//# sourceMappingURL=orders.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map