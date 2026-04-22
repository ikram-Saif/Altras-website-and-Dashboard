import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'


@Injectable({
  providedIn: 'root'
})
export class CalcolatorService {

  constructor(private mainSerive : MainServiceService ) { }
  getCalcolatorListObject(txCountry:number , rxCountry:number){
    return this.mainSerive.get([{'clcTxCountryID':txCountry,'clcRxCountryID':rxCountry, 'func': '43'}])
  
  }
  // function to check if user amount valid to send of not its return object 
// example:  {'validAmount':false , 'message':'Minimum amount should enterd is ${minAmount}'}
checkEnterdAmount(enterdAmount:number, ratesArr:any):any{

  console.log(ratesArr , 'ratesArr')
  let minAmount = ratesArr[0].MinAmt
  let maxAmount = ratesArr[ratesArr.length -1].MaxAmt

  console.log(enterdAmount >= minAmount && enterdAmount <= maxAmount,'check')

  if(enterdAmount >= minAmount && enterdAmount <= maxAmount){

     return {'validAmount': true , 'amountMessage': '' }
    }
  else
   if (enterdAmount < minAmount)
    {

      return {'validAmount': false , 'amountMessage': `Minimum amount should enterd is ${minAmount}` }

    }
  else  if (enterdAmount > maxAmount)
    {
      return {'validAmount': false , 'amountMessage': `Maximum amount should enterd is ${maxAmount}`}

    }
  }
  returnRate(amount:number , ratesArr: any) {
    
         return ratesArr.find((rate:any) => 
                amount >= Number(rate.MinAmt) && amount <= Number(rate.MaxAmt)
            ).Rate
                   
      }

     
}
