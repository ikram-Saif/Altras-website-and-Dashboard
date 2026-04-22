import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-transaction-details-popup',
  templateUrl: './transaction-details-popup.component.html',
  styleUrls: ['./transaction-details-popup.component.css']
})
export class TransactionDetailsPopupComponent implements OnInit {

  @Input() transactionInfo: any ; 
  constructor() { }
   initialTransactionInfo = {
    "TransactionID": "",
    "RxAName": "",
    "RxEName": "",
    "RxPhone": "",
    "RxCountry": "",
    "RxCity": " ",
    "SumSend": "",
    "SumPaid": "",
    "TxCurrency": "",
    "Rate": "",
    "Fees": "",
    "SumRec": "",
    "RxCurrency": "",
    "SentDate": "",
    "Status": "",
    "ExecutedDate": "",
    "CrditCardFees": "",
    "OurFees": null
}
  ngOnInit(): void {
    this.transactionInfo = this.initialTransactionInfo
  }
  cleanTransactionInfo(){
    this.transactionInfo =this.initialTransactionInfo

  }
}
