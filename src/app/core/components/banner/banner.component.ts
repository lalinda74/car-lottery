import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ContactSelector } from '../../../store/selectors/contact.selector';
import { PersonalDataSelector } from 'src/app/store/selectors/personal.selector';

@Component({
  selector: 'cl-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  isStepOneCompleted = false;
  isStepTwoCompleted = false;
  isStepThreeCompleted = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getEmailState();
    this.getPersonalDataFilledState();
  }

  /**
   * Get email is filled or not
   */
  getEmailState(): void {
    this.store
      .pipe(select(ContactSelector.selectEmailFormFilled))
      .subscribe((status: boolean) => {
        this.isStepOneCompleted = status;
      });
  }

  /**
   * Get Personal data filled or not state
   * @returns Observable
   */
  getPersonalDataFilledState(): void {
    this.store
      .pipe(select(PersonalDataSelector.selectPersonalDataFilled))
      .subscribe((status: boolean) => {
        this.isStepTwoCompleted = status;
      });
  }

}
