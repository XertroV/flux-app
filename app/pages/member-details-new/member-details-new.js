import {Page, NavController} from 'ionic-angular';
import {DatePicker} from 'ionic-native';

/*
  this is placeholder for the new data schema;
*/
@Page({
  templateUrl: 'build/pages/member-details-new/member-details-new.html',
})
export class MemberDetailsNewPage {
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
