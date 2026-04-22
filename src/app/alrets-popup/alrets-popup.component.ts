import { Component,OnInit  , Input,OnChanges , SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-alrets-popup',
  templateUrl: './alrets-popup.component.html',
  styleUrls: ['./alrets-popup.component.css']
})
export class AlretsPopupComponent implements OnInit , OnChanges{

  @Input()
  responseMessage :any
  // @Input()
  // responsetype : any

  constructor() { }
  ngOnChanges(change :SimpleChanges){
    this.responseMessage = change.responseMessage.currentValue
    // this.responsetype = change.responsetype.currentValue

  }


  ngOnInit(): void {

  }

}
