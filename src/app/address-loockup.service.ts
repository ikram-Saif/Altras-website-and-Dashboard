import { Injectable } from '@angular/core';
import {HttpClient ,HttpParams , HttpHeaders } from '@angular/common/http'
import { LocalStorageService } from './local-storage.service';
import {MainServiceService} from './main-service.service'




@Injectable({
  providedIn: 'root'
})
export class AddressLoockupService {
  mainSerive: any;
  dob: any;
  phone: any;

  // url for find request to retraive match loockup with user query
  url_1 = 'https://api.craftyclicks.co.uk/address/1.1/find'
   // url for retraive request to return full address 
   url_2 = 'https://api.craftyclicks.co.uk/address/1.1/retrieve'

   key = 'bf0f9-003e9-4c537-00e33'


  constructor(private localStorageService: LocalStorageService , private _http: HttpClient) { }


  
  AddressSearch(searchQuery:string , resultId:string , countryCode:string){
    return this._http.get(this.url_1 ,{params: {'key':this.key , 'country': countryCode , 'query': searchQuery, id:resultId}})

  }
  getFullAdress(resultId:string , countryCode:string){
    return this._http.get(this.url_2 ,{params: {'key':this.key , 'country':countryCode , id:resultId}})
  }
  
}
