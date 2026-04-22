import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentsService {
  
  constructor(private mainSerive:MainServiceService , private localStorage: LocalStorageService) { }
  user = this.localStorage.getEmail()
  password = this.localStorage.getPassword()


  getProofTypeList(docType:string){
    let param = {} 
    if(docType == 'Identity')
       param ={'user':this.user,'pwd':this.password,'func':'38'}   
      if(docType == 'Address')
       param ={'user':this.user,'pwd':this.password,'func':'40'}   
      if(docType == 'Source OF Fund')
       param ={'func':'68'}   

      return this.mainSerive.get([param])

  }
}
