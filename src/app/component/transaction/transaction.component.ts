import { Component, OnInit } from '@angular/core';
import { IPointTransaction } from 'src/app/model/IPointTransaction';
import { IProfile } from 'src/app/model/IProfile';
import { ProfileService } from 'src/app/service/profile.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styles: [
  ]
})
export class TransactionComponent implements OnInit {
  profile: IProfile = {};
  pointTransactions: IPointTransaction[] = [];
  constructor(private transactionService: TransactionService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.transactionService.qPointTransactions.subscribe(p => this.pointTransactions = p);
    this.transactionService.getPointTransactions(this.profileService.profile.id || "");
  }
}
