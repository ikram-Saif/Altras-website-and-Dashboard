import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {MainServiceService} from './main-service.service'



@Injectable({
  providedIn: 'root'
})
export class ReceiversService {

  constructor(private mainSerive:MainServiceService , private localStorage: LocalStorageService) { }

  user = this.localStorage.getEmail()
   password = this.localStorage.getPassword()

   getCustomerReceivers()
  {
    
    return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'2'}])
  }
  getReceiverDetails(receiverId:number){

    return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'15','rcvid':receiverId}])

  }
  editReceiverDetails(receiverData:any , receiverId:any ,xmagentcode:any){
    let receiverInfo = {
      'user': this.user,
      'pwd':this.password,
      'func':'17',
      'rcvid':receiverId,
      'xmagentcode':xmagentcode,
      'phone':receiverData.phone,
      'bnkid':receiverData.receiverBank,
      'bnkbranch':receiverData.bankBranch,
      'bnkaccno':receiverData.bankAccountNo,
      'bnkacctypeid':receiverData.bankAccountType,
      'rcvPurposeOfTrans':receiverData.purpose,
      'natid':receiverData.receiverNationality,
      'ATM_Card_No':receiverData.ATMNumber,
      'ATM_EXP_Year':receiverData.ATMExYear,
      'ATM_EXP_Month':receiverData.ATMExMonth
      
    }
    console.log(receiverInfo)

    return this.mainSerive.get([receiverInfo])

  }
  deleteReceiver(receiverId:any){
    return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'27','rcvid':receiverId}])

  }
  addNewReceiver(receiverData:any){
    let newReceiverInfo = {
      'user': this.user,
      'pwd':this.password,
      'func':'9',
      'renm':receiverData.eName,
      'ranm':receiverData.aName,
      'citid' : receiverData.city,
      'phone':receiverData.phone,
      'bnkid':receiverData.receiverBank,
      'bnkbranch':receiverData.bankBranch,
      'bnkaccno':receiverData.bankAccountNo,
      'bnkacctypeid':receiverData.bankAccountType,
      'rcvPurposeOfTrans':receiverData.purpose,
      'xmagentcode':'',
      'natid':receiverData.receiverNationality,
      'ATM_Card_No':receiverData.ATMNumber,
      'ATM_EXP_Year':receiverData.ATMExYear,
      'ATM_EXP_Month':receiverData.ATMExMonth
      
    }
    return this.mainSerive.get([newReceiverInfo])


  }
}
