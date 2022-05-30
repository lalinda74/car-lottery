import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PersonalDataModel } from 'src/app/core/models/UI/personal-data.model';
import * as PersonalDataActions from '../../../store/actions/personal-info.action';
import { PersonalDataSelector } from '../../../store/selectors/personal.selector';

@Component({
  selector: 'cl-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnDestroy {

  personalForm!: FormGroup;
  today = new Date();

  storeSub!: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) {
    this.personalForm = this.formBuilder.group({
      firstNameCtrl: ['', [Validators.required]],
      secondNameCtrl: ['', [Validators.required]],
      dobCtrl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getPersonalData();
  }

  /**
   * Store personal data in store
   * @returns false if form is not valid
   */
  submitPersonalData(): void {
    if (this.personalForm.status === 'INVALID') {
      return;
    }
    this.store.dispatch(
      PersonalDataActions.SetPersonalDataAction({
        firstName: this.personalForm.controls?.['firstNameCtrl'].value,
        middleName: this.personalForm.controls?.['secondNameCtrl'].value,
        dob: this.personalForm.controls?.['dobCtrl'].value,
      })
    );
    this.router.navigate(['image-upload']);
  }

  /**
   * Listen to personal data from store
   */
  getPersonalData(): void {
    this.storeSub = this.store
      .pipe(select(PersonalDataSelector.selectPersonalInfoState))
      .subscribe((response: PersonalDataModel) => {
        this.personalForm?.controls['firstNameCtrl'].setValue(response.firstName);
        this.personalForm?.controls['secondNameCtrl'].setValue(response.middleName);
        this.personalForm?.controls['dobCtrl'].setValue(response.dob);
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
