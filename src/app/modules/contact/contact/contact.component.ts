import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    '^[a-zA-Z0-9]+(.[_a-zA-Z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$';

  storeSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar
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
   * Submit contact data to store and redirect to next step
   */
  submitContactData(): void {
    if (this.contactForm.status === 'INVALID') {
      // this.openSnackBar('Please enter an valid e-mail.', 'close');
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

  /**
   * Open notification message
   * @param message content
   * @param action action name
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['cl-message'],
  });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
