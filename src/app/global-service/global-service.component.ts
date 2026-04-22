import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../global-service.service'

@Component({
  selector: 'app-global-service',
  templateUrl: './global-service.component.html',
  styleUrls: ['./global-service.component.css']
})
export class GlobalServiceComponent implements OnInit {

  constructor(private globalService : GlobalServiceService ) { }

  ngOnInit(): void {
  }
  

}
