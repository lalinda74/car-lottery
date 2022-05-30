import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LotteryModel } from 'src/app/core/models/API/lottery.model';
import { LotteryService } from 'src/app/core/services/lottery.service';
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
    '^[a-zA-Z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+\\.[a-z0-9]{1,}$';

  storeSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar,
    private lotteryService: LotteryService
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
      this.openSnackBar('Please enter an valid e-mail.', 'close');
      return;
    }
    else {
      this.checkEmailExists(this.contactForm.controls?.['emailCtrl'].value);
    }
    
  }

  /**
   * Check email is exists in the backend
   * @TODO Checking email exists going through the whole array temporirily since there is no proper API
   * @param newEmail Email
   */
  checkEmailExists(newEmail: string): void {
    let isEmailExists = false;
    this.lotteryService.checkEmailExist(this.contactForm.controls?.['emailCtrl'].value).subscribe(
      (response: any) => {
        response.forEach((element: LotteryModel) => {
          if (newEmail === element.email) {
            isEmailExists = true;
          }
        });
        if (isEmailExists) {
          this.openSnackBar('You have already entered with this e-mail', 'close');
        } else {
          this.store.dispatch(
            ContactActions.SetContactAction({
              payload: newEmail,
            })
          );
          this.router.navigate(['/personal'], { replaceUrl: true });
        }
      },
      (error: any) => {
        this.openSnackBar('Something unexpected happened. Please try again.', 'close');
      }
    );
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
