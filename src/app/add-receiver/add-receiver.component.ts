import { Component, OnInit } from '@angular/core';
import {GlobalServiceService}from '../global-service.service'
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReceiversService } from '../recivers.service';
import * as moment from 'moment'
import { ATM_maxDigitValidator } from '../share/ATM_maxDigitValidator';
import {ATMCardValidator} from '../share/ATMCardCofirm'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.css']
})
export class AddReceiverComponent implements OnInit {

  purposList:any;
  countriesRx:any 
  cities:any
  nationality:any = []
  sudaneseBanks:any =  this.localStorage.getSudaneseBank()
  bankAccountTypeList :any
  countryId:any
  receiverDeleivaryMethods:any 
  delevaryMethodValue:any
  months = this.month_digit()
  currentMonth = moment().format('MM')
  yearsList = this.years(14)
  ATM_maxDigits:any 
  dMethod:any =[]

  constructor(private receiverService : ReceiversService,private globalService : GlobalServiceService ,
     private localStorage : LocalStorageService , private fb:FormBuilder ) 
     {}
     addReceiverForm:any = this.fb.group({
      rxcountry: [42, Validators.required],
  
      city :['' , Validators.required],
  
      aName:['' , Validators.required],
  
      eName:[''  ,Validators.required ],

      phone:['' , Validators.required],
      receiverNationality:['' , Validators.required],
      purpose:['' , Validators.required],
      deliveryMethod:['cash'],
      receiverBank:[''],
      bankAccountNo:[''],
  
      bankAccountType:[''],
      bankBranch:['' ],
  
      ATMNumber:['' , [Validators.pattern("^[0-9]*$"),
      // ATM_maxDigitValidator(this.sudaneseBanks)
      // Validators.maxLength(this.ATM_maxDigits)
    ]],
    confirmCardNum:['' , Validators.pattern("^[0-9]*$")],

    ATMExMonth:[''],
    ATMExYear:[''],

  },
  {validator:  ATMCardValidator
  }
    ) 
  
    get rxcountry(){
      return this.addReceiverForm.get('rxcountry');
    }
   
    get city(){
      return this.addReceiverForm.get('city');
      
    }
    get eName(){
      return this.addReceiverForm.get('eName')
    }
    get aName(){
      return this.addReceiverForm.get('aName')
    }
    get phone(){
      return this.addReceiverForm.get('phone')
    }
    get receiverNationality(){
      return this.addReceiverForm.get('receiverNationality')
    }
    get purpose(){
      return this.addReceiverForm.get('purpose')
    }
    get deliveryMethod(){
    return this.addReceiverForm.get("deliveryMethod")

  }
  get receiverBank(){
    return this.addReceiverForm.get('receiverBank')
  }
  get bankAccountNo(){
    return this.addReceiverForm.get('bankAccountNo')
  }
  get ATMNumber(){
    return this.addReceiverForm.get('ATMNumber')
  }
  get confirmCardNum(){
    return this.addReceiverForm.get('confirmCardNum')
  }
  get bankAccountType(){
    return this.addReceiverForm.get('bankAccountType')
  }
  get bankBranch(){
    return this.addReceiverForm.get('bankBranch')
  }
  get ATMExMonth(){
    return this.addReceiverForm.get('ATMExMonth')
  }
  get ATMExYear(){
    return this.addReceiverForm.get('ATMExYear')
  }

  ngOnInit(): void {
    this.getpurposOfTransactionListt()
    this.getCountries() 
    this.nationality = this.localStorage.getNationality()
    this.sudaneseBanks = this.localStorage.getSudaneseBank()
    this.bankAccountTypeList = this.localStorage.getbankAccountType()
    this.receiverDeleivaryMethods = this.globalService.getDeleivaryMethod()
    this.dMethod = ['cash','card']
  }
  getpurposOfTransactionListt(){

    this.purposList = this.localStorage.getPuropsOfTransaction()
    
}
getCountries(){
  this.countriesRx =  this.localStorage.getRXCountries()
}

getCites(){

//  this.countryId = this.rxcountry?.value == null ? 34 : this.rxcountry?.value

    this.globalService.getCites(this.rxcountry?.value)
    .subscribe(
      (response:any) => 
                {
                  this.cities =  response
                } ,
      (error:any) => console.error('error' , error)
      )
      this.checkDeliveryMethod()
    }
    // getReceiverNationality(){
    //   let natId = this.receiverNationality?.value
    //   // console.log(natId)
    //   let nationalityList = this.nationality
    //   if(nationalityList.length > 0 )
    //   return nationalityList.find((nat:any)=> nat.CountryID === natId).Country
    // }
    checkCountry(){
      return this.rxcountry?.value == '34'? true : false
    }
    years(i: number) {
      let now = moment();

    let year = now.get('year');
    let yearsList = [] 
    let sliceYear
    for(let y = 0; y < i ; y++){
      sliceYear = (year + y).toString().substr(-2)
      yearsList.push(sliceYear)

    }
    return  yearsList

  }
  month_digit(){
    let months = moment.months()
    let degit_month_arr:any = []
    months.forEach(m =>
      degit_month_arr.push(moment().month(m).format("MM"))
    )
    return degit_month_arr


  }
  validate_ATM_Maxlength_and_starter():any{
    let bankId = this.receiverBank.value
     let ATM_input:any
     let ATM_input_starter :any
     var ATM_Digit:any
     var ATM_Starter:any
    if(bankId){

      ATM_input = this.ATMNumber.value.length
      ATM_input_starter = this.ATMNumber.value.substring(0, 6)
      ATM_Digit = this.sudaneseBanks.find((bank:any) => bank.BankID == bankId).ATM_Max_Digits
      ATM_Starter = this.sudaneseBanks.find((bank:any) => bank.BankID == bankId).ATM_Starter

          if(ATM_input > 6){
        // validate starter
        if(ATM_input_starter !== ATM_Starter ){
          this.addReceiverForm.controls['ATMNumber'].setErrors({'incorrect': true})
          return'please enter valid card number'
        } else{
          this.addReceiverForm.controls['ATMNumber'].setErrors(null)
        }
        
      if(ATM_input > ATM_Digit)

      {    
        this.addReceiverForm.controls['ATMNumber'].setErrors({'invalid': true})
        return `please enter ${ATM_Digit} digits`
      }
      else
      this.addReceiverForm.controls['ATMNumber'].setErrors(null)
    }
   

    }else {
      this.addReceiverForm.controls['ATMNumber'].setErrors({'invalid': true})
      return'Please Select Receiver Bank'

    }

      
    // this.ATM_maxDigits = Number(ATM_Digit)
  }

  checkDeliveryMethod(){
    // console.log(this.deliveryMethod.value , 'dmethod')
    return this.deliveryMethod?.value == "card"? true : false
  }
  addNewReceiver(){
    this.receiverService.addNewReceiver(this.addReceiverForm.value)
    .subscribe(
      (response:any) => 
                {
                  // this.responseMessage = response.RDesc
                  if(!response.RCode ||response.RCode  == 0 ){
                    // console.log(response.RDesc)

                    Swal.fire({
                      icon: 'success',
                      title: 'Saved!',
                      text: response.RDesc,
                      })
                      this.addReceiverForm.reset();

                  }
                    if(response.RCode && response.RCode  != 0){
                      // console.log(response.RDesc)

                      Swal.fire('oops!', response.RDesc, 'warning')

                    }
                } ,
      (error:any) => Swal.fire('Error!', error, 'error')
      )
      console.log(this.addReceiverForm.value)

  } 

  
}
