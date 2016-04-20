import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the MemberDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/member-details/member-details.html',
})
export class MemberDetailsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
