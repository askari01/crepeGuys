import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Nav, Platform} from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database'


@IonicPage()

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
  providers:[CallNumber,EmailComposer]
})

export class AboutUsPage {
 
 businessData: FirebaseObjectObservable<any>;
 business = {
        email: '',
        description: '',
        address: '',
        facebookLink: '',
        twitterLink: '',
        officeLocation: '',
        phoneNo: '',
        storeName: '',
        checkoutInfo: ''
    };

 @ViewChild(Slides) slides: Slides;
 @ViewChild(Nav) nav: Nav;
 contactNo:any='';
 email:string='';


  constructor(public af: AngularFireDatabase,
              public platform: Platform,
              public navCtrl: NavController,
              public callNumber:CallNumber,
              public navParams: NavParams,
              public emailComposer:EmailComposer) {

    this.businessData = af.object('/business');
        this.businessData.subscribe((res) => {
            this.business = res;
            this.contactNo = this.business.phoneNo;
            this.email = this.business.email;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');

  }


   goToSlide() {
    this.slides.slideTo(2, 500);
  }

  callUs(){

      this.callNumber.callNumber(this.contactNo, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

   gotogoogleMap() {
    this.navCtrl.push("LocationPage");
  }

   contact() {
    let email = {
      // You can change This Email to your own Email to receive contact Email.
      to: this.email,
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  openSocialLink(link) {
    console.log(link);
     window.open(link);
  }
}
