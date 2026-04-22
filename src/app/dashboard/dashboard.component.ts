import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {GlobalServiceService}from '../global-service.service'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router , private toastr: ToastrService ,private globalService :GlobalServiceService) { }
  ngOnInit(): void {
    // success notification when loged in 
    this.toastr.success('Login Successfully!', history.state.message,{progressBar: true});
     // call global api to set in localstorage
   this.globalService.getpurposOfTransactionList()
  }
 
}
