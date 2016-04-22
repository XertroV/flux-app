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
  		this.ds.registerEmail(this.email, this.fname)
  			.then((res) => {
  				console.log(res);
  				localStorage.secret = res.s;
  				this.nav.push(MemberDetailsPage);
  			})
  			.catch((err) => console.log('error', err))
  		
  	} else {
  		//show alert - enter details to proceed
  		this.showAlert('Invalid Details', 'Enter a valid name and email address to proceed');
  	}
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
