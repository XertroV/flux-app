import {Page, NavController} from 'ionic-angular';

import {MemberDetailsPage} from '../member-details/member-details';
import {dataService} from '../../services/dataService';

@Page({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  static get parameters() {
    return [[NavController], [dataService]];
  }

  constructor(nav, ds) {
    this.nav = nav;
    this.ds = ds;
    this.email = '';
    this.fname = '';
  }

  onSubmit(){
  	//submit to API
  	if(this.email.length > 0 && this.fname.length > 0){
  		var user = this.ds.registerEmail(this.email, this.fname);
  		console.log('user', user);
  		this.nav.push(MemberDetailsPage);
  	} else {
  		//show alert - enter details to proceed
  	}
  	
  }

}
