import { Component, OnInit } from '@angular/core';
import{TransactionsService} from '../transactions.service'
import {LocalStorageService} from '../local-storage.service'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  closeResult = '';
  constructor(private transactionsService :TransactionsService ,
     private localStorage: LocalStorageService
     
     ) { }
     transactionList:any
     emptyTransactionList:any
     transactionInfo : any 
     transactionStatus: [] = [];
     
  ngOnInit(): void {
    this.getCustomerTransactionsHistory()
    }
  
  getCustomerTransactionsHistory()
  {
    

    this.transactionsService.getCustomerTransactionHistory()

    .subscribe((response:any) =>
              { 
                if(!response.RCode){
                  this.transactionList =  response

                }
                  if(response.RCode && response.RCode  === 1)
                   this.emptyTransactionList = response.RDesc
              },
              error => console.error('error' , error)


           )


  }
  getStatusClass(value: any) {
    let classes = ''
    switch (value) {
      case 'Error': 
       classes =  'status red-dot'
        break;

        case 'Delivered':
        classes =  'status green-dot'
        break;
        
        // break;
        // case 'Error':
        
        // break;
    }
    return classes;
  }
  // ngAfterViewInit() {
  //   const obj: Object = {
  //     prop1: 'test',
  //     prop2: true,
  //     prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
  //     prop4: 327652175423
  //   };

  //   this.ngxSmartModalService.setModalData(obj, 'myModal');
  // }
  getTransactionInfoById(id:number){

    this.transactionsService.getTransactionInfo(id)
    .subscribe((response:any) =>
              { 
                if(!response.RCode ||response.RCode  == 0 ){
                  this.transactionInfo =  response
                  console.log(this.transactionInfo , 'success')

                }
                  if(response.RCode && response.RCode  != 0){
                    this.transactionInfo = response.RDesc
                    console.log(this.transactionInfo , 'failtranInfo')
                  }
              },
              error => console.error('error' , error)
                )
  }

  getTransactionStatus(id:number){
    this.transactionsService.getTransactionStatus(id)
    .subscribe((response:any) =>
              { 
                if(!response.RCode ||response.RCode  == 0 ){
                  this.transactionStatus =  response.logs
                  // console.log(this.transactionStatus , 'success')
                }
                  if(response.RCode && response.RCode  != 0)
                   {
                     this.transactionStatus = response.RDesc
                  //  console.log(this.transactionStatus , 'failtranInfo')
                  }
              },
              error => console.error('error' , error)
                )
        }


}
