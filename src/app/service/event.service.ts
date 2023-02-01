import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../model/IEvent';
import { IPolling } from '../model/IPolling';

interface ILatestEventDto {
  event?: IEvent;
  pollings?: IPolling[];
  latestTotalPolling?: number;
  latestUsername?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventService  {
  url = environment.url.event;
  latestEvent: ILatestEventDto = { isActive: false };
  latestEvent$ : BehaviorSubject<ILatestEventDto> = new BehaviorSubject<ILatestEventDto>(this.latestEvent);
  constructor(private http: HttpClient) {
    http.get<ILatestEventDto>(this.url+"/event/getLatestEvent").subscribe(p => this.latestEvent$.next(p));
  }
}
