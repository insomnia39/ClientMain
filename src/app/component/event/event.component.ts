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
  pollings?: IPolling[];
  latestTotalPolling?: number = 0;
  latestUsername?: string;

  constructor(private profileService: ProfileService, private pollingService: HubPollingService, private eventService: EventService) { 
    this.profileService.getLocalProfile();
  }

  async ngOnInit() {
    this.profileService.qProfile?.subscribe(p => this.profile = p);
    this.pollingService.latesPollingNumber$.subscribe(p => this.latestTotalPolling = p);
    this.pollingService.latestUsername$.subscribe(p => this.latestUsername = p);
    this.eventService.runningEvent$.subscribe(p => {
      this.event = p.event;
      this.pollings = p.pollings;
      this.latestTotalPolling = p.latestTotalPolling;
    });
    await this.pollingService.connect();
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
