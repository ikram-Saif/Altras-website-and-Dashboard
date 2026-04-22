import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password.service';
import { confirmPasswordValidator } from '../share/confirmPasswordValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  validToken:any = false
  token: any;
  successResetPassword:any = false

  constructor(private fb:FormBuilder ,private forgotPasswordService:ForgotPasswordService ,
    private route: ActivatedRoute , private router: Router ) { }
  resetPasswordForm = this.fb.group({

    password: [null,
                    Validators.required
            ],
    confirmPassword:[null ,
                            Validators.required
  ]
          },
  {validator: Validators.compose(
    [confirmPasswordValidator])
  });
    get password(){
      return this.resetPasswordForm.get('password');
    }
    get confirmPassword(){
      return this.resetPasswordForm.get('confirmPassword');
    }

  ngOnInit(): void {
    this.check_email_token();

  }
  onSubmit(){
    this.forgotPasswordService.reset_customer_password(this.token,this.password?.value , this.confirmPassword?.value)
    .subscribe((response:any) =>{

      if(response.RCode  == 0 ){
      this.successResetPassword = true
      }
      else 
        {
          this.successResetPassword = false
          this.router.navigate(['/login']);
        }

       
    },
   
    error => console.error('error' , error)
    )
  }

check_email_token(){

   this.token = this.route.snapshot.queryParams.token;
  this.forgotPasswordService.check_email_token(this.token)
  .subscribe((response:any) =>{

    if(!response.RCode ||response.RCode  == 0 ){
      this.validToken = true

    }
      if(response.RCode && response.RCode  == 80){
        this.router.navigate(['/login'], { state: { message: response.RDesc } });


        
        // console.log(this.invalidEmailMsg , 'failtranInfo')
      }
  },
 
  error => console.error('error' , error)
  )
}

}
