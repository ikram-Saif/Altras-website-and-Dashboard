import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service'
import { FormBuilder ,Validators } from '@angular/forms';
import {SendMoneyService} from '../send-money.service'
import {UploadDocumentsService} from '../upload-documents.service'
import {CalcolatorService} from '../calcolator.service'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'



@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {

  purposeOfTransactionList = this.localStorage.getPuropsOfTransaction()
  receiversList :any
  receiverCurencies: any
  receiverDeliveryMethodList:any
  sendingCurrency : any
  paymetMethodList : any
  sourceOfFundList: any;
  minAmt:any
  maxAmt:any
  rates:any;
  amountValidaty: any;
  reRatesArr: any;
  ReamountValidaty: any;
  transactionDetails: any =[];
  enableConfirmButton: boolean = false;
  constructor(
    private localStorage: LocalStorageService,
    private fb:FormBuilder,
    private sendMoneyService: SendMoneyService,
    private documentService : UploadDocumentsService,
    private calcService : CalcolatorService,

  ) { }

  sendMoneyForm = this.fb.group({
      receiver :[null ,  Validators.required],
      receiverDeliveryCurrency:[null ,  Validators.required],
      receiverDeliveryMethod:[null ,  Validators.required],
      purposeOfTransaction:[null ,  Validators.required],
      amountToReceive:[null] ,
      amountToSend:[null],
      paymentMethod:[null ,Validators.required],
      proofFundType:[null ,Validators.required],
      
  })

  get receiver(){
    return this.sendMoneyForm.get('receiver');
  }
  get receiverDeliveryCurrency(){
    return this.sendMoneyForm.get('receiverDeliveryCurrency');
  }
  get receiverDeliveryMethod(){
    return this.sendMoneyForm.get('receiverDeliveryMethod');
  }
  get purposeOfTransaction(){
    return this.sendMoneyForm.get('purposeOfTransaction');
  }
  get paymentMethod(){
    return this.sendMoneyForm.get('paymentMethod');
  }
  get proofFundType(){
    return this.sendMoneyForm.get('proofFundType');
  }
  get amountToReceive(){
    return this.sendMoneyForm.get('amountToReceive');
  }
  get amountToSend(){
    return this.sendMoneyForm.get('amountToSend');
  }



  returnReceiverCurrencyAndMethod(){
    let recevierObject =this.receiversList.find((rece:any)=> rece.ReceiverID == this.receiver?.value)

    this.receiverCurencies =recevierObject.Currencies
    //set default recepient currency 
    this.sendMoneyForm.patchValue({
      receiverDeliveryCurrency: this.receiverCurencies.find((cur:any)=>
      cur.currency == recevierObject.Currency).currencyID
    })
    this.getCurrencyDeliveryMethod()
  }

  getCurrencyDeliveryMethod(){
    console.log(this.receiverDeliveryCurrency?.value , 'recepient currency')

    this.receiverDeliveryMethodList = this.receiverCurencies.find((cur :any)=>
    this.receiverDeliveryCurrency?.value === cur.currencyID).PayoutMethods

    if(this.receiverDeliveryMethodList.length > 0){
      console.log(this.receiverDeliveryMethodList , 'payout Method')

      this.sendMoneyForm.patchValue({
        receiverDeliveryMethod: this.receiverDeliveryMethodList[0].payoutmethodID
      })
  
    }
    else 
    Swal.fire('Warning','this Receiver Doesnot Have Delivery Method', 'warning')

   
  }
  returnCurrencyName(){
   return this.receiverCurencies?.find((cur:any)=>
      cur.currencyID == this.receiverDeliveryCurrency?.value).currency
    }

    getSourceOfFundTypeList(){
      this.documentService.getProofTypeList("Source OF Fund").subscribe(
        (response:any) => {
          this.sourceOfFundList =  response
  
        },
        error => console.error(error,'error')
      )
    }
    calculateAmountToReceive(){
      this.amountValidaty = {}
      this.ReamountValidaty ={}
      let sendAmount = Number(this.amountToSend?.value)
      //return Rates array 
       this.calculateRate()
       //check if its valid amount not graterThanMax and Not
        this.amountValidaty =  this.calcService.checkEnterdAmount(sendAmount ,this.rates)

       if(this.amountValidaty.validAmount){
         let rate = this.calcService.returnRate(sendAmount , this.rates)
         console.log(rate, 'sutable rate')
         this.sendMoneyForm.patchValue({
           amountToReceive: sendAmount * rate
         })
       }
       else
        {
          this.sendMoneyForm.patchValue({
            amountToReceive: 0
          })
        } 
    }

    calculateAmountTosend(){

      this.amountValidaty = {}
      this.ReamountValidaty ={}
      let receiveAmount = Number(this.amountToReceive?.value)
      //return Rates array 
       this.calculateRate()
       // receiving rate array
      //  this.reRatesArr = this.receivingRateArr(this.rates)
      //  console.log(this.reRatesArr , 're rates arr')
       this.ReamountValidaty =  this.calcService.checkEnterdAmount(receiveAmount ,this.reRatesArr)
       if(this.ReamountValidaty.validAmount){
        let rate = this.calcService.returnRate(receiveAmount , this.reRatesArr)
        this.sendMoneyForm.patchValue({
          amountToSend: receiveAmount / rate
        })
      }
      else
       {
         this.sendMoneyForm.patchValue({
          amountToSend: 0
         })
       } 

    }
    //array to check validity of receiving amount 
    receivingRateArr(rates:any){
      let newRate: any =[]
      rates.forEach((rat:any) => {

        newRate.push({'MinAmt': rat.MinAmt * rat.Rate ,  'MaxAmt' : rat.MaxAmt * rat.Rate , 'Rate': rat.Rate })
      });

    this.reRatesArr =  newRate 
     }
  
    calculateRate(){

      console.log(this.purposeOfTransaction?.value , 'purpos')
      this.sendMoneyService.getRecepientRates
     (
       this.receiver?.value , 
       this.receiverDeliveryCurrency?.value,
       this.receiverDeliveryMethod?.value
     ).subscribe((response:any)=>{
 
      if(response.length > 0)
        {
          this.rates =  response
          console.log(response  ,'response rate')
          this.receivingRateArr(this.rates)
          console.log(this.reRatesArr  ,'response reRates')
        }
        if(response.Rcode != 0 ){
          Swal.fire('Warning',response.RDesc, 'warning')
        }
      },
     error => console.error(error , 'error'))
   }

   // show transaction details befor confirm it to payment processor
  getTransactionDetails(){
    this.sendMoneyService.CalculateExtra(
      this.receiver?.value,
      this.receiverDeliveryCurrency?.value,
      this.receiverDeliveryMethod?.value,
      this.amountToSend?.value,
      null,
      this.paymentMethod?.value
    ).subscribe((response:any)=>{
      console.log(response , 'setails')
      if(response.RCode == 0){
        this.transactionDetails = response
        this.enableConfirmButton = true
      }
      if(response.RCode != 0){
        this.enableConfirmButton = false
        Swal.fire('Warning',response.RDesc, 'warning')
      }
        
    },
    error => Swal.fire('Error!',error, 'error')
    )
  }

  // when user click confirm button to complete payment Processor
  confirmPayment(){
    this.sendMoneyService.ConfirmAndPayExtra(
      this.receiver?.value , 
      this.receiverDeliveryCurrency?.value , 
      this.receiverDeliveryMethod?.value,
      this.transactionDetails.TxAmount , 
      this.transactionDetails.ExtraCharges , 
    ).subscribe((response:any)=>{
      if(response.RCode == 0){
        console.log(response)
        window.location.href = response.RedirectURI ;
      }
      if(response.RCode != 0){
        Swal.fire('Warning',response.RDesc, 'warning')

      }

    },
    error => Swal.fire(error, 'error')
    )
  }


  ngOnInit(): void {
    this.sendingCurrency = this.localStorage.getSendingCurrency()
    this.sourceOfFundList = this.getSourceOfFundTypeList()

    this.sendMoneyService.getCustomerRecipientsExtra().subscribe((response:any)=>
      {
        if(response.length > 0){

        this.receiversList = response
        console.log(response , 'customer recepient extra')
        }
        else
        if(response.length <= 0){
          Swal.fire('oops' ,'there Is No Recepient Yet Please add recepient', 'warning')
        }

      },

      error => Swal.fire('Error',error,'error')

    )
    this.sendMoneyService.getPaymentMethods().subscribe((response:any)=>
      {
        if(response.length > 0){
          this.paymetMethodList = response
          console.log(response , ' methods')
        }
        if(response.Rcode && response.Rcode != 0 )
        Swal.fire('oops' ,response.RDesc, 'warning')

      },

      error => console.error(error,'error')

    )
  }

}
