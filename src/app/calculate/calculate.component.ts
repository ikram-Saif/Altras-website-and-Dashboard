import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service'
import { FormBuilder ,Validators } from '@angular/forms';
import {CalcolatorService} from '../calcolator.service'
import {GlobalServiceService} from '../global-service.service'

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {
  RXCountries:any 
  TrCountries: any
  deliveryMethods:any=[]
  deliveryCurencies:any =[]
  sendCurrency:any = "GBP"
  rxCountryCurrency:any
  calculatorRate:any
  rates:any =[]
  sutableRate:any
  sendingCountryID:any
  amountMessage: string = '';
  priceOfOne: any;
  priceOfthousend :any

  constructor(
    private localStorage: LocalStorageService,
    private calculatorService : CalcolatorService,
    private fb:FormBuilder,
    private globalService :GlobalServiceService
  ) { }

  todayRateForm = this.fb.group({
    sendingCountry :[null],
    receivingCountry :[null],
    deliveryMethod:[null],
    deliveryCurrency:[null],
    amountToReceive:[null],
    amountToSend:[null]
  })

  get sendingCountry(){
    return this.todayRateForm.get('sendingCountry');
  }
  get receivingCountry(){
    return this.todayRateForm.get('receivingCountry');
  }
  get deliveryMethod(){
    return this.todayRateForm.get('deliveryMethod');
  }
  get deliveryCurrency(){
    return this.todayRateForm.get('deliveryCurrency');
  }
  get amountToReceive(){
    return this.todayRateForm.get('amountToReceive');
  }
  get amountToSend(){
    return this.todayRateForm.get('amountToSend');
  }

  getCalcolatorListObject(){
    console.log(this.receivingCountry?.value)
    this.calculatorService.getCalcolatorListObject(this.sendingCountryID , this.receivingCountry?.value).
    subscribe((response:any)=>{
      this.calculatorRate = response
      console.log(this.calculatorRate,'big')

      // this.sendCurrency = this.globalService.getRXCountryCurrency(this.sendingCountry?.value , this.TrCountries)
      this.rxCountryCurrency = this.globalService.getRXCountryCurrency(this.receivingCountry?.value , this.RXCountries)

      this.fillDeliveryMehodsArray()

    },
    error => console.error(error , 'error'))
  }
  fillDeliveryMehodsArray(){

    // remove duplicate from an array
    this.deliveryMethods  =[...new Map(this.calculatorRate .map((item:any) =>
      [item['method'], item])).values()]

      this.todayRateForm.patchValue({
       deliveryMethod :this.deliveryMethods[0].method,
       deliveryCurrency :this.deliveryMethods[0].cur
      })
      // console.log(this.deliveryMethods, 'd method arr')

      this.fillDeliveryCurencies()

  }
  fillDeliveryCurencies(){
    // remove duplicate from an array

    this.deliveryCurencies = this.calculatorRate.filter((rates:any) => 
    rates.method == this.deliveryMethod?.value
    )
            console.log(this.deliveryMethod?.value, 'curr')

    console.log(this.deliveryCurencies,'delevery currencies after')

    this.getAvailableRates()
  }

  getAvailableRates(){
    console.log(this.deliveryCurrency?.value , 'currency')
    console.log(this.deliveryMethod?.value , 'method')

    // console.log(this.calculatorRate,'calculator rate')
    this.rates = this.calculatorRate.filter((rates:any) => 
          rates.cur == this.deliveryCurrency?.value && rates.method == this.deliveryMethod?.value)
          this.rates = this.rates[0].rates
      console.log(this.rates , 'rate array')
      this.calculateReceivingMoney()
      this.calculateSendingMoney()
      this.priceOfOne = 1 * this.rates[0].Rate + this.rates[0].Fees
      this.priceOfthousend = 1000 / this.rates[0].Rate + this.rates[0].Fees

    }
  calculateReceivingMoney(){
    let amount =Number(this.amountToSend?.value)
    // return specific rate object after compare sending ammount
     // check if enterd amount in range or not 
     if(this.checkEnterdAmount(amount , this.rates)){
    this.sutableRate = this.returnRate(Number(amount))
    this.todayRateForm.patchValue({
      amountToReceive:  this.sutableRate != 0 ? (amount  * Number(this.sutableRate.Rate) )+  Number(this.sutableRate.Fees) : 0
    })
  }
    
  }
  calculateSendingMoney(){
    let amount = Number(this.amountToReceive?.value)

    // return specific rate object after compare sending ammount
    // check if enterd amount in range or not 
    if(this.checkEnterdAmount(amount , this.rates)){
      this.sutableRate = this.returnRate(Number(amount));
      console.log(this.sutableRate , 'sutable rate');

     this.todayRateForm.patchValue({
        amountToSend: this.sutableRate != 0 ? amount  / Number(this.sutableRate.Rate) +  Number(this.sutableRate.Fees):0
     })

    } 
    //calculate the price of 1 GBP ex
  }
  checkEnterdAmount(enterdAmount:number, ratesArr:any):any{

  let minAmount = ratesArr[0].MinAmt
  let maxAmount = ratesArr[ratesArr.length -1].MaxAmt
  console.log(enterdAmount >= minAmount && enterdAmount <= maxAmount,'check')
  if(enterdAmount >= minAmount && enterdAmount <= maxAmount){
    this.amountMessage = ''

     return true
    }
  else
   if (enterdAmount < minAmount)
  {
    this.amountMessage =  `Minimum amount should enterd is ${minAmount}`
    return false
  }
  else  if (enterdAmount > minAmount)
  {
    this.amountMessage =  `Maximum amount should enterd is ${maxAmount}`
    return false
}
}
returnRate(amount:any) {
//     console.log(this.rates.filter((rate:any) => 
//     amount >= Number(rate.MinAmt) && amount <= Number(rate.MaxAmt)
// ), 'customer aount')
   let rate_arr =  this.rates.filter((rate:any) => 
          amount >= Number(rate.MinAmt) && amount <= Number(rate.MaxAmt)
      )
              // console.log(typeof(this.rates.MinAmt))
              if( rate_arr.length > 0 )
              return rate_arr[0]
              else return 0
      // console.log(typeof(this.rates.MinAmt))
        
      // console.log(this.amountToReceive?.value, 'rate')
}

ngOnInit(): void {
  this.RXCountries = this.localStorage.getRXCountries()
  this.TrCountries = this.localStorage.getOrigenatorCountries()
  this.sendingCountryID = this.localStorage.getCountryID()
  this.todayRateForm.patchValue({
    sendingCountry:42,
    receivingCountry :34,
    deliveryMethod:"1",
    deliveryCurrency:"SDG",
    // amountToReceive: 1,
    // amountToSend:1
  })
  // this.sendCurrency = this.globalService.getRXCountryCurrency( this.sendingCountry?.value , this.TrCountries)
  this.rxCountryCurrency = this.globalService.getRXCountryCurrency(this.receivingCountry?.value, this.RXCountries)
  this.getCalcolatorListObject()

}

}

