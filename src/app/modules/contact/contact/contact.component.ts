import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ContactActions from 'src/app/store/actions/contact.action';
import { ContactSelector } from 'src/app/store/selectors/contact.selector';

@Component({
  selector: 'cl-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  emailRegex =
    '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$';

  storeSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.contactForm = this.formBuilder.group({
      emailCtrl: [
        '',
        [Validators.required, Validators.pattern(this.emailRegex)],
      ],
    });
  }

  ngOnInit(): void {
    this.getEmail();
  }

  /**
   * Submit contact data via API
   */
  submitContactData(): void {
    if (this.contactForm.status === 'INVALID') {
      return;
    }
    this.store.dispatch(
      ContactActions.SetContactAction({
        payload: this.contactForm.controls?.['emailCtrl'].value,
      })
    );
    this.router.navigate(['/personal']);
  }

  /**
   * Listen to e-mail from store
   */
  getEmail(): void {
    this.storeSub = this.store
      .pipe(select(ContactSelector.selectEmailState))
      .subscribe((response: string) => {
        this.contactForm?.controls['emailCtrl'].setValue(response);
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
