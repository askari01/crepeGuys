import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database'
import { EmailComposer } from '@ionic-native/email-composer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[EmailComposer]
})
export class ContactPage implements OnInit {

  uid: string;
  private contactForm: FormGroup;

  constructor(public afAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public emailComposer: EmailComposer,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private translateService: TranslateService) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, CustomValidators.email])],
      message: ['', Validators.required]
    });

    this.afAuth.authState.subscribe(state => {
      if (state && state.uid) this.uid = state.uid;
    });
  }

  submitForm() {
    const data = this.contactForm.value;

    this.sendMail(data);

    // this.translateService.get('Message sent').subscribe(text => {
    //   this.showToast(text);
    // });
  }

  sendMail(data) {
    if (this.uid) {
      data.userId = this.uid;
    }
    this.db.list('/contact').push(data);

    const compose = {
      to: 'sale@crepeguys.com',
      subject: data.name,
      body: data.message,
      isHtml: true
    };

    this.emailComposer.open(compose, () => {
      console.log('email view dismissed');
    });
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

}
