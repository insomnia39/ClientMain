import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPointTransaction } from '../model/IPointTransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  isExist = false;
  url = environment.url.transaction;
  pointTransactions: IPointTransaction[] = [];
  qPointTransactions: BehaviorSubject<IPointTransaction[]> = new BehaviorSubject(this.pointTransactions);

  constructor(private http: HttpClient) { }

  getPointTransactions(profileId: string){
    if(this.isExist) return;
    this.http.get<IPointTransaction[]>(this.url + `pointTransaction/${profileId}/getTransactions`).subscribe(p => {
      this.qPointTransactions.next(p);
      this.isExist = true;
    });
  }

  addPoint(profileId: string, n: number){
    return this.http.get(this.url + `profile/${profileId}/${n}/addPoint`);
  }
}
