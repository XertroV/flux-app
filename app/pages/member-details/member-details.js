import {Page, NavController} from 'ionic-angular';
import {DatePicker} from 'ionic-native';

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
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.fname = '';
    this.mname = '';
    this.sname = '';
    this.onRoll = '';
    this.email = '';
    this.country = '';
    this.postcode = '';
    this.suburb = '';
    this.street = '';
    this.note = '';
    this.dob = '';
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
