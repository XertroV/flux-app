import {Page, NavController, Alert} from 'ionic-angular';
import {dataService} from '../../services/dataService';

import {MemberDetailsPage} from '../member-details/member-details';

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
  }

  saveUser(){
    this.ds.saveUser()
  }

  onSendEmail(){
    //send email link to token secret
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
