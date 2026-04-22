import { Component, OnInit } from '@angular/core';
import {DeliverAddressServiceService} from '../deliver-address-service.service'
import {FormBuilder , Validators ,ValidatorFn } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import {GlobalServiceService} from '../global-service.service'
@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {
  getRXCountriesList:any
  countryStateList: any = []
  stateCitiesList : any =[]
  deliveryAddress:any

  constructor(private deliveryAddressService : DeliverAddressServiceService ,
     private fb:FormBuilder , private localStorage:LocalStorageService,
     private globalService : GlobalServiceService
     
     ) { }
  deliveryAddressForm = this.fb.group({

    receiverCountry: [34],
    countryState: [4956],
    StateCities: []
          });
    get receiverCountry(){
      return this.deliveryAddressForm.get('receiverCountry');
    }
    get countryState(){
      return this.deliveryAddressForm.get('countryState');
    }
    get stateCity(){
      return this.deliveryAddressForm.get('stateCity');
    }

  ngOnInit(): void {
    this.getRXCountriesList = this.localStorage.getRXCountries()
     this.getCountryState()
     this.getCites()
     this.getDeliveryAddress()

    
  }
  getCountryState(){
    let countryID = this.receiverCountry?.value
    // console.log(this.receiverCountry?.value)
    this.globalService.getCountryStateList(countryID)
    .subscribe((response)=>
    {
      this.countryStateList = response
      // console.log(this.countryStateList ,'state')
    },
    error => console.error(error,'error')
    )
    this.getCites()
  }
  getCites(){
    let countryID = this.receiverCountry?.value
    // console.log(this.receiverCountry?.value)
    this.globalService.getCites(countryID)
    .subscribe((response)=>
    {
      this.stateCitiesList = response
      console.log(this.stateCitiesList ,'city')
    },
    error => console.error(error,'error')
    )
  }
  getDeliveryAddress(){
    this.globalService.getDeliveryAddress()
    .subscribe((response)=> {
      this.deliveryAddress = response
      // console.log(response,'delivery address')
    },
    error => console.error('error' , error)
    )
  }


}
