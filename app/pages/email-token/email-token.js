import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the EmailTokenPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/email-token/email-token.html',
})
export class EmailTokenPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
