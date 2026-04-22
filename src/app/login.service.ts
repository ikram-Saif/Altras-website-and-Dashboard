import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'
import { Router} from '@angular/router';


import {Md5} from 'ts-md5/dist/md5';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private mainSerive : MainServiceService,  private _router: Router ) { }

  ngOnInit() {
    
  }

  login(loginData:any){
    const md5 = new Md5();
    const parameters = {
      'func' : 1,
      'user' : loginData.userName,
      'pwd' : md5.appendStr(loginData.password).end()
     
    }
  
  return this.mainSerive.get([parameters])

  }
  loggedIn(){
    return !! localStorage.getItem('Email')
  }
  loggedOut(){
    localStorage.removeItem('Email')
    this._router.navigate(['/login'])


  }
}
