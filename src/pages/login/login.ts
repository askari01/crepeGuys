import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, Platform, ToastController} from 'ionic-angular';
import {CustomValidators} from 'ng2-validation';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database'
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TranslateService } from 'ng2-translate';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[Facebook,GooglePlus,TwitterConnect]
})
export class LoginPage {
  tagHide: boolean = true;
  valForm: FormGroup;

  constructor(public navCtrl: NavController,
              public fb: FormBuilder,
              public af: AngularFireAuth,
              public db: AngularFireDatabase,
              public facebook:Facebook,
              public googlePlus:GooglePlus,
              public loadingCtrl:LoadingController,
              public twitter:TwitterConnect,
              public platform:Platform,
              public toastCtrl: ToastController,
              private translateService: TranslateService) {

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required]
    });

  }

  toggleRegister() {
    this.tagHide = this.tagHide ? false : true;
  }

  OnLogin($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {

      this.af.auth.signInWithEmailAndPassword(value.email, value.password).then((success) => {
        localStorage.setItem('uid', success.uid);
        this.navCtrl.push("HomePage");
      })
      .catch((error) => {
        this.translateService.get('Please check all fields').subscribe(text => {
          this.showToast(text);
        });
      });

    }
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  doFbLogin() {
    let permissions = new Array();
    permissions = ["public_profile", "email", "user_education_history"];

    this.facebook.login(permissions)
      .then((success) => {
        console.log("facebook Success response->" + JSON.stringify(success));
       this.facebook.api("/me?fields=id,name,email,gender,first_name,last_name", permissions).then((user) => {
          console.log("user details" + JSON.stringify(user));
          console.log("access token-" + JSON.stringify(success.authResponse.accessToken));
          var provider = firebase.auth.FacebookAuthProvider.credential(success.authResponse.accessToken);

          firebase.auth().signInWithCredential(provider)
            .then((response) => {
              console.log("Firebase -fb success: " + JSON.stringify(response));
              this.db.object('/users/' + response.uid).update({
                name: response.displayName,
                email: response.email,
                role: 'User'
              });
              localStorage.setItem('uid', response.uid);
              this.navCtrl.push("HomePage");
            })
            .catch((error) => {
              console.log("Firebase failure:--- " + JSON.stringify(error));
            });

        }),
          (error) => {
            console.log(JSON.stringify(error));
            console.log('FAcebook not responding!');

          }

      }, error => {
        console.log("FaceBook ERROR : ", JSON.stringify(error));
      })
  }

  googleLogin() {
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '164935859218-0jlgn5jj6l5nml4lrchpmi7pquvihn09.apps.googleusercontent.com',
      'offline': true
    })
      .then((success) => {
          //console.log("you have been successfully logged in by googlePlus!" + JSON.stringify(success));
          let loading = this.loadingCtrl.create({
            content: 'Login Please Wait...'
          });
          loading.present();
          var provider = firebase.auth.GoogleAuthProvider.credential(success.idToken);

          firebase.auth().signInWithCredential(provider)
            .then((response) => {
              //console.log("Firebase -G success: " + JSON.stringify(response));
              this.db.object('/users/' + response.uid).update({
                name: response.displayName,
                email: response.email,
                role: 'User'
              });
              localStorage.setItem('uid', response.uid);
              loading.dismiss();
              this.navCtrl.push("HomePage");
            })
            .catch((error) => {
              console.log("Firebase failure:--- " + JSON.stringify(error));
            });
        },
        (error) => {
          console.log('error--' + JSON.stringify(error));

        })
  }
  twitterLogin(){
     this.platform.ready().then((res) => {
       if(res == 'cordova'){
    this.twitter.login().then((result)=> {
      console.log("twitter res--"+JSON.stringify(result));
   
      this.twitter.showUser().then((user)=>{
        //console.log("user--"+JSON.stringify(user));
         let loading = this.loadingCtrl.create({
            content: 'Login Please Wait...'
          });
          loading.present();

        var provider = firebase.auth.TwitterAuthProvider.credential(result.token,result.secret);

         firebase.auth().signInWithCredential(provider)
            .then((response) => {
              console.log("Firebase -G success: " + JSON.stringify(response));
              this.db.object('/users/' + response.uid).update({
                name: response.displayName,
                email: response.email,
                role: 'User'
              });
              localStorage.setItem('uid', response.uid);
              loading.dismiss();
              this.navCtrl.push("HomePage");
            })
            .catch((error) => {
              console.log("Firebase failure:--- " + JSON.stringify(error));
            });
      },
      (onError)=>{
      console.log("user--"+JSON.stringify(onError));
      }
      )
    })
  }}
  )
  }

 Register() {
    this.navCtrl.setRoot("RegistrationPage");
  }
}
