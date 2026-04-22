import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-status-popup',
  templateUrl: './status-popup.component.html',
  styleUrls: ['./status-popup.component.css']
})
export class StatusPopupComponent implements OnInit {

  @Input() transactionStatus: any ; 
  logs = [
    {
        "Status": "",
        "log_date": "",
        "log_text_en": ""
    }
]

  constructor() { }

  ngOnInit(): void {
    this.transactionStatus = this.logs
  }

}
