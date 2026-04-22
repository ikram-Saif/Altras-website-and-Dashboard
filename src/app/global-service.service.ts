import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  countriesRx:any

  constructor(private mainSerive : MainServiceService , private localStorage: LocalStorageService ) { }

  user = this.localStorage.getEmail()
   password = this.localStorage.getPassword()
   

   ngOnInit(): void {
    
  }
  
  getpurposOfTransactionList(){
    
    this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'50'}])
    .subscribe((response:any) =>
              { 
                this.localStorage.setPuropsOfTransaction(response)
              },
              error => console.error('error' , error)


           )
  }
  getOriginatorCountries(){

    this.mainSerive.get([{'user':'1','func':'18'}])
    .subscribe((response:any) =>
              { 
                // console.log(response , 'origenator countries')
                this.localStorage.setOrigenatorCountries(response)
              },
              error => console.error('error' , error)

           )
  }
  

 getRXCountriesList(){
    this.mainSerive.get([{'func':'44'}])
    .subscribe(
       //response => console.log('successs',response),
      response => 
                {
                  this.localStorage.setRXCountries(response)
                  
                } ,
      error => console.error('error' , error)
      );
  }
  getCites(countryId:any){

        return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'6','counid':countryId}])
        
      
  }
  nationality(){
    
  this.mainSerive.get([{'func':'52'}])
    .subscribe(
      (response:any) => {this.localStorage.setNationality(response)} ,
      error => console.error('error' , error)
      );
  } 

  sudaneseBacnk(){

     this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'13'}])
    .subscribe(
      (response:any) => {
        this.localStorage.setSudaneseBank(response)} ,
      error => console.error('error' , error)
      );
  } 
  bankAccountType(){

    this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'45'}])
   .subscribe(
     (response:any) => {
       this.localStorage.setbankAccountType(response)} ,
     error => console.error('error' , error)
     );
 } 
 getDeleivaryMethod(){
   return [{name:'cash'},{name:'bank'}]
 }
 getCountryStateList(countryId: number){
  return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'53','counid':countryId}])

 }
 getDeliveryAddress(){
  return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'14'}])

 }
 getVCode(mobileNumber : string){
  return this.mainSerive.get([{'func':'48','verMobileNo':mobileNumber}])

}
getCountryCode(countryName:string , countryList:any){
  // console.log(natId)
  if(countryList.length > 0 )
  return countryList.find((country:any)=> country.Country == countryName).CountryCde
    
// console.log(countryList.find((country:any)=> country.Country == countryName).CountryCde)
}
getRXCountryCurrency(countryID:string , countryList:any){
  // console.log(natId)
  if(countryList.length > 0 )
  return countryList.find((country:any)=> country.CountryID == countryID).Currency
    
}

}
