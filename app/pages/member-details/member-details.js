import {Page, NavController, Alert} from 'ionic-angular';
import {DatePicker} from 'ionic-native';

import {dataService} from '../../services/dataService';

import {User} from '../../models/user';

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
    return [[NavController], [dataService]];
  }

  constructor(nav, ds) {
    this.nav = nav;
    this.ds = ds;

    if(localStorage.secret != undefined){
      this.ds.getUser(localStorage.secret)
        .then((res) =>{
          this.address = res.address;
          this.contact_number = res.contact_number;
          this.dob = res.dob.toString();
          this.dobDay = res.dobDay;
          this.dobMonth = res.dobMonth;
          this.dobYear = res.dobYear;
          this.email = res.email;
          this.name = res.name;
          this.onAECRoll = res.onAECRoll;
          this.member_comment = res.member_comment;
          this.referred_by = res.referred_by;
        });
    } else {
      this.address = '';
      this.contact_number = '';
      this.dob = '';
      this.dobDay = '';
      this.dobMonth = '';
      this.dobYear = '';
      this.email = '';
      this.name = '';
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
    //todo - validate data
    var user = new User();
    user.address = this.address;
    user.contact_number = this.contact_number;
    user.dob = this.dob; //turn into an object
    user.dobDay = this.dobDay;
    user.dobMonth = this.dobMonth;
    user.dobYear = this.dobYear;
    user.email = this.email;
    user.name = this.name;
    user.onAECRoll = this.onAECRoll;
    user.member_comment = this.member_comment;
    user.referred_by = this.referred_by;
    user.s = localStorage.secret;

    //submit to flux api
    this.ds.updateUser(user)
      .then((res) => {
          console.log(res);
          this.showAlert('Details Updated', 'Your details have been successfully updated');
      })
      .catch((err) => console.log(err))
  }

  onRevoke(){
    //give warning confirmation dialog
    //do revocation
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
