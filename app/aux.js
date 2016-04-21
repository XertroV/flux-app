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
}