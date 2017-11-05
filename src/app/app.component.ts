import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, App} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {OneSignal} from '@ionic-native/onesignal';
import {SocialSharing} from '@ionic-native/social-sharing';

import { NewsDetailPage } from './../pages/news-detail/news-detail';

@Component({
  templateUrl: 'app.html',
  selector: 'MyApp',
  providers: [StatusBar, SplashScreen, OneSignal, SocialSharing]
})
export class MyApp {
  Cart: any = [];
  noOfItemsInCart: any;
  noOfItemsInFevrt: any;
  noOfItemsInNews: any;
  noOfItemsInOffer: any;
  userID: any;
  name: any;

  @ViewChild(Nav) nav: Nav;

  rootPage: string = "HomePage";


  constructor(public af: AngularFireAuth,
              public db: AngularFireDatabase,
              public platform: Platform,
              public statusbar: StatusBar,
              public splashscreen: SplashScreen,
              public socialSharing: SocialSharing,
              private oneSignal: OneSignal,
              public app: App) {
    this.platform.ready().then((res) => {
      this.initOneSignal();

      // this.openNews({
      //   notification: { 
      //     payload: {
      //       additionalData: {
      //         action: 'OPEN_NEWS',
      //         news_id: '-Kv53JNVrJWcK8vSc5Es'
      //       }
      //     }
      //   }
      // });

      this.Cart = JSON.parse(localStorage.getItem('Cart'));
      if (localStorage.getItem('Cart') != null) {
        this.noOfItemsInCart = this.Cart.length;
      }
      //fevrt


      //console.log(JSON.stringify(res));
      if (this.af.auth.currentUser) {
        this.userID = this.af.auth.currentUser.uid;
        db.object('/users/' + this.userID).subscribe(res => {
          this.name = res.name;
        });
        db.list('/users/' + this.userID + '/favourite').subscribe(res => {
          this.noOfItemsInFevrt = res.length;
        })
      }

      //offer
      db.list('/menuItems', {
        query: {
          orderByChild: 'offer',
          equalTo: true
        }
      }).subscribe(queriedItems => {
        this.noOfItemsInOffer = queriedItems.length;
      });
      //news
      db.list('/news').subscribe((res) => {
        this.noOfItemsInNews = res.length;
      })

    });
  }

  openPage(page) {
    // Reset the content nav to have ju
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  initOneSignal() {
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('063c584d-3db5-475e-b06f-39121f60f970', '724330746487');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.setSubscription(true);
      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // handle received here how you wish.
        //console.log("Onesginal handle", data);
      });
      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        // handle opened here how you wish.
        console.log("Onesginal handle", data);
        this.openNews(data);
      });
      this.oneSignal.endInit(); 
    }
  }

  home() {
    this.nav.setRoot("HomePage");
  }

  yourOrders() {
    this.nav.setRoot("OrdersPage");
  }

  addToCart() {
    this.nav.setRoot("CartPage");
  }

  catagory() {
    this.nav.setRoot("CategoryPage");
  }

  favourite() {
    this.nav.setRoot("FavouritePage");
  }

  offer() {
    this.nav.setRoot("OfferPage");
  }

  news() {
    this.nav.setRoot("NewsPage");
  }

  contact() {
    this.nav.setRoot("ContactPage");
  }

  aboutUs() {
    this.nav.setRoot("AboutUsPage");
  }

  settings() {
    this.nav.setRoot("Settings");
  }

  invite() {
    this.socialSharing.share("Share CrepeGuys restaurant with friends to get credits", null, null, 'http://www.crepeguys.com');
  }

  login() {
    this.nav.setRoot("LoginPage");
  }

  logout() {
    console.log("Log Out");
    this.af.auth.signOut();
    localStorage.removeItem('uid');
    this.nav.setRoot("LoginPage");
  }

  isLoggedin() {
    return localStorage.getItem('uid') != null;
  }

  openNews(data) {
    console.log(data);
    let additionalData: any = data && data.notification && data.notification.payload && data.notification.payload.additionalData;

    if (!additionalData || !additionalData.news_id) return;

    if (additionalData.action == 'OPEN_NEWS') {
      this.app.getRootNav().push(NewsDetailPage, {
        id: additionalData.news_id
      });
    }
  }

}
