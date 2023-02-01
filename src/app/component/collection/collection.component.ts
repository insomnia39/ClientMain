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
          <h3>Ceritanya Beli PhotoCard Rendom sebiji</h3>
          <small>Belinya pake duit beneran, trus ntar poinnya nambah gitu, yg ini nambah 2 point loh</small>
        </div>
        <button class="btn btn-outline-dark" style="width: 100px;" (click)="addPoint(2)">Buy</button>
      </div>
      <div class="d-flex justify-content-between mb-4 pb-4">
        <div class="w-100 me-4 text-middle">
          <h3>Ini juga PhotoCard rendom, tapi 2 biji</h3>
          <small>Kalo ini nambah 5 point ehe</small>
        </div>
        <button class="btn btn-outline-dark" style="width: 100px;" (click)="addPoint(5)">Buy</button>
      </div>
      <div class="d-flex justify-content-between mb-4">
        <div class="w-100 me-4 text-middle">
          <h3>Nah, ini beli album, ga rendom tapi, dan sebiji</h3>
          <small>Nambah 20 pointnya kaka</small>
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
