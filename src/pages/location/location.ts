import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  title: string = 'My location ';
  lat: number = 39.1279177;
  lng: number = -84.5160307;
  zoom: number=12;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
