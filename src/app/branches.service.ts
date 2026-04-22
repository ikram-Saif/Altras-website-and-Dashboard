import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'


@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private mainSerive:MainServiceService) { }


  getPointsPaymentCountries(){
    return this.mainSerive.get([{'func':'71'}])

  }
  getPoientPaymentCountryDetails(countryCode:string){
    return this.mainSerive.get([{'func':'46','country':countryCode}])
  }
}
