import { Component, OnInit } from '@angular/core';
import {FormBuilder , Validators ,ValidatorFn } from '@angular/forms';
import {ForgotPasswordService}from '../forgot-password.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  validEmailMsg:any =null
  invalidEmailMsg:any=null

  constructor(private fb:FormBuilder ,private forgotPasswordService:ForgotPasswordService) { }
  forgetpassword_emailForm = this.fb.group({

    email: [null, [
                    Validators.required,
                    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")  
                  ]
            ]
          });
    get email(){
      return this.forgetpassword_emailForm.get('email');
    }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.email?.value);
    this.forgotPasswordService.resetPassord_send_mail(this.email?.value)
    .subscribe((response:any) =>{

      if(!response.RCode ||response.RCode  == 0 ){
        this.validEmailMsg = response.RDesc;
        this.invalidEmailMsg = null

      }
        if(response.RCode && response.RCode  != 0){
          this.invalidEmailMsg = response.RDesc
          this.validEmailMsg = null
        }
    },
   
    error => console.error('error' , error)
    )
  }


}
