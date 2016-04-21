import {Page, NavController, Loading} from 'ionic-angular';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

import {util} from '../../aux/util';

/*
  Generated class for the StatsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Page({
  templateUrl: 'build/pages/stats/stats.html',
})
export class StatsPage {
  static get parameters() {
    return [[NavController], [Http]];
  }

  constructor(nav, http) {
    this.nav = nav;
    this.http = http;

    this.info = {
      n_members: 1500,
    }

    this.loadInfo();
  }

  setLoading(){
    this.loading = Loading.create({
      content: "Loading Flux Stats...",
      showBackdrop: true,
      // dismissOnPageChange: true
    });
    this.nav.present(this.loading);
  }

  loadInfo(){
    this.setLoading();
    this.http.get(util.api('getinfo'))
      .map(res => res.json())
      .subscribe(data => {
        this.info = data;
        this.loading.dismiss();
      });
  }

}
