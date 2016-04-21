import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

var PouchDB = require('pouchdb');

@Injectable()
export class dataService {
	
    static get parameters() {
   		return [[Http]];
  	}

  	constructor(Http){
		this.http = Http;
	}

}