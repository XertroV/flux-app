import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

var PouchDB = require('pouchdb');

@Injectable()
export class dataService {
	
    static get parameters() {
   		return [[Http]];
  	}

  	constructor(Http){
		this.http = Http;
		this.endpoint = 'https://api.voteflux.org/';//'http://flux-api-dev.herokuapp.com/';
		this.header = new Headers();
		this.header.append('Content-Type', 'application/json');
		//this.header.append('Access-Control-Allow-Origin', '*');
		//this.header.append('Access-Control-Allow-Methods', 'POST');
	}

	registerEmail(email, name){
		var api = 'api/v0/register/initial_email';
		var url = this.endpoint + api;
		var data = {};
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		data['email'] = email;
		data['fname'] = name;
		return this.http.post(url, JSON.stringify(data), { headers: headers })
				.map(response => response.json())
				.subscribe(response => console.log('response', response),
							err => console.log('error', err));
	}

	getUser(secret){
		var api = 'api/v0/user_details';
		var url = this.endpoint + api;
		return this.http.post(url, JSON.stringify({'s': secret}), { headers: this.header })
				.map(response => response.json())
				.subscribe(response => console.log('response', response),
							err => console.log('error', err));
	}

}