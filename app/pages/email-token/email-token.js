import {Page, NavController} from 'ionic-angular';
import {dataService} from '../../services/dataService';

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
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

  }

  saveUser(){
    this.ds.saveUser()
  }

  onSendEmail(){
    //send email link to token secret
  }

}
