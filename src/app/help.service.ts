import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
    helpInformation = [
    {   title : 'How do i creat an account?',
       videoUrl : '../videos/Advantages-Altras.mp4'
    },
    {   title : 'How do i upload documents?',
       videoUrl : '../videos/Advantages-Altras.mp4'
    },
    {   title : 'How do i add recipients?',
    videoUrl : '../videos/Advantages-Altras.mp4'
  },
  {   title : 'How to pay cash through an agent?',
       videoUrl : '../videos/Advantages-Altras.mp4'
    },
    {   title : 'How to find out delivery addressess?',
      videoUrl : '../videos/Advantages-Altras.mp4'
  }
    ]
  constructor() { }
 
}
