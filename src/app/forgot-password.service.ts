import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'


@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private mainSerive:MainServiceService ) { }

resetPassord_send_mail(email:string)
  {
    
    return this.mainSerive.get([{'remail':email,'func':'29'}])
  }
  check_email_token(token:string){
    return this.mainSerive.get([{'rptoken':token,'func':'36'}])

  }
  reset_customer_password(token:string,npassword:string , cnpassword:string){
    return this.mainSerive.get([{'rptoken':token,'npwd':npassword,'cnpwd':cnpassword,'func':'35'}])
  }
}