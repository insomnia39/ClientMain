import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/model/IEvent';
import { IPolling } from 'src/app/model/IPolling';
import { IProfile } from 'src/app/model/IProfile';
import { EventService } from 'src/app/service/event.service';
import { HubPollingService } from 'src/app/service/hub.polling.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'
  ]
})
export class EventComponent implements OnInit {
  choose = 0;
  profile: IProfile = {};
  event?: IEvent;
  eventActive: boolean = false;
  pollings?: IPolling[];
  latestTotalPolling?: number = 0;
  latestUsername?: string;

  constructor(private profileService: ProfileService, private pollingService: HubPollingService, private eventService: EventService) { 
  }

  async ngOnInit() {
    this.profileService.qProfile?.subscribe(p => this.profile = p);
    this.pollingService.latesPollingNumber$.subscribe(p => this.latestTotalPolling = p);
    this.pollingService.latestUsername$.subscribe(p => this.latestUsername = p);
    this.eventService.latestEvent$.subscribe(p => {
      this.event = p.event;
      this.pollings = p.pollings;
      this.latestTotalPolling = p.latestTotalPolling;
      this.eventActive = p.isActive;
    });
    await this.pollingService.connect();
    if(this.pollings){
      let pol1 = this.pollings.find(p => p.optionNumber == 1);
      let pol2 = this.pollings.find(p => p.optionNumber == 2);
      if(pol1 && pol2){
        pol1.isWin = pol1.totalPoint >= pol2.totalPoint;
        pol2.isWin = !pol1.isWin;
      }
    }
  }

  btnChoose(n: number){
    if (this.choose == n) this.choose = 0;
    else this.choose = n;
  }

  vote() {
    let profileId = this.profile.id || "";
    let eventId = this.event?.id || "";
    let pollingId = this.pollings?.find(p => p.optionNumber == this.choose)?.id || "";
    this.pollingService.polling(profileId, eventId, pollingId).subscribe(p => {
      this.profileService.getPoint(profileId);
    });
  }

}
