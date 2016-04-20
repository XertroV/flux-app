import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

import { Page, Loading, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

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
    // this.setLoading();
    this.loadInfo();
    this.nav.push(LoginPage);

    this.info = {
      n_members: 1500,
    }
  }

  setLoading(){
    this.loading = Loading.create({
      content: "Loading Flux Details...",
      showBackdrop: true,
      // dismissOnPageChange: true
    });
    this.nav.present(this.loading);
  }

  loadInfo(){
    // this.http.get('https://api.voteflux.org/getinfo')
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     this.info = data;
    //     this.loading.dismiss();
    //     this.nav.push(LoginPage);
    //   });
  }

  beginSignup(){
    console.log("beginSignup()");
  }

  beginLogin(){
    console.log("beginLogin()");
    this.nav.push(LoginPage);
    console.log("pushedLoginPage");
  }
}