import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Util} from '../aux';

var PouchDB = require('pouchdb');

@Injectable()
export class dataService {

  static get parameters() {
 		return [[Http], [Util]];
	}

	constructor(http, util){
		this.http = http;
		this.endpoint = 'http://flux-api-dev.herokuapp.com/';
		this.header = new Headers();
		this.header.append('Content-Type', 'application/json');
		//this.header.append('Access-Control-Allow-Origin', '*');
		//this.header.append('Access-Control-Allow-Methods', 'POST');
		this.util = util;
	}

	registerEmail(email, name){
		var url = this.util.api('api/v0/register/initial_email');
		var data = {};
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		data['email'] = email;
		data['fname'] = name;
		var promise = new Promise((resolve, reject) => {
			this.http.post(url, JSON.stringify(data), { headers: headers })
				.map(response => response.json())
				.subscribe(response => resolve(response),
                        		err => reject(err));
		});
		return promise;
	}


	//takes user object, returns promise
	registerUser(user){
		var url = this.util.api('api/v0/register/all_at_once');
		var promise = new Promise((resolve, reject) => {
			this.http.post(url, JSON.stringify(user), {headers: this.header})
				.map(response => response.json())
				.subscribe(response => resolve(response),
							err => reject(err));
		});
		return promise;
	}

	getUser(secret){
		console.log("getUser with secret " + secret);
		var url = this.util.api('api/v0/user_details');
		var promise = new Promise((resolve, reject) => {
			this.http.post(url, JSON.stringify({'s': secret}), { headers: this.header })
				.map(response => response.json())
				.subscribe(response => resolve(response),
                        		err => reject(err));
		});
		return promise;
	}

	saveUser(){
		// create function, do nothing atm
	}
}