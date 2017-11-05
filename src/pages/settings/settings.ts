import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database'
import {TranslateService} from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
  user: any = {}
  url: any = '';
  value: any;
  options = [
    {
      "language": "ENGLISH",
      "value": "en"
    },
    {
      "language": "FRENCH",
      "value": "fr"
    }
  ];

  constructor(public af: AngularFireAuth,
              public db:AngularFireDatabase,
              public navCtrl: NavController,
              public translate: TranslateService) {
    this.value = "en"
    this.translate.setDefaultLang('en');
        if (this.af.auth.currentUser) {
          this.db.object('/users/' + this.af.auth.currentUser.uid).subscribe(res => {
            this.user = res;
            console.log(this.user);
          })
        }

  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  changeLanguage() {
    console.log("language is -" + this.value);
    if (this.value == 'fr') {
      this.translate.use('fr');
    }
    else {
      this.translate.use('en');
    }

  }


  onSubmit(user: NgForm) {
    
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
        })
      }
   }
}

