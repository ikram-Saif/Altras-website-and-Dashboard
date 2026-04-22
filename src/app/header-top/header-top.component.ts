import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service'
import { Router  , ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {

  constructor( private _loginService : LoginService ) { }
  customerName = this.getUserName()

  ngOnInit(): void {
  }
  getUserName(){
    return localStorage.getItem('EName')
  }
  logout(){
    this._loginService.loggedOut()
  }
  loggedIn(){
    return this._loginService.loggedIn()
  }
}
