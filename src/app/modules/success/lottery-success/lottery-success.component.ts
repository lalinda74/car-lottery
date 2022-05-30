import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as ContactActions from 'src/app/store/actions/contact.action';
import * as PersonalInfoActions from 'src/app/store/actions/personal-info.action';
import * as ImageActions from 'src/app/store/actions/image.action';
import { PersonalDataSelector } from '../../../store/selectors/personal.selector';
import { first, Subscription } from 'rxjs';
import { LotteryService } from 'src/app/core/services/lottery.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LotteryModel } from 'src/app/core/models/API/lottery.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'cl-lottery-success',
  templateUrl: './lottery-success.component.html',
  styleUrls: ['./lottery-success.component.scss']
})
export class LotterySuccessComponent implements OnInit, OnDestroy {

  name = '';
  userID = null;
  lotteryCount = 0;

  storeSub!: Subscription;

  constructor(private store: Store, private lotteryService: LotteryService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLotteriesCount();
    this.getLotteryID();
  }

  /**
   * Get lottery ID from route parameters
   */
  getLotteryID(): void {
    this.route.params.subscribe((params: Params) => {
      this.userID = params['userID'];
      this.getLotteryData(params['lotteryID']);
    });
  }

  /**
   * Get lottery data from backend
   * @param lotterID Lottery ID
   */
  getLotteryData(lotterID: number): void {
    this.lotteryService.getLotteryData(lotterID).subscribe(
      (response: any) => {
        this.name = response.firstName + ' ' + response.middleName;
        this.clearStore();
        this.clearToken();
      }
    )
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
    this.authService.removeToken();
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
