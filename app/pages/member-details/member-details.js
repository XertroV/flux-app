import {Page, NavController} from 'ionic-angular';
import {DatePicker} from 'ionic-native';

import {dataService} from '../../services/dataService';

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
          this.dob = res.dob;
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
    //do stuff
    //validate data
    //submit to flux api
  }

  onRevoke(){
    //give warning confirmation dialog
    //do revocation
  }


}
