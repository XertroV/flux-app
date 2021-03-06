import {Page, NavController, Alert} from 'ionic-angular';
import {DatePicker} from 'ionic-native';

import {dataService} from '../../services/dataService';

import {Network} from 'ionic-native';

import {NgZone} from 'angular2/core';

import {HelloFluxPage} from '../hello-flux/hello-flux';

import {User} from '../../models/user';
import {Util} from '../../aux';

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
    return [[NavController], [dataService], [Util], [NgZone]];
  }

  constructor(nav, ds, util, zone) {
    this.nav = nav;
    this.ds = ds;
    this.util = util;
    this.zone = zone;

    if(localStorage.secret !== undefined){
      this.ds.getUser(localStorage.secret)
        .then((res) =>{
          //check what type of result we're getting
          //if complete object, dob should be defined
          if(res.dob !== undefined){
            console.log('constructor res ', res);
            console.log('constructor res.sname ', res.sname);
            this.address = res.address;
            this.contact_number = res.contact_number;
            this.dob = res.dob.toString();
            this.dobDay = res.dobDay;
            this.dobMonth = res.dobMonth;
            this.dobYear = res.dobYear;
            this.email = res.email;
            this.onAECRoll = res.onAECRoll;
            this.member_comment = res.member_comment;
            this.referred_by = res.referred_by;
            console.log('constructors this ', this);
            //split older style names
            if(res.fname === undefined && res.name !== undefined){
              this.fname = this.util.getFirstName(res.name);
            } else {
              this.fname = res.fname;
            }
            if(res.mnames === undefined && res.name !== undefined){
              this.mnames = this.util.getMiddleNames(res.name);
            } else {
              this.mnames = res.mnames;
            }
            if(res.sname === undefined && res.name !== undefined){
              this.sname = this.util.getSurname(res.name);
            } else {
              this.sname = res.sname;
            }
          } else {
            //this should hit when the user comes from the initial signup pg
            this.address = '';
            this.contact_number = '';
            this.dob = '';
            this.dobDay = '';
            this.dobMonth = '';
            this.dobYear = '';
            this.email = res.email;
            this.fname = res.fname;
            this.mnames = '';
            this.sname = '';
            this.onAECRoll = '';
            this.member_comment = '';
            this.referred_by = '';
          }  
        });
    } else {
      //for all other occasions
      this.address = '';
      this.contact_number = '';
      this.dob = '';
      this.dobDay = '';
      this.dobMonth = '';
      this.dobYear = '';
      this.email = '';
      this.fname = '';
      this.mnames = '';
      this.sname = '';
      this.onAECRoll = '';
      this.member_comment = '';
      this.referred_by = '';
    }
    
  }

  selectDate(){
    DatePicker.show({
      date: new Date(),
      mode: 'date'
    }).then(
      date => this.dob = date.toString(),
      err => console.log("Error occurred while getting date:", err)
    );
  }

  onSubmit(){
    if(Network.connection !== 'none'){
        //todo - validate data
      console.log('sname onSubmit: ', this.sname);
      var user = new User();
      user.address = this.address;
      user.contact_number = this.contact_number;
      user.dob = this.dob; //turn into an object
      user.dobDay = this.dobDay;
      user.dobMonth = this.dobMonth;
      user.dobYear = this.dobYear;
      user.email = this.email;
      user.fname = this.fname;
      user.mnames = this.mnames;
      user.sname = this.sname;
      user.onAECRoll = this.onAECRoll;
      user.member_comment = this.member_comment;
      user.referred_by = this.referred_by;
      user.s = localStorage.secret;

      //submit to flux api
      this.ds.updateUser(user)
        .then((res) => {
            console.log('updateUser res: ', res);
            this.refreshUser();
            this.showAlert('Details Updated', 'Your details have been successfully updated');
        })
        .catch((err) => console.log('updateUser err: ', err))
    } else {
      this.showAlert('No Network', 'You must be connected to the internet to proceed');
    }
  }

  onRevoke(){
    //give warning confirmation dialog
    //do revocation
    //delete localStorage secret
    let confirm = Alert.create({
      title: 'Confirm Revocation',
      message: 'Do you agree to revoke your membership?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
          if(Network.connection !== 'none'){
            this.ds.deleteUser(localStorage.secret)
              .then((res) => {
                  console.log('result', res);
                  localStorage.secret = undefined;
                  this.nav.push(HelloFluxPage);
              })
              .catch((err) => console.log('error', err));
            } else {
              this.showAlert('No Network', 'You must be connected to the internet to proceed');
            }
        }
      }
      ]
    });
    this.nav.present(confirm);
  }

  showAlert(title, subTitle){
    let alert = Alert.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  //this is supposed to be a scope apply type func, doesn't seem to do what we want it to :(
  refreshUser(){
    this.ds.getUser(localStorage.secret)
        .then((res) =>{
          //ngzone update fields
          console.log('zone', this.zone);
          this.zone.run(() => {
                console.log('ngzone res object', res);
                this.address = res.address;
                this.contact_number = res.contact_number;
                this.dob = res.dob;
                this.dobDay = res.dobDay;
                this.dobMonth = res.dobMonth;
                this.dobYear = res.dobYear;
                this.email = res.email;
                this.fname = res.fname;
                this.mnames = res.mnames;
                this.sname = res.sname;
                this.onAECRoll = res.onAECRoll;
                this.member_comment = res.member_comment;
                this.referred_by = res.referred_by;   
            });
        });
  }


}
