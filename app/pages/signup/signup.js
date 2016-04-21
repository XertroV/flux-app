import {Page, NavController} from 'ionic-angular';

import {MemberDetailsPage} from '../member-details/member-details';

@Page({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.email = '';
    this.fname = '';
  }

  onSubmit(){
  	//submit to API
  	this.nav.push(MemberDetailsPage);
  }

}
