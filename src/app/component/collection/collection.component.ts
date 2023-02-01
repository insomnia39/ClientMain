import { Component } from '@angular/core';
import { IProfile } from 'src/app/model/IProfile';
import { ProfileService } from 'src/app/service/profile.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-collection',
  template: `
    <div>
      <div class="d-flex justify-content-between mb-4 pb-4">
        <div class="w-100 me-4 text-middle">
          <h3>1 PhotoCard - Lunar New Year Edition</h3>
          <small>Rp 49000 | +2 point</small>
        </div>
        <button class="btn btn-outline-dark" style="width: 100px;" (click)="addPoint(2)">Buy</button>
      </div>
      <div class="d-flex justify-content-between mb-4 pb-4">
        <div class="w-100 me-4 text-middle">
          <h3>2 PhotoCard - Lunar New Year Edition</h3>
          <small>Rp 89.000 | +5 point</small>
        </div>
        <button class="btn btn-outline-dark" style="width: 100px;" (click)="addPoint(5)">Buy</button>
      </div>
      <div class="d-flex justify-content-between mb-4">
        <div class="w-100 me-4 text-middle">
          <h3>Album A - First Edition</h3>
          <small>Rp 349.000 | +20 point</small>
        </div>  
        <button class="btn btn-outline-dark" style="width: 100px;" (click)="addPoint(20)">Buy</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class CollectionComponent{
  profile: IProfile = {};
  constructor(private profileService: ProfileService, private transactionService: TransactionService) {
    this.profileService.qProfile?.subscribe(p => this.profile = p);
  }

  addPoint(n: number){
    this.transactionService.addPoint(this.profile.id || "", n).subscribe(
      () => {
        this.profileService.getPoint(this.profile.id || "");
      }
    );
  }

}
