import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder , Validators ,ValidatorFn } from '@angular/forms';
import {RegistrationService}from '../registration.service'
import  {userAgeValidator } from '../share/userAgeValidator'
import  {verficationCodeValidator } from '../share/verficationCodeValidator'
import{confirmEmailValidator} from '../share/confirmEmailValidator'
import {confirmPasswordValidator} from '../share/confirmPasswordValidator'
import { GlobalServiceService } from '../global-service.service';
import { AddressLoockupService } from '../address-loockup.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css' ]
})
export class RegistrationComponent implements OnInit {

//  registerForm !: FormGroup
  countries: any;
  countriesRx:any;
  gender:any;
  optionValue :any;
  nationalityList:any;
  occupationsList:any;
  vCode: any
  customerLookupQuery:any
  showSearchResultList: boolean =true;
  fullAddress: any;
  countryCode: any;
  
  constructor(
      private registrationServices : RegistrationService ,
      private fb:FormBuilder ,
      private globalService : GlobalServiceService ,
      private localStorage :LocalStorageService,
      private AddressService:AddressLoockupService   
    ) { }

registerForm = this.fb.group({

      fName: [null, [
                      Validators.required,
                      Validators.minLength(3)
                    ]
              ],
      lName: [null,[
                      Validators.required,
                      Validators.minLength(3)
                    ]
              ],
      aName: [null,[
                    Validators.required,
                    // Validators.pattern("^([\u0600-\u06FF]+)?$")
                  ]
              ],
      nationality: [null,Validators.required],
      customerGender: [null],
          

      country: [null,Validators.required],
      reciveCountry: [null,Validators.required]
    //})
    ,
          
      phone: [null,[
                    Validators.required,
                    Validators.pattern("[0-9]{14}$")
                  ]
            ],
      dob: [null,[
                  Validators.required,
                  userAgeValidator()
                ]
            ],
      occupation: [null,Validators.required],
      disability: [null,Validators.required],
      disabilityType: [null,Validators.required],
      code : [null , 
        //[verficationCodeValidator(this.vCode)]
        ],
        search_bar:[null , [Validators.required,Validators.minLength(1)]],
        postcode:[null , Validators.required],
        address1:[null,Validators.required],
        address2:[null],
        address3:[null],
        town:[null,Validators.required],

      email: [null,[
                    Validators.required,
                    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                  ]
              ],
      confirmEmail:[null,[
                          Validators.required,
                          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")  
                          ]
                    ],
      password:[null , Validators.required],
      confirmPassword: [null , Validators.required]

    },
    {validator: Validators.compose(
      [confirmEmailValidator , confirmPasswordValidator])
    }
    )

  

get fName(){
  return this.registerForm.get('fName');
}
get lName(){
  return this.registerForm.get('lName');
}
get aName(){
  return this.registerForm.get('aName');
}
get nationality(){
  return this.registerForm.get('nationality');
}
get customerGender(){
  return this.registerForm.get('customerGender');
}
get country(){
  return this.registerForm.get('country');
}
get reciveCountry(){
  return this.registerForm.get('reciveCountry');
}
get phone(){
  return this.registerForm.get('phone');
}
get dob(){
  return this.registerForm.get('dob');
}
get occupation(){
  return this.registerForm.get('occupation');
}
get disability(){
  return this.registerForm.get('disability');
}
get disabilityType(){
  return this.registerForm.get('disabilityType');
}
get code(){
  return this.registerForm.get('code');
}
get search_bar(){
  return this.registerForm.get('search_bar');
}
get postcode(){
  return this.registerForm.get('postcode');
}
get address1(){
  return this.registerForm.get('address1');
}
get address2(){
  return this.registerForm.get('address1');
}
get address3(){
  return this.registerForm.get('address3');
}
get town(){
  return this.registerForm.get('town');
}
get email(){
  return this.registerForm.get('email');
}
get confirmEmail(){
  return this.registerForm.get('confirmEmail');
}
get password(){
  return this.registerForm.get('password');
}
get confirmPassword(){
  return this.registerForm.get('confirmPassword');
}


getCountriesList(){

   this.registrationServices.countriesList()
    .subscribe(
      // response => console.log('successs',response),
      response =>{ this.countries = response },

      error => console.error('error' , error)
      );

}
getRXCountriesList(){
  
  this.registrationServices.countriesRXList()
  .subscribe(
    // response => console.log('successs',response),
    response => {this.countriesRx = response} ,
    error => console.error('error' , error)
    );
}
getGenderList(){
  this.registrationServices.gender()
  .subscribe(
    response => {this.gender = response} ,
    error => console.error('error' , error)
    );
}
getNationalityList(){
  this.nationalityList = this.localStorage.getNationality()
  
}
getOccupationsList(){
  this.registrationServices.occupations()
  .subscribe(
    response => {this.occupationsList = response} ,
    error => console.error('error' , error)
    );
}
getVerCode(){
  this.registrationServices.getVCode(this.phone?.value)
  .subscribe(
    (response:any) =>  { this.vCode = response.verCode
    console.log(response.verCode)
  },
    error => console.error('error' , error)
    );

}
re = false
vCodeMatch(){

  this.re = this.code?.value != this.vCode ? true : false
  return this.re ;
}
result: any = true
hasDisability(){
   this.result = this.optionValue === 'yes'?true : false;
  return this.result;
}

searchAddress(resultId:string = ''){
  let userQuery = !this.search_bar?.invalid  ? this.search_bar?.value : "a" 
    this.showSearchResultList = true
    this.countryCode = this.globalService.getCountryCode(this.country?.value ,this.countries)

    this.AddressService.AddressSearch(userQuery , resultId , this.countryCode).
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
      this.AddressService.getFullAdress(id , this.countryCode).
      subscribe((response:any)=>{
        this.fullAddress  = response.result 
        this.registerForm.patchValue(
          {
            postcode:this.fullAddress.postal_code,
            address1:this.fullAddress.line_1,
            address2:this.fullAddress.line_2,
            address3:this.fullAddress.line_3,
            town: this.fullAddress.locality,
            country : this.fullAddress.country_name
        })
        // this.fullAddress == null
        // console.log(response.result , 'full ***********address')
        this.showSearchResultList = false
      },
      error => console.error(error,'erro'))
     }
     


  }
  onSubmit() {
    console.log(this.registerForm)

    
  }
  ngOnInit(): void {
    this.getCountriesList();
    this.getRXCountriesList();
    this.getGenderList();
    this. getNationalityList();
    this.getOccupationsList();

    
}


}