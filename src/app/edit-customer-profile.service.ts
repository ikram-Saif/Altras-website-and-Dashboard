import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'
import {Md5} from 'ts-md5/dist/md5';
import { LocalStorageService } from './local-storage.service';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { GlobalServiceService } from './global-service.service';



@Injectable({
  providedIn: 'root'
})
export class EditCustomerProfileService {

  constructor(private mainSerive:MainServiceService ,  private localStorage: LocalStorageService ,
     private globalService:GlobalServiceService
      ) { }
  user = this.localStorage.getEmail()
  password = this.localStorage.getPassword()
  dob = this.localStorage.getDOB()?.slice(0,10)
  phone = this.localStorage. getPhone()

  editCustomerEmail(customerNewEmail:string){
    return this.mainSerive.get([{
      'user': this.user,
      'pwd':this.password,
      'func':'8',
      'dob':this.dob,
      'phone':this.phone,
      'email':customerNewEmail

      }])

  }
  editCustomerPassword(customerNewPassword:string , customerOldPassword:string){
    const md5 = new Md5();

    // console.log(customerNewPassword,'**************************')
    let oldpwd = md5.appendStr(customerOldPassword).end()
    // console.log(customerOldPassword,'old pwd')


    // password with md5 func
    return this.mainSerive.get([{
      'user': this.user,
      'pwd': oldpwd,
      'func':'7',
      'npwd':customerNewPassword
      }
    ])
  }
editCustomerPhone(customerPhone:string , verCode:string){

   return this.mainSerive.get([{
      'user': this.user,
      'pwd': this.password,
      'func':'58',
      'upmobileno':customerPhone,
      'verCode': verCode
      }])
}
updateCustomerAddress(customerAddressDetails:any){
  return this.mainSerive.get([{
    'user': this.user,
    'pwd':this.password,
    'func':'57',
    'uppostcode':customerAddressDetails.customerPostcode,
    'upaddress1':customerAddressDetails.customerAddress1,
    'upaddress2':customerAddressDetails.customerAddress2,
    'upaddress3':customerAddressDetails.customerAddress3,
    'uptown': customerAddressDetails.customerTown,
    'upcounty':customerAddressDetails.customerCountry

    }])
}
 
}
