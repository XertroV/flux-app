import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

import { Page, Loading, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup'

console.log('loaded flux hello js');

@Page({
  templateUrl: 'build/pages/hello-flux/hello-flux.html'
})
export class HelloFluxPage {
  static get parameters(){
    return [[Http], [NavController]];
  }

  constructor(http, nav) {
    this.http = http;
    this.nav = nav;
  }

  beginSignup(){
    console.log("beginSignup()");
    this.nav.push(SignupPage);
  }

  beginLogin(){
    console.log("beginLogin()");
    this.nav.push(LoginPage);
    console.log("pushedLoginPage");
  }
}