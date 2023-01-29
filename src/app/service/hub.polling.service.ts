import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IMessage {
  Username: string;
  LatestPoint: number;
}

@Injectable({
  providedIn: 'root'
})
export class HubPollingService {
  private hubConnection?: HubConnection;
  private url = environment.url.event;

  latestUsername$ : BehaviorSubject<string> = new BehaviorSubject<string>("Votes Received");
  latesPollingNumber$ : BehaviorSubject<number> = new BehaviorSubject<number>(100);
  
  constructor(private http: HttpClient) {
  }

  async connect() {
    this.hubConnection = new HubConnectionBuilder().withUrl(this.url).build();
    this.hubConnection.on("newPolling", (msg: IMessage) => {
      console.log(msg);
      this.latestUsername$.next(msg.Username);
      this.latesPollingNumber$.next(msg.LatestPoint);
    });
    await this.hubConnection.start();
  }

  polling(profileId: string, eventId: string, pollingId: string) {
    return this.http.post(this.url + "pollingHub/sendPolling", { eventId: eventId, profileId: profileId, pollingId: pollingId });
  }
}
