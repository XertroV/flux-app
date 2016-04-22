import {Injectable} from 'angular2/core';

Injectable()
export class Util {
  static get parameters() {
 		return [];
	}

  constructor(){}

  api(path){
    var debug = true;
    if (path.slice(-1) == '/')
      path = path.slice(0,-1);
    if (debug){
      return 'http://flux-api-dev.herokuapp.com/' + path;
    } else {
      return 'https://api.voteflux.org/' + path;
    }
  }

  getFirstName(name){
    var arr = name.split(' ');
    return arr[0];
  }

  getSurname(name){
    var arr = name.split(' ');
    if(arr.length > 1){
      return arr[arr.length - 1];
    } else {
      return '';
    }
  }

  getMiddleNames(name){
    var arr = name.split(' ');
    if(arr.length > 2){
      var mname = '';
      for(var i = 1; i < arr.length - 2; i++){
        mname += arr[i]+' ';
      }
      return mname;
    } else {
      return '';
    }
  }

}