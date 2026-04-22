import { Injectable } from '@angular/core';
import {MainServiceService} from './main-service.service'


@Injectable({
  providedIn: 'root'
})
export class DeliverAddressServiceService {

  constructor(private mainSerive:MainServiceService) { }
}
