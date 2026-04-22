import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl , Validators  } from '@angular/forms';
import { Router  , ActivatedRoute} from '@angular/router';
import {LoginService} from '../login.service'
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import {Md5} from 'ts-md5/dist/md5';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   md5 = new Md5();

  loginForm !: FormGroup
  constructor(private _loginService : LoginService , private _router: Router , private toastr: ToastrService , private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        userName: new FormControl(null,
                [
                    Validators.required,
                    Validators.email
                  ]),
        password: new FormControl(null,Validators.required)
      }
    );
}
get userName(){
  return this.loginForm.get('userName');
}
get password() {
  return this.loginForm.get('password');
}
  onSubmit() {
    if (!this.loginForm.valid) return;
    this._loginService.login(this.loginForm.value)
    .subscribe(
      (response:any) => {

        response.RCode == 0 ?  this.successLogin(response)  : this.failLogin(response.RDesc) 
    
      },
      error => console.error('error' , error)
      );
  }

  successLogin(customerData:any){
    // console.log(customerData)
    // store response in localStorage
    this.storeCustomerData(customerData)
    this._router.navigate(['dashboard'], { state: { message: customerData.RDesc } });
  }

  failLogin(message:string){
    this.toastr.error('Login Faild!', message,{progressBar: true});

    this._router.navigate(['/login'])
  }

 
  storeCustomerData(customerData:any)
  {
    this.localStorage.storeCustomerDataInLocalStorage(customerData)
      
      this.storeUserPassword()
  }



  storeUserPassword(){
    let pwd = this.loginForm.get('password')?.value
    pwd =this.md5.appendStr(pwd).end();
    this.localStorage.setuserPassword(pwd)
    this.localStorage.setOregenalPassword(this.convertToPasswordToDot()) 
  }
  // this function convert user passwordto * with the same length of passwordtext befor we stored in lcalStorage
convertToPasswordToDot(){
  let hiddenPwd =''
  for(let i=0 ; i< this.password?.value.length; i++ ){
    hiddenPwd += '*'
  }
  return hiddenPwd
}

}
