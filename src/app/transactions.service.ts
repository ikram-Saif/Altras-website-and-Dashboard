import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {MainServiceService} from './main-service.service'


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private mainSerive:MainServiceService , private localStorage: LocalStorageService ) { }

   user = this.localStorage.getEmail()
   password = this.localStorage.getPassword()

  getCustomerTransactionHistory()
  {
    
    return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'11'}])
  }
  getTransactionInfo(transId:number){

    return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'21','trid': transId}])

  }
  getTransactionStatus(transId:number){
    return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'47','trid': transId}])
  }
}
