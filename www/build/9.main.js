webpackJsonp([9],{

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* Settings */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* Settings */]),
            __WEBPACK_IMPORTED_MODULE_3__app_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* Settings */]
        ]
    })
], SettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate__ = __webpack_require__(282);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Settings = (function () {
    function Settings(af, db, navCtrl, translate) {
        var _this = this;
        this.af = af;
        this.db = db;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.user = {};
        this.url = '';
        this.options = [
            {
                "language": "ENGLISH",
                "value": "en"
            },
            {
                "language": "FRENCH",
                "value": "fr"
            }
        ];
        this.value = "en";
        this.translate.setDefaultLang('en');
        if (this.af.auth.currentUser) {
            this.db.object('/users/' + this.af.auth.currentUser.uid).subscribe(function (res) {
                _this.user = res;
                console.log(_this.user);
            });
        }
    }
    Settings.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    Settings.prototype.changeLanguage = function () {
        console.log("language is -" + this.value);
        if (this.value == 'fr') {
            this.translate.use('fr');
        }
        else {
            this.translate.use('en');
        }
    };
    Settings.prototype.onSubmit = function (user) {
        this.user.card = (this.user.card != undefined) ? this.user.card : null;
        this.user.cvv = (this.user.cvv != undefined) ? this.user.cvv : null;
        this.user.cardName = (this.user.cardName != undefined) ? this.user.cardName : null;
        this.user.date = (this.user.date != undefined) ? this.user.date : null;
        this.user.notification = (this.user.notification != undefined) ? this.user.notification : null;
        if (this.af.auth.currentUser) {
            this.db.object('/users/' + this.af.auth.currentUser.uid).update({
                card: this.user.card,
                name: this.user.name,
                cvv: this.user.cvv,
                email: this.user.email,
                mobileNo: this.user.mobileNo,
                cardName: this.user.cardName,
                date: this.user.date,
                notification: this.user.notification,
            });
        }
    };
    return Settings;
}());
Settings = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{"Settings" |translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!-- <div class="login">\n    <ion-row [hidden]="url !=\'\'">\n      <img class="img" src="assets/img/profile.jpg"><br>\n    </ion-row>\n    <ion-row [hidden]="url ==\'\'">\n      <img class="img" [src]="url"><br>\n    </ion-row>\n    <ion-row>\n      <input type="file" name="file" id="file" class="inputfile"\n             (change)="readUrl($event)">\n      <label for="file" class="upload">\n        <ion-icon ios="ios-cloud-upload" md="md-cloud-upload"></ion-icon>\n      </label>\n    </ion-row>\n    <p class="name">{{user.name}}</p>\n    <p class="email">{{user.email}}</p>\n  </div> -->\n  <ion-list>\n    <ion-item>\n      <ion-label>{{Languages }}</ion-label>\n      <ion-select [(ngModel)]="value" (ionChange)="changeLanguage()">\n        <ion-option *ngFor="let option of options" value="{{option.value}}"> {{option.language }}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <form (ngSubmit)="onSubmit(f)" #f="ngForm">\n    <ion-list>\n      <ion-item *ngIf="user.notification == true">\n        <ion-label primary> Notifications</ion-label>\n        <ion-toggle primary checked="true" name="name" id="name"\n                    [(ngModel)]="user.notification"></ion-toggle>\n\n      </ion-item>\n      <ion-item *ngIf="user.notification == false">\n        <ion-label primary> Notifications</ion-label>\n        <ion-toggle primary checked="false" name="name" id="name"\n                    [(ngModel)]="user.notification"></ion-toggle>\n\n      </ion-item>\n      <!--card no-->\n      <ion-item>\n        <ion-label>User Name:</ion-label>\n        <ion-input type="text" name="name" id="name" placeholder="name"\n                   [(ngModel)]="user.name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Email:</ion-label>\n        <ion-input type="email" name="email" id="email" placeholder="email"\n                   [(ngModel)]="user.email"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Mobile Number:</ion-label>\n        <ion-input type="text" name="mobileNo" id="mobileNo" placeholder="mobileNo"\n                   [(ngModel)]="user.mobileNo"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Card Number:</ion-label>\n        <ion-input type="text" name="card" id="card" placeholder="5172628928"\n                   [(ngModel)]="user.card"></ion-input>\n      </ion-item>\n      <!--name on card-->\n      <ion-item>\n        <ion-label>Name on card:</ion-label>\n        <ion-input type="text" name="cardName" id="cardName" placeholder="Your card Name"\n                   [(ngModel)]="user.cardName"></ion-input>\n      </ion-item>\n      <!--cvv-->\n      <ion-item>\n        <ion-label>Cvv:</ion-label>\n        <ion-input type="number" name="cvv" id="cvv" placeholder="234"\n                   [(ngModel)]="user.cvv"></ion-input>\n      </ion-item>\n      <!--date-->\n      <ion-item>\n        <ion-label>Date of expiry:</ion-label>\n        <ion-input type="number" name="date" id="date" placeholder="25/06/2020"\n                   [(ngModel)]="user.date"></ion-input>\n      </ion-item>\n    </ion-list>\n    <!--button-->\n    <button class="login-btn" ion-button type="submit">Save</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/syedaskari/Downloads/crepeGuysApp/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["b" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ng2_translate__["a" /* TranslateService */]])
], Settings);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map