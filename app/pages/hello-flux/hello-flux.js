import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

import { Page, Loading, NavController, Alert } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { Util } from '../../aux';


@Page({
  templateUrl: 'build/pages/hello-flux/hello-flux.html'
})
export class HelloFluxPage {
  static get parameters(){
    return [[Http], [NavController], [Util]];
  }

  constructor(http, nav, util) {
    this.http = http;
    this.nav = nav;
    this.util = util;
    console.log('test');
  }

  beginSignup(){
    console.log("beginSignup()");
    this.nav.push(SignupPage);
  }

  beginLogin(){
    console.log(this.util.api('test'));
    console.log("beginLogin()");
    this.nav.push(LoginPage);
    console.log("pushedLoginPage");
  }

   showAlert(title, subTitle){
    let alert = Alert.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }
}