import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }
  storeCustomerDataAsObject(customerData:any){
    localStorage.setItem(customerData,JSON.stringify(customerData))

  }
  getUserId(){
    let id: any =localStorage.getItem('CustomerID')
     
     return JSON.parse(id)

  }
  getPassword(){
    return localStorage.getItem('pwd')
  }
  getOregenalPassword(){
    return localStorage.getItem('or-pwd')

  }
  getEmail(){
    let email : any =  localStorage.getItem('Email')
    return JSON.parse(email)
  }
  getName(){
    let name : any =  localStorage.getItem('EName')
    return JSON.parse(name)
  }
  getPhone(){
    let phone : any =  localStorage.getItem('PhoneNo')
    return JSON.parse(phone)
  }
  getDOB(){
    let dob :any = localStorage.getItem('DOB')
    return JSON.parse(dob)
  }
  getCountryCode(){
    let countryCode :any = localStorage.getItem('CountryCode')
    return JSON.parse(countryCode)
  }
  getSendingCurrency(){
    let Currency :any = localStorage.getItem('Currency')
    return JSON.parse(Currency)
  }
  getCountryID(){
    let countryID :any = localStorage.getItem('CountryID')
    return JSON.parse(countryID)
  }
  setuserPassword(Password:string){
     localStorage.setItem('pwd', Password)
    
  }
  setOregenalPassword(oreginalPassword:string){

    localStorage.setItem('or-pwd', oreginalPassword)

  }
  setuserEmail(Email:string){
    localStorage.setItem('Email', Email)
   
 }
  getUserAddress(){
    let address : any =  localStorage.getItem('Address')
    return JSON.parse(address)
  }
  getUserCountry(){
    let country : any =  localStorage.getItem('CountryName')
    return JSON.parse(country)

  }
  getUserTown(){
    let town : any =  localStorage.getItem('Town')
    return JSON.parse(town)

  }
  setRXCountries(countries:any){
    localStorage.setItem('receiverCountries', JSON.stringify(countries))
  }
  getRXCountries(){
    let countries :any =  localStorage.getItem('receiverCountries')
    return JSON.parse(countries)

  }
  setOrigenatorCountries(sendingCountries:any){

    localStorage.setItem('sendingCountries', JSON.stringify(sendingCountries))
  }
  getOrigenatorCountries(){
    let sendingcountries :any =  localStorage.getItem('sendingCountries')
    return JSON.parse(sendingcountries)

  }
  setPuropsOfTransaction(purops:any){
    localStorage.setItem('purposOfTransactionList', JSON.stringify(purops))

  }
  getPuropsOfTransaction(){
    let purposList :any =  localStorage.getItem('purposOfTransactionList')
    return JSON.parse(purposList)

  }
  setNationality(nationalites:any){
    localStorage.setItem('nationalityList', JSON.stringify(nationalites))

  }
  getNationality(){
    let nat :any =  localStorage.getItem('nationalityList')
    return JSON.parse(nat)

  }
  setSudaneseBank(sudaneseBank:any){
    localStorage.setItem('sudaneseBank', JSON.stringify(sudaneseBank))


  }
  getSudaneseBank(){
    let banks :any =  localStorage.getItem('sudaneseBank')
    return JSON.parse(banks)

  }
  setbankAccountType(bankAcountType:any){
    localStorage.setItem('bankAcountTypeList', JSON.stringify(bankAcountType))
  }
  getbankAccountType(){
    let acoountTypeList :any =  localStorage.getItem('bankAcountTypeList')
    return JSON.parse(acoountTypeList)

  }
  // update local Storage with new data
  updateCustomerData(lable:string,newCustomerData:string){
    localStorage.setItem(lable,JSON.stringify(newCustomerData))
  }

  storeCustomerDataInLocalStorage(customerData:any){
    Object.entries(customerData).forEach(
        
      ([key, value]) =>  {
        
        localStorage.setItem(key,JSON.stringify(value))
                        }

    )

  }
    

}
