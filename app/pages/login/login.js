import {Page, NavController, Alert, Platform} from 'ionic-angular';

import { EmailTokenPage } from '../email-token/email-token';

import {BarcodeScanner} from 'ionic-native';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [Platform]];
  }

  constructor(nav, platform) {
    this.nav = nav;
    this.platform = platform;
    
  }

  emailCode() {
    this.nav.push(EmailTokenPage);
  }

  scan() {
    BarcodeScanner.scan().then((result) => {
       // Success! Barcode data is here
       this.nav.present(Alert.create({
          title: "Scan Results",
          subTitle: result.text,
          buttons: ["Close"]
        }));
      }, (error) => {
          // An error occurred
        this.nav.present(Alert.create({
          title: "Attention!",
          subTitle: error,
          buttons: ["Close"]
        }));
      });
  }


}
