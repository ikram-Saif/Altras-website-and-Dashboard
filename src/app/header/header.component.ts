import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _loginService : LoginService ) { }

  ngOnInit(): void {
  }
  loggedIn(){
    this._loginService.loggedIn()
  }
}
