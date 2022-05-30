import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as ContactActions from 'src/app/store/actions/contact.action';
import * as PersonalInfoActions from 'src/app/store/actions/personal-info.action';
import * as ImageActions from 'src/app/store/actions/image.action';
import { PersonalDataSelector } from '../../../store/selectors/personal.selector';
import { first, Subscription } from 'rxjs';
import { LotteryService } from 'src/app/core/services/lottery.service';

@Component({
  selector: 'cl-lottery-success',
  templateUrl: './lottery-success.component.html',
  styleUrls: ['./lottery-success.component.scss']
})
export class LotterySuccessComponent implements OnInit, OnDestroy {

  name = '';
  lotteryCount = 0;

  storeSub!: Subscription;

  constructor(private store: Store, private lotteryService: LotteryService) {
    this.getPersonalDataState();
  }

  ngOnInit(): void {
    this.getLotteriesCount();
  }

  /**
   * Clear store
   */
  clearStore(): void {
    this.store.dispatch(
      ContactActions.ResetContactAction()
    );
    this.store.dispatch(
      PersonalInfoActions.ResetPersonalDataAction()
    );
    this.store.dispatch(
      ImageActions.ResetImageAction()
    );
  }

  /**
   * Clear localstorage
   */
  clearToken(): void {
    localStorage.removeItem('sessionID');
  }

  /**
   * Get personal data state from store
   */
  getPersonalDataState(): void {
    this.storeSub = this.store
      .pipe(select(PersonalDataSelector.selectPersonalInfoState), first() )
      .subscribe((personalDataResponse: any) => {
        this.name = personalDataResponse.firstName + ' ' + personalDataResponse.middleName;
        this.clearStore();
        this.clearToken();
      });
  }

  /**
   * Get lotteries count
   */
  getLotteriesCount(): void {
    this.lotteryService.getLotteryCount().subscribe(
      (data: number) => {
        this.lotteryCount = data;
      },
      (error: any) => {
        console.log('an error occurred');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
