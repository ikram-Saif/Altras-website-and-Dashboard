import { Component, OnInit, Input , OnChanges, SimpleChanges ,Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { confirmPasswordValidator } from '../share/confirmPasswordValidator';
import Swal from 'sweetalert2';
import { EditCustomerProfileService } from '../edit-customer-profile.service';
import { GlobalServiceService } from '../global-service.service';
import {LocalStorageService } from '../local-storage.service'
import { AddressLoockupService} from '../address-loockup.service'
import {Md5} from 'ts-md5/dist/md5';





@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent implements OnInit,OnChanges {
  // @ViewChild('closebutton') closebutton : any;
   md5 = new Md5();
  getVerCode: boolean = false;
  countryCod = this.localStorageService.getCountryCode()
  customerLookupQuery:any
  fullAddress:any = null
  showSearchResultList: boolean = true;
  @Input()editOption:any
  IsprofileUpdated:boolean =false 
  constructor(
    private fb:FormBuilder,
    private editProfileService:EditCustomerProfileService ,
    private globalService:GlobalServiceService,
    private localStorageService : LocalStorageService,
    private AddressService:AddressLoockupService 
    ) {}
// Edit Email Form
  editEmailForm = this.fb.group({
    customerEmail: [null, [ 
                            Validators.required, 
                            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                          ]
                    ]
  })
  //Edit Password Form
  editPasswordForm = this.fb.group({
    oldPassword: [null , [Validators.required]],
    password: [null, [ 
                            Validators.required, 
                          ]
                    ],
    confirmPassword: [null, [ 
      Validators.required, 
    ]
  ]
  
  },
  {validator: Validators.compose(
    [confirmPasswordValidator])
  })
  // edit customer phone 
  editPhoneForm = this.fb.group({
    customerPhone: [null, [ 
                            Validators.required, 
                          ]
                    ]
  })
  verCodeForm = this.fb.group({
    verCode: [null, [ 
                            Validators.required, 
                          ]
                    ]
  })
  // edit customer Address
  editAddressForm = this.fb.group({
    search_bar:[null , [Validators.required,Validators.minLength(1)]],
    customerPostcode:[null , Validators.required],
    customerAddress1:[null,Validators.required],
    customerAddress2:[null],
    customerAddress3:[null],
    customerTown:[null,Validators.required],
    customerCountry:[null,Validators.required]
  })
  // edit all profile (password , Email)
  editAllProfileForm = this.fb.group({
    customerEmail:[null , Validators.required],
    oldPassword: [null , [Validators.required]],
    password: [null, [ 
                            Validators.required, 
                          ]
                    ],
    confirmPassword: [null, [ 
      Validators.required, 
    ]
  ]
  }, {validator: Validators.compose(
    [confirmPasswordValidator])
  })
  get search_bar(){
    return this.editAddressForm.get('search_bar')
  }
  get customerPostcode(){
    return this.editAddressForm.get('customerPostcode')
  }
  get customerAddress1(){
    return this.editAddressForm.get('customerAddress1')
  }
  get customerAddress2(){
    return this.editAddressForm.get('customerAddress2')
  }
  get customerAddress3(){
    return this.editAddressForm.get('customerAddress3')
  }
  get customerTown(){
    return this.editAddressForm.get('customerTown')
  }
  get customerCountry(){
    return this.editAddressForm.get('customerCountry')
  }
  get verCode(){
    return this.verCodeForm.get('verCode');
  }
  get customerPhone(){
    return this.editPhoneForm.get('customerPhone');
  }
  get customerEmail(){
    return this.editEmailForm.get('customerEmail');
  }
 
  get password(){
    return this.editPasswordForm.get('password');
  }
  get oldPassword(){
    return this.editPasswordForm.get('oldPassword');
  }
  get confirmPassword(){
    return this.editPasswordForm.get('confirmPassword');
  }
  get editAllProfileCustomerEmail(){
    return this.editAllProfileForm.get('customerEmail');
  }
  get editAllProfileNewPassword(){
    return this.editAllProfileForm.get('password');
  }
  get editAllProfileOldPassword(){
    return this.editAllProfileForm.get('oldPassword');
  }
  get editAllProfileConfirmPassword(){
    return this.editAllProfileForm.get('confirmPassword');
  }

  ngOnChanges(change :SimpleChanges){
    this.editOption = change.editOption.currentValue
    this.IsprofileUpdated = false

  }
  ngOnInit(): void {

  }
  editCustomerEmail(){
    this.editProfileService.editCustomerEmail(this.customerEmail?.value)
    .subscribe( (response:any)=>
    {
      if(!response.RCode ||response.RCode  == 0 ){
      // console.log(response.RDesc)

      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: response.RDesc,
        })
        this.UpdateLocalStorageWithNewData('Email', this.customerEmail?.value)
        this.editEmailForm.reset()
        this.IsprofileUpdated = true


    }
      if(response.RCode && response.RCode  != 0){
        // console.log(response.RDesc)

        Swal.fire('oops!', response.RDesc, 'error')
      }
     },
    (error:any) => Swal.fire('Error!', error, 'error')  )
  }
  editCustomerPassword(){

    this.editProfileService.editCustomerPassword(this.password?.value , this.oldPassword?.value)
    .subscribe((response:any)=> {
      // this.responseMessage = response.RDesc
      if(!response.RCode ||response.RCode  == 0 ){
        // console.log(response.RDesc)

        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: response.RDesc,
          })
          this.UpdateLocalStorageWithNewData('pwd', this.md5.appendStr(this.password?.value).end())
          this.IsprofileUpdated = true
          this.editPasswordForm.reset()
      }
        if(response.RCode && response.RCode  != 0){
          // console.log(response.RDesc)

          Swal.fire('oops!', response.RDesc, 'error')

        }
    } ,
(error:any) => Swal.fire('Error!', error, 'error')  
    )
  }

  sendVervicationCodeToNewPhone(){

    this.globalService.getVCode(this.customerPhone?.value).
    subscribe((response:any)=>{
      if(!response.RCode ||response.RCode  == 0 ){

        this.getVerCode = true
      }
        if(response.RCode && response.RCode  != 0){

          Swal.fire('oops!', response.RDesc, 'error')
          this.getVerCode = false


        }
    } ,
    (error:any) => Swal.fire('Error!', error, 'error')  
    
    )
  }


  updateCustomerPhone(){
    this.editProfileService.editCustomerPhone(this.customerPhone?.value , this.verCode?.value)
    .subscribe((response:any)=>{
      if(!response.RCode ||response.RCode  == 0 ){
        Swal.fire('success!', response.RDesc, 'success')

        this.UpdateLocalStorageWithNewData('PhoneNo', this.customerPhone?.value)
        this.IsprofileUpdated = true

          this.verCodeForm.reset()
          this.editPhoneForm.reset()


      }
        if(response.RCode && response.RCode  != 0){

          Swal.fire('oops!', response.RDesc, 'error')


        }
    } ,
    (error:any) => Swal.fire('Error!', error, 'error')  
    )
  }
  //edit customer Address
  updateCustomerAddress(){

    this.editProfileService.updateCustomerAddress(this.editAddressForm.value).
    subscribe((response:any)=>{
      if(!response.RCode ||response.RCode  == 0 ){
        // console.log(response.RDesc)
  
        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: response.RDesc,
          })
          this.editAddressForm.reset()
          this.UpdateLocalStorageWithNewData_object(
            {
            'Address': this.fullAddress.line_1,
            'PostCode':this.fullAddress.postal_code,
            'Town':this.fullAddress.locality
          })
          this.IsprofileUpdated = true
          // this.UpdateLocalStorageWithNewData({'Address':this.customerAddress1 ,})
      }
        if(response.RCode && response.RCode  != 0){
          // console.log(response.RDesc)
  
          Swal.fire('oops!', response.RDesc, 'error')
        }
       },
      (error:any) => Swal.fire('Error!', error, 'error')  )

  }
  searchAddress(resultId:string = ''){
    let userQuery = !this.search_bar?.invalid  ? this.search_bar?.value : "a" 
    this.showSearchResultList = true

    this.AddressService.AddressSearch(userQuery , resultId , this.countryCod).
    subscribe((response:any)=>{
      this.customerLookupQuery = response.results
      // console.log(this.customerLookupQuery[0].labels, 'postcode response')
    },
     error => console.error(error , 'error')
     )
  }
  getMoreLoockupResult(count:number , id:string)
  {
    // console.log(count, 'response result need for another call to find function if count more than one')
     if(count != 1){
      //another reques to find nested adress
      console.log(id, 'id used in another request')
      this.searchAddress(id)
     }
     // anther request to  api to get full adress
     if(count == 1){
      //another reques to  Retrieve api
      // console.log(id ,'id used in another request to get full adress')
      this.AddressService.getFullAdress(id , this.countryCod).
      subscribe((response:any)=>{
        this.fullAddress  = response.result 
        this.editAddressForm.patchValue(
          {
            customerPostcode:this.fullAddress.postal_code,
            customerAddress1:this.fullAddress.line_1,
            customerAddress2:this.fullAddress.line_2,
            customerTown: this.fullAddress.locality,
            customerCountry : this.fullAddress.country_name
        })
        // this.fullAddress == null
        // console.log(response.result , 'full ***********address')
        this.showSearchResultList = false
      },
      error => console.error(error,'erro'))
     }
     


  }

  editAllProfile(){
    this.editProfileService.editCustomerEmail(this.editAllProfileCustomerEmail?.value)
    .subscribe( (response:any)=>
    {
      if(!response.RCode ||response.RCode  == 0 )
      {
         // after edit customer email request is true another request call to edit customer password
          this.editProfileService.editCustomerPassword
          (
                      this.editAllProfileNewPassword?.value,
                      this.editAllProfileOldPassword?.value
          )
          .subscribe((response:any)=>
          {
            if(!response.RCode ||response.RCode  == 0 ){
              Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: response.RDesc,
              })

              this.UpdateLocalStorageWithNewData_object(
                {
                  'pwd': this.md5.appendStr(this.editAllProfileNewPassword?.value).end(),
                  'Email':this.editAllProfileNewPassword?.value,
              })
                this.IsprofileUpdated = true
                this.editAllProfileForm.reset()

            }
            if(response.RCode && response.RCode  != 0){
              // console.log(response.RDesc)
      
              Swal.fire('oops!', response.RDesc, 'error')
            }
          },
                  (error:any) => Swal.fire('Error!', error, 'error')
                )
      }

    if(response.RCode && response.RCode  != 0){
      // console.log(response.RDesc)

      Swal.fire('oops!', response.RDesc, 'error')
    }
     },
    (error:any) => Swal.fire('Error!', error, 'error') 
     )
  }
  UpdateLocalStorageWithNewData(lable:string, updatedDate: any){
    
    this.localStorageService.updateCustomerData(lable,updatedDate)
    //get profile display data
    // this.getProfileData()

  }
  // getProfileData() {
  //   throw new Error('Method not implemented.');
  // }
  UpdateLocalStorageWithNewData_object(updatedData:object)
{  this.localStorageService.storeCustomerDataInLocalStorage(updatedData)
}  
}
