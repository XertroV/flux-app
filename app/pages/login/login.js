import {Page, NavController, Alert, Platform} from 'ionic-angular';

import { EmailTokenPage } from '../email-token/email-token';

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
    
    this.emailCode();
  }

  emailCode() {
    this.nav.push(EmailTokenPage);
  }

  scan() {
    console.log(this);
    if(cordova){
      cordova.plugins.barcodeScanner.scan((result) => {
        this.nav.present(Alert.create({
          title: "Scan Results",
          subTitle: result.text,
          buttons: ["Close"]
        }));
      }, (error) => {
        this.nav.present(Alert.create({
          title: "Attention!",
          subTitle: error,
          buttons: ["Close"]
        }));
      });
    }
  }
}
