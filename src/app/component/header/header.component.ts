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
  fileToUpload: File | null = null;
  
  constructor(private profileService: ProfileService) {
    this.profileService.qProfile?.subscribe(p => this.profile = p);
  }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    let target = <HTMLInputElement>event?.target;
    let files = target?.files;
    if(!files) return;
    let file:File = files[0];
    this.profileService.setProfilePicture(file);
  }

}
