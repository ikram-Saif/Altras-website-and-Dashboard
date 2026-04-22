import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import {GlobalServiceService} from './global-service.service'


import * as $ from 'jquery'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'altras';
  constructor(private router: Router ,    private actRoute: ActivatedRoute  , private globalService:GlobalServiceService ) { }
  ngOnInit() {
   this.globalService.nationality()
   this.globalService.sudaneseBacnk()
   this.globalService.bankAccountType()
   this.globalService.getRXCountriesList();
   this.globalService.getOriginatorCountries();

}
  displayTopHeader(){

     return this.actRoute.snapshot.firstChild?.url[0].path == 'dashboard'? true: false
  }
}
