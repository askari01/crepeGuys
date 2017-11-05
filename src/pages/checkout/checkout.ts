import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database'

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {
  date: any;
  orderId: any;
  tagHide1: boolean = true;
  tagHide2: boolean = true;
  cart: Array<any>;
  grandTotal: any;
  order: any = {};
  address: any = {};
  cardDetails: any = {};
  cod: any;
  userId: any;
  userDetails = {
    email: '',
    name: '',
    mobileNo: '',
    userid: ''
  };
  checkoutInfo: '';
  checkout: FirebaseListObservable<any>;
  userDetail: FirebaseObjectObservable<any>;
  bookings: FirebaseObjectObservable<any>;
  business: FirebaseObjectObservable<any>;
  color: any
  str: any

  delivery_addresses: FirebaseListObservable<any>;

  paymentMethod: string = 'paypal';
  disabledCheckout: boolean = false;

  constructor(public af: AngularFireAuth,
              public db: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              private payPal: PayPal,
              private stripe: Stripe) {

    this.stripe.setPublishableKey('pk_live_sOPGKgLK99qWMjmw4pncjctr');
    //this.stripe.setPublishableKey('pk_test_P37lCBBdJpL8YKHAadof6rsv');

    this.cardDetails = this.getCardData();
    this.str = '#';
    var num = Math.floor(Math.random() * 900000) + 100000;
    this.color = this.str.concat(num);
      if (this.af.auth.currentUser) {
        this.userId =this.af.auth.currentUser.uid;
      }
    this.grandTotal = this.navParams.get('grandTotal');
    this.userDetail = this.db.object('/users/' + this.userId);
    this.userDetail.subscribe((res) => {
      this.userDetails = {
        email: res.email,
        name: res.name,
        mobileNo: res.mobileNo,
        userid: this.userId
      };

    });
    this.cart = JSON.parse(localStorage.getItem('Cart'));
    this.checkout = db.list('/orders');

    this.order.cod = 'cod';

    // Get CheckoutInfo and DeliveryRange
    this.db.object('/business').subscribe((res) => {
      this.checkoutInfo = res.checkoutInfo;
    });

    // default address params
    this.orderId = Date.now();
    let today: Date = new Date();
    today.setDate(today.getDate() + 1);
    this.address.delivery_day = today.toISOString();
    this.address.delivery_time = '08:00';
    this.delivery_addresses = db.list('/delivery_addresses');
  }


  onCheckOut(form: NgForm) {
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
  }


  toggle2() {
    this.order.cod = '';
    this.tagHide2 = this.tagHide2 ? false : true;
  }

  toggle3() {
    this.tagHide2 = true;
    this.order.cod = 'cod';
  }

  checkoutAndPay() {
    const delivery_day: any = new Date(this.address.delivery_day);
    const delivery_time: any = this.address.delivery_time.split(':');
    const delivery_date: any = new Date(delivery_day.getFullYear(), delivery_day.getMonth(), delivery_day.getDate(), delivery_time[0], delivery_time[1], 0);

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

      this.payWithPaypal(this.order.grandTotal, 'USD', '#ORDER_'+this.orderId)
      .then((data: any) => {
        console.log("Success Paypal", data);
        this.order.payment_id = data.response.id;
        this.checkout.push(this.order);
        this.navCtrl.push("ThankyouPage");
      })
      .catch((err) => {
        console.log("Err Paypal", err);
      });

    } if (this.paymentMethod == 'stripe') {
      this.order.payment_method = 'STRIPE';
      if (!this.cardDetails.expiryDate || !this.cardDetails.cardNumber || !this.cardDetails.cvv) return;

      let expiryDate = this.cardDetails.expiryDate.split('-');

      let card = {
        number: this.cardDetails.cardNumber,
        expMonth: expiryDate[1],
        expYear: expiryDate[0],
        cvc: this.cardDetails.cvv
      };

      console.log(card);

      this.disabledCheckout = true;
      this.stripe.createCardToken(card)
      .then(token => {
        this.disabledCheckout = false;
        this.saveCardData(this.cardDetails);
        console.log(token.id);
        this.order.stripe_token = token.id;
        this.order.stripe_amount = Math.trunc(this.order.grandTotal*100);
        this.checkout.push(this.order);
        this.navCtrl.push("ThankyouPage");
      })
      .catch(error => {
        this.disabledCheckout = false;
        console.error(error);
      });
    }
  }

  payWithPaypal(amount: string, currency: string, description?: string) {
    return new Promise((resolve, reject) => {
      this.payPal.init({
        PayPalEnvironmentProduction: 'AbmCyyZwAaWg68hxY7gzQ6h0oI7FnaLzkzNAx03Sd4BtH6ablou8CphlJKvgt0kYG5jlIandG4wjcxVM',
        PayPalEnvironmentSandbox: ''
      }).then(() => {
        this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
          acceptCreditCards: false
        })).then(() => {
          let payment = new PayPalPayment(amount, currency, description, 'sale');

          this.payPal.renderSinglePaymentUI(payment).then((res) => {
            resolve(res);
          }, () => {});
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    }); 
  }

  private saveCardData(card) {
    localStorage.setItem('card', JSON.stringify(card));
  }

  private getCardData() {
    let card = {};
    try {
      card = JSON.parse(localStorage.getItem('card'));
    } catch(err) {
      card = {};
    }

    if (card == null) { 
      card = {};
    }

    return card;
  }

}
