import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-event',
  template: `
    <p>
      event works!
    </p>
  `,
  styles: [
  ]
})
export class EventComponent implements OnInit {

  constructor(private profileService: ProfileService) { 
    this.profileService.getLocalProfile();
  }

  ngOnInit(): void {
  }

}
