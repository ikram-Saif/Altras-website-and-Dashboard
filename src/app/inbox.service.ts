import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class InboxService {
  
constructor(private mainSerive:MainServiceService , private localStorage: LocalStorageService) { }
  user = this.localStorage.getEmail()
  password = this.localStorage.getPassword()

getInboxMessage(){

  return this.mainSerive.get([{'user':this.user,'pwd':this.password,'func':'62'}])

}
}
