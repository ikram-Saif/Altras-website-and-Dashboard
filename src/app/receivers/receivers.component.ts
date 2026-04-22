import { Component, OnInit } from '@angular/core';
import {GlobalServiceService}from '../global-service.service'
import {ReceiversService} from '../recivers.service'
import * as moment from 'moment'



@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.css']
})
export class ReceiversComponent implements OnInit {

  constructor(private receiversService: ReceiversService  , private globalData :GlobalServiceService) { }
  receiversList:any
  emptyReceiversList:any
  receiverDetails:any={}
  receiverDetailsEmpty:any

  //currency:any

  ngOnInit(): void {
    
    this.getCustomerReceiversList()

    
  }

  getCustomerReceiversList(){
    this.receiversService.getCustomerReceivers()

    .subscribe((response:any) =>
              { 
                if(!response.RCode){
                  this.receiversList =  response

                }
                  if(response.RCode && response.RCode  === 1)
                   this.emptyReceiversList = response.RDesc
              },
              error => console.error('error' , error)


           )
  }
  getReceiverDetails(receiverId:number){
    this.receiversService.getReceiverDetails(receiverId)
    .subscribe((response:any) =>
              { 
                if(response.RCode == 0){
                  this.receiverDetails =  response

                }
                  else
                   this.receiverDetailsEmpty = response.RDesc
              },
              error => console.error('error' , error)


           )

    console.log(this.receiverDetails)
  
    }


  // getReceiverDetails(receiverId:number){
  // this.receiverDetails = this.receiversList.filter((re:any) => re.ReceiverID === receiverId )[0]
  // console.log(this.receiverDetails)
  // this.getReceiverCurrencyId(this.receiverDetails.Currencies, this.receiverDetails.Currency)

  // }
  getReceiverCurrencyId(currencyArr:[], receiverCurrency:string){
   return currencyArr.filter((re:any) => re.currency === receiverCurrency )[0]  
     }
    
  deleteReceiver(receiverId:string) {
    this.receiversService.deleteReceiver(receiverId)
    .subscribe((response:any) =>
              { 
                if(response.RCode == 0){
                  console.log('receiver removed successfully')

                }
                  else
                   console.log('some thing went wrong')
              },
              error => console.error('error' , error)


           )
          // remove receiver from receivers array
         this. removeReceiverFromArray(receiverId)
    }
  
    removeReceiverFromArray(receiverId:any){
      this.receiversList =  this.receiversList.filter((re:any) => re.ReceiverID != receiverId )
            //supose an alert notification appear

      console.log(this.receiversList);
      //supose an alert notification appear

    }
    public handleDismiss(): void {
      // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
      // ... do something
  
    }

}
