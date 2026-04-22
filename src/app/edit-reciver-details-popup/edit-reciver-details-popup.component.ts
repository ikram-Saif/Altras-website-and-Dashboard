import { GlobalServiceComponent } from './../global-service/global-service.component';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ComponentFactoryResolver } from '@angular/core';
import {GlobalServiceService}from '../global-service.service'
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {ATMCardValidator} from '../share/ATMCardCofirm'
import * as moment from 'moment'
import { ReceiversService } from '../recivers.service';
import { ATM_maxDigitValidator } from '../share/ATM_maxDigitValidator';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'



@Component({
  selector: 'app-edit-reciver-details-popup',
  templateUrl: './edit-reciver-details-popup.component.html',
  styleUrls: ['./edit-reciver-details-popup.component.css']
})
export class EditReciverDetailsPopupComponent implements OnInit  , OnChanges {
  message:string = ''
  purposList:any;
  emptyList:any;
  countriesRx:any 
  cities:any
  nationality:any = []
  messageType:any
  sudaneseBanks:any =  this.localStorage.getSudaneseBank()
  bankAccountTypeList :any
  receiverDeleivaryMethods:any 
  delevaryMethodValue:any
  months = this.month_digit()
  currentMonth = moment().format('MM')
  yearsList = this.years(14)
  up_nationalityId:any
  up_receiverDetails:any
  @Input()
  receiverDetails:any ;
  receiverId:any
  disabled:any = true
  responseMessage:any = null
  responseType:any = null
  ATM_maxDigits:any 
  // editReceiverForm!: FormGroup ;
  

  constructor(private receiverService : ReceiversService,private globalService : GlobalServiceService , private localStorage : LocalStorageService , private fb:FormBuilder ) {

  }
  
  ngOnChanges(change :SimpleChanges){

    this.receiverDetails = change.receiverDetails.currentValue 

    // console.log('hi')
    this.editReceiverForm.patchValue({
      eName :this.receiverDetails.EName ,
      aName :this.receiverDetails.AName,
      rxcountry :this.receiverDetails.CountryID ,
      phone :this.receiverDetails.PhoneNo ,
      purpose :this.receiverDetails.PurposeID,
      receiverBank :this.receiverDetails.BankID ,
      bankAccountNo :this.receiverDetails.Bank_Acc_No ,
      bankAccountType :this.receiverDetails.BnkAccountTypeID ,
      bankBranch :this.receiverDetails.Bank_Branch ,
      ATMNumber :this.receiverDetails.ATM_Card_No ,
      confirmCardNum :'',
      ATMExMonth :this.receiverDetails.ATM_EXP_Month ,
      ATMExYear :this.receiverDetails.ATM_EXP_Year ,
      city :this.receiverDetails.City,
      receiverNationality: this.receiverDetails.NationalityID,
      
    });
    this.getCites()
    this.receiverId = this.receiverDetails.ReceiverID
    // this.get_ATM_validators_value()
    // console.log(this.receiverDetails,'recv id')

  }
  
  // ngAfterViewInit() {
  //   console.log('on veiw init work')
  //       this.ATM_maxDigits = this.get_ATM_maxDigits()

  // }

  receiverCountries:[] =[]
 editReceiverForm:any = this.fb.group({
    rxcountry: [null, Validators.required],

    city :[null , Validators.required],

    aName:[null , Validators.required],

    eName:[null  ,Validators.required ],
    phone:[null , Validators.required],
    receiverNationality:[null , Validators.required],
    purpose:[null , Validators.required],
    // deleivaryMethod:['cash' , Validators.required],
    receiverBank:[null , Validators.required],
    bankAccountNo:[null , Validators.required],

    bankAccountType:[null , Validators.required],
    bankBranch:[null , Validators.required],

    ATMNumber:[null , [Validators.pattern("^[0-9]*$"),
    // ATM_maxDigitValidator(this.sudaneseBanks)
    // Validators.maxLength(this.ATM_maxDigits)
  ]],
    confirmCardNum:[null , Validators.pattern("^[0-9]*$")],

    ATMExMonth:[null , Validators.required],
    ATMExYear:[null , Validators.required],

  },
  {validator:  ATMCardValidator
  }
  ) 



  ngOnInit(): void {
    
    this.getpurposOfTransactionListt()
    this.getCountries() 
    this.nationality = this.localStorage.getNationality()
    this.sudaneseBanks = this.localStorage.getSudaneseBank()
    this.bankAccountTypeList = this.localStorage.getbankAccountType()
    this.receiverDeleivaryMethods = this.globalService.getDeleivaryMethod()
    // this.get_ATM_maxDigits()
        // this.ATM_maxDigits = this.get_ATM_maxDigits()




  //  console.log(this.receiverDeleivaryMethods[0].name)
  }
  get rxcountry(){
    return this.editReceiverForm.get('rxcountry');
  }
  get city(){
    return this.editReceiverForm.get('city');
    
  }
  get eName(){
    return this.editReceiverForm.get('eName')
  }
  get aName(){
    return this.editReceiverForm.get('aName')
  }
  get phone(){
    return this.editReceiverForm.get('phone')
  }
  get receiverNationality(){
    return this.editReceiverForm.get('receiverNationality')
  }
  get purpose(){
    return this.editReceiverForm.get('purpose')
  }
  // get deleivaryMethod(){
  //   return this.editReceiverForm.get('deleivaryMethod')

  // }
  get receiverBank(){
    return this.editReceiverForm.get('receiverBank')
  }
  get bankAccountNo(){
    return this.editReceiverForm.get('bankAccountNo')
  }
  get ATMNumber(){
    return this.editReceiverForm.get('ATMNumber')
  }
  get confirmCardNum(){
    return this.editReceiverForm.get('confirmCardNum')
  }
  get bankAccountType(){
    return this.editReceiverForm.get('bankAccountType')
  }
  get bankBranch(){
    return this.editReceiverForm.get('bankBranch')
  }
  get ATMExMonth(){
    return this.editReceiverForm.get('ATMExMonth')
  }
  get ATMExYear(){
    return this.editReceiverForm.get('ATMExYear')
  }
  
  getpurposOfTransactionListt(){

    this.purposList = this.localStorage.getPuropsOfTransaction()
    
}
getCountries(){
  this.countriesRx =  this.localStorage.getRXCountries()
}

getCites(){

//  let countryId = this.rxcountry?.value == null ? 34 : this.rxcountry?.value

    this.globalService.getCites(this.rxcountry?.value)
    .subscribe(
      (response:any) => 
                {
                  this.cities =  response
                } ,
      (error:any) => console.error('error' , error)
      )

    }
    getReceiverNationality(){
      let natId = this.receiverNationality?.value
      // console.log(natId)
      let nationalityList = this.nationality
      if(nationalityList.length > 0 )
      return nationalityList.find((nat:any)=> nat.CountryID === natId).Country
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
  getSelectedDelevaryMethod(){
    let x:any = this.editReceiverForm.get('deleivaryMethod')
    // console.log(x)
    // let selectedDelevaryMethod = this.deleivaryMethod?.value == 'cash'?false : true;
    // return selectedDelevaryMethod;
  }
  // this function receive bank id and return max ATM digits
  // get_ATM_maxDigits(){
  //   let bankId = this.receiverBank.value
  //   let ATM_Digit = this.sudaneseBanks.find((bank:any) => bank.BankID == bankId).ATM_Max_Digits
  //   console.log(Number(ATM_Digit),'uiuiuiuiui')
  //   return Number(ATM_Digit)
  // }
  
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
          this.editReceiverForm.controls['ATMNumber'].setErrors({'incorrect': true})
          return'please enter valid card number'
        } else{
          this.editReceiverForm.controls['ATMNumber'].setErrors(null)
        }
        
      if(ATM_input > ATM_Digit)

      {    
        this.editReceiverForm.controls['ATMNumber'].setErrors({'invalid': true})
        return `please enter ${ATM_Digit} digits`
      }
      else
      this.editReceiverForm.controls['ATMNumber'].setErrors(null)
    }
   

    }else {
      this.editReceiverForm.controls['ATMNumber'].setErrors({'invalid': true})
      return'Please Select Receiver Bank'

    }

      
    // this.ATM_maxDigits = Number(ATM_Digit)
  }
 
    submitReceiverDetails(){
      Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
       
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.receiverService.editReceiverDetails(this.editReceiverForm.value, this.receiverId,this.receiverDetails.XMAgentCode)
          .subscribe(
            (response:any) => 
                      {
                        this.responseMessage = response.RDesc
                        if(!response.RCode ||response.RCode  == 0 ){

                          Swal.fire({
                            icon: 'success',
                            title: 'Saved!',
                            text: response.RDesc,
                            })
                          

                        }
                          if(response.RCode && response.RCode  != 0){
                            Swal.fire('oops!', response.RDesc, 'warning')

                          }
                      } ,
            (error:any) => Swal.fire('Error!', error, 'error')
            )
        } 
      })
      this.editReceiverForm.markAsPristine()
     
    }
    
}


