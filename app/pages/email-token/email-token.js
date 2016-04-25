import {Page, NavController, Alert} from 'ionic-angular';
import {dataService} from '../../services/dataService';

import {MemberDetailsPage} from '../member-details/member-details';

import {Network} from 'ionic-native';
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
    return [[NavController], [dataService]];
  }

  constructor(nav, ds) {
    this.nav = nav;
    this.ds = ds;
    this.token = '';
    this.email = '';
  }

  onLogin(){
    if(Network.connection !== 'none'){
      //this.ds.getUser returns a promise
      this.ds.getUser(this.token)
        .then((res) => {
          console.log('res', res);
          localStorage.secret = res.s;
          this.nav.push(MemberDetailsPage);
        })
        .catch((error) => {
          console.log('error', error);
          this.showAlert('Invalid Token', 'The token you entered is not valid');
        });
    } else {
      this.showAlert('No Network', 'You must be connected to the internet to proceed');
    }
  }

  onSendEmail(){
    if(Network.connection !== 'none'){
      //send email link to token secret
      this.ds.emailToken(this.email)
        .then((res) => {
          if(res.sent_email){
            this.showAlert('Email Sent', 'Please check your email for the token...');
          } else {
            //email not sent
            this.showAlert('Error', res.reason);
          }
        })
        //or no response
        .catch((err) => console.log(err));
      } else {
        this.showAlert('No Network', 'You must be connected to the internet to proceed');
      }
  }

  showAlert(title, subTitle){
    let alert = Alert.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    this.token = '';
    this.nav.present(alert);
  }

}
