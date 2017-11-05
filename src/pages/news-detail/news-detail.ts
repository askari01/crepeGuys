import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database'


@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailPage implements OnInit {
  id: any;
  newsDetails: any = {};

  constructor(public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.af.object('/news/' + this.id).subscribe(res => {
      console.log('response', res);
      this.newsDetails = res;
    });
  }
}
