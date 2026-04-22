import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = '';
  constructor(private _http: HttpClient) { 
    
  }
  // contactUs(contactFormData){
  //   this._http.post<any>(this.url , contactFormData)

  // }
}
