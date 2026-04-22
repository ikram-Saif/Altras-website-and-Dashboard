import { Component, OnInit } from '@angular/core';
import {BranchesService} from '../branches.service'
import {FormBuilder , Validators ,ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-dashboard-branches',
  templateUrl: './dashboard-branches.component.html',
  styleUrls: ['./dashboard-branches.component.css']
})
export class DashboardBranchesComponent implements OnInit {

  constructor(private branchesService : BranchesService , private fb:FormBuilder) { }
  paymentPoientCountries:any = []
  branchesDetails:any
  x :number = 12.927923
  y : number = 77.627108
  paymentPoientCountriesForm = this.fb.group({

    country: ["FR"
            ]
          });
    get country(){
      return this.paymentPoientCountriesForm.get('country');
    }

  

  ngOnInit(): void {
    this.getPaymentPaymentCountries()
    this.getCountryBranches()

  }

getPaymentPaymentCountries(){
  this.branchesService.getPointsPaymentCountries()
  .subscribe((response:any)=>

    {
    this.paymentPoientCountries = response
    // console.log(this.paymentPoientCountries)
  }

    // console.log(response)
    ,
    
    error => console.error('error' , error)

  )
}
getCountryBranches(){
  this.branchesService.getPoientPaymentCountryDetails(this.country?.value).subscribe
  ((response)=>{
    this.branchesDetails = response
    console.log(this.branchesDetails[0].position , 'details')

  },
  error => console.error(error , 'error'))
}

}
