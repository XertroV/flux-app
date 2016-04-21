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
		this.endpoint = 'http://flux-api-dev.herokuapp.com/';
	}

	registerEmail(email, name){
		var api = 'api/v0/register/initial_email';
		var url = this.endpoint + api;
		var data = {};
		data.email = email;
		data.fname = name;
		console.log('data', JSON.stringify(data));
		return this.http.post(url, JSON.stringify(data))
				.map(response => response.json())
				.subscribe(response => console.log(response),
							err => console.log(err));
	}

}