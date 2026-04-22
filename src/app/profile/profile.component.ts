import { Component, OnInit , ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {GlobalServiceService}from '../global-service.service'
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {EditProfilePopupComponent} from '../edit-profile-popup/edit-profile-popup.component'
import { AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit ,  AfterViewChecked {

  @ViewChild(EditProfilePopupComponent,{static:false}) child !:EditProfilePopupComponent

  IsProfileUpdate:boolean =false
  cName:any
  cPassword:any
  cEmail:any
  cAddress:any
  cCountry:any
  cTown:any
  cPhone:any
  cId: any;
  customerWantToEdit:any

  constructor
  (
    private globalService : GlobalServiceService , 
    private localStorage : LocalStorageService ,
    private fb:FormBuilder,
    private ref: ChangeDetectorRef
  ) 
    { 
      
    }
 
    // customerProfileForm:any = this.fb.group({
    //   photo: [null],
    //   customerID: [null],

    // })

    ngAfterViewChecked() {
    this.child.IsprofileUpdated && this.redProfileDatafromLocalStorage()
      
  
    }
  
  ngOnInit(): void {
    this.redProfileDatafromLocalStorage()

  }
  redProfileDatafromLocalStorage(){
    this.cId = this.localStorage.getUserId()
    this.cEmail = this.localStorage.getEmail()
    this.cName = this.localStorage.getName()
    this.cPassword = this.localStorage.getOregenalPassword()
    this.cAddress = this.localStorage.getUserAddress()
    this.cCountry = this.localStorage.getUserCountry()
    this.cTown = this.localStorage.getUserTown()
    this.cPhone = this.localStorage.getPhone()
  }
}
