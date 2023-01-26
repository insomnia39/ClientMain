import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './component/collection/collection.component';
import { EventComponent } from './component/event/event.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {path: 'event', component:EventComponent},
  {path: 'collection', component:CollectionComponent},
  {path: 'transaction', component:TransactionComponent},
  {path: '*', component:EventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
