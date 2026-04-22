import { Component, OnInit , Input } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-reciver-details-popup',
  templateUrl: './reciver-details-popup.component.html',
  styleUrls: ['./reciver-details-popup.component.css']
})
export class ReciverDetailsPopupComponent implements OnInit {

  @Input() receiverDetails:any
  nationalityList: any = this.localStorage.getNationality()
  constructor( private localStorage: LocalStorageService) { }
 

  ngOnInit(): void {
// console.log(this.receiverDetails , 'this')

  }
  getReceiverNationality(natId:any){

    let reNat = this.nationalityList.filter((nat:any) => nat.CountryID === natId)[0]
    return reNat?.Country? reNat?.Country : null
    
  }

}
