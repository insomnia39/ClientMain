import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent{
  choose = 1;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  updateChoose(n: number){
    this.choose = n;
  }

  login(){
    this.profileService.removeLocalProfile();
    this.profileService.init();
  }
}
