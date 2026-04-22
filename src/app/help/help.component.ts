import { Component, OnInit } from '@angular/core';
import { HelpService } from '../help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  helpInformation:any
  url:any
  title:any
  constructor(private helpService : HelpService) { }


  ngOnInit(): void {
    this.helpInformation =  this.helpService.helpInformation
  }
  videoUrl(url:string , title:string){
    this.url = url
    this.title = title
  }

}
