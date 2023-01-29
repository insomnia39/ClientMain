import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../model/IEvent';
import { IPolling } from '../model/IPolling';

interface IRunningEventDto {
  event?: IEvent;
  pollings?: IPolling[];
  latestTotalPolling?: number;
  latestUsername?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService  {
  url = environment.url.event;
  runningEvent: IRunningEventDto = {}
  runningEvent$ : BehaviorSubject<IRunningEventDto> = new BehaviorSubject<IRunningEventDto>(this.runningEvent);
  constructor(private http: HttpClient) {
    http.get<IRunningEventDto>(this.url+"/event/getRunningEvent").subscribe(p => this.runningEvent$.next(p));
  }
}
