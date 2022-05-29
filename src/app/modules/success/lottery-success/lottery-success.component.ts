import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ContactActions from 'src/app/store/actions/contact.action';
import * as PersonalInfoActions from 'src/app/store/actions/personal-info.action';
import * as ImageActions from 'src/app/store/actions/image.action';

@Component({
  selector: 'cl-lottery-success',
  templateUrl: './lottery-success.component.html',
  styleUrls: ['./lottery-success.component.scss']
})
export class LotterySuccessComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(
      ContactActions.ResetContactAction()
    );
    this.store.dispatch(
      PersonalInfoActions.ResetPersonalDataAction()
    );
    this.store.dispatch(
      ImageActions.ResetImageAction()
    );
    localStorage.removeItem('sessionID');
  }

}
