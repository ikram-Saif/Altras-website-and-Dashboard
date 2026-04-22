import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'
import { LocalStorageService } from './local-storage.service';
import {UploadDocumentsService} from './upload-documents.service'


@Injectable({
  providedIn: 'root'
})
export class SendMoneyService {
  user = this.localStorage.getEmail()
   password = this.localStorage.getPassword()

  constructor(
    private mainSerive : MainServiceService ,
     private localStorage: LocalStorageService,
     private documentService : UploadDocumentsService
     
     ) { }

  getCustomerRecipientsExtra(){
    return this.mainSerive.get([{'user': this.user , 'pwd': this.password , 'func':'56'}])
  }
  getPaymentMethods(){
    return this.mainSerive.get([{'user': this.user , 'pwd': this.password , 'func':'19'}])
  }
  getRecepientRates(receiverID:any, currencyID:any,deliveryMethodID:any){
    return this.mainSerive.get([
      {'user': this.user , 'pwd': this.password , 'func':'32', 'rcvid':receiverID,
        'rxcurrid':currencyID , 'rxpoid': deliveryMethodID
      }]) 

  }
  CalculateExtra(receiverID:any, currencyID:any,deliveryMethodID:any ,
     amountToSend:any , amountToreceive : any , paymentMethodID :any){
    return this.mainSerive.get([
      {'user': this.user , 'pwd': this.password , 'func':'33', 'rcvid':receiverID,
      'amttx': amountToSend , 'amtrx': amountToreceive,
        'rxcurrid':currencyID , 'rxpoid': deliveryMethodID , 'pmid': paymentMethodID
      }])
  }
  ConfirmAndPayExtra(receiverID:any, currencyID:any,deliveryMethodID:any ,
    amountToSend:any  , extraCharges :any){
      return this.mainSerive.get([
        {'user': this.user , 'pwd': this.password , 'func':'34', 'rcvid':receiverID,
        'amttx': amountToSend ,
          'rxcurrid':currencyID , 'rxpoid': deliveryMethodID , 'pmid': extraCharges
        }])
    }
}
