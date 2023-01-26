import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/model/IProfile';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  profile?: IProfile;
  
  constructor(private profileService: ProfileService) {
    this.profileService.qProfile?.subscribe(p => this.profile = p);
  }

  ngOnInit(): void {
  }

}
