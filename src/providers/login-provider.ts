import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';

import { AlertController } from 'ionic-angular';


import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  data: any;
  
  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello LoginProvider Provider');
  }



  sendData(email: String, psw: String){
    let body = this.jsonToURLEncoded({ email: email, password: psw });
    let url = 'http://frontfree.localhost/api/app/guest/login';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
        
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.post(url,body,options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  //convert a json object to the url encoded format of key=value&anotherkye=anothervalue
  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return 'Customer[' + encodeURIComponent(key) + ']=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

}
