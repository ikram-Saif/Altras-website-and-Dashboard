import { Component, OnInit } from '@angular/core';
import { InboxService } from '../inbox.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private inboxService : InboxService) { }

  inboxMessage: any
  ngOnInit(): void {

    this.inboxService.getInboxMessage()
    .subscribe((response:any)=>
    {
      this.inboxMessage = response
    },
    error => console.error(error , 'error')
    
    )
  }

}
