import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService : LoginService , private router : Router){}

  canActivate() {
    if(this.loginService.loggedIn()){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }  }

  
}
