import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-display-help-video',
  templateUrl: './display-help-video.component.html',
  styleUrls: ['./display-help-video.component.css']
})
export class DisplayHelpVideoComponent implements OnInit {
  @Input('helpVideoUrl') helpVideoUrl: any
  @Input('videoTitle') videoTitle:any
  constructor() { }

  ngOnInit(): void {

  }
  

}
