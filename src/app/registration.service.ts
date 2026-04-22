import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private mainSerive : MainServiceService ) { }

  ngOnInit() {}
  countriesList(){
    return this.mainSerive.get([{'func':'24'}])
  }
  countriesRXList(){
    return this.mainSerive.get([{'func':'44'}])
  }
  gender(){
    return this.mainSerive.get([{'func':'61'}])
  } 
  
  occupations(){
    return this.mainSerive.get([{'func':'25'}])
  } 
  getVCode(mobileNumber : string){
    return this.mainSerive.get([{'func':'48','verMobileNo':mobileNumber}])

  }
}

