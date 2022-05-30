import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LotteryService } from 'src/app/core/services/lottery.service';
import * as ImageActions from '../../../store/actions/image.action';
import { ImageSelector } from '../../../store/selectors/image.selector';
import { ContactSelector } from '../../../store/selectors/contact.selector';
import { PersonalDataSelector } from '../../../store/selectors/personal.selector';
import { PersonalDataModel } from 'src/app/core/models/UI/personal-data.model';
import { LotteryModel } from 'src/app/core/models/API/lottery.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ContactActions from 'src/app/store/actions/contact.action';
import * as PersonalInfoActions from 'src/app/store/actions/personal-info.action';

@Component({
  selector: 'cl-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
})
export class ProfileImageUploadComponent implements OnInit, OnDestroy {

  imageForm: FormGroup;

  requestPayload: LotteryModel = {
    email: '',
    firstName: '',
    middleName: '',
    dob: '',
    image: ''
  };

  fileToUpload!: any;
  imageUrl = '../../../../assets/images/img-preview.png';

  storeSub!: Subscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private lotteryService: LotteryService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.imageForm = this.formBuilder.group({
      imageCtrl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getImage();
  }

  /**
   * Submit image to store
   * @returns 
   */
  submitImage(): void {
    if (this.imageForm.status === 'INVALID') {
      this.openSnackBar('Please upload an image of you.', 'close');
      return;
    }
    this.constructPayload();
    this.lotteryService.submitLotteryData(this.requestPayload).subscribe(
      (data: LotteryModel) => {
        this.router.navigate(['success', data?.id], { replaceUrl: true });
        this.clearStore();
      },
      (error: any) => {
        this.openSnackBar('An error occurred while saving lottery. Please try again.', 'close');
      }
    );
  }

  /**
   * Construct request payload
   */
  constructPayload(): void {
    this.getContactState();
    this.getPersonalDataState();
    this.requestPayload.image = this.imageUrl;
  }

  /**
   * Listen to image from store
   */
  getImage(): void {
    this.storeSub = this.store
      .pipe(select(ImageSelector.selectImageStringState))
      .subscribe((response: string) => {
        this.imageForm?.controls['imageCtrl'].setValue(response);
      });
  }

  /**
   * Update image in store
   */
  updateImageInStore(): void {
    this.store.dispatch(
      ImageActions.SetImageAction({
        payload: this.imageUrl,
      })
    );
  }

  /**
   * Get email state from store
   */
  getContactState(): void {
    this.storeSub = this.store
      .pipe(select(ContactSelector.selectEmailState))
      .subscribe((email: string) => {
        this.requestPayload.email = email;
      });
  }

  /**
   * Get personal data state from store
   */
  getPersonalDataState(): void {
    this.storeSub = this.store
      .pipe(select(PersonalDataSelector.selectPersonalInfoState))
      .subscribe((personalDataResponse: PersonalDataModel) => {
        this.requestPayload.firstName = personalDataResponse.firstName;
        this.requestPayload.middleName = personalDataResponse.middleName;
        this.requestPayload.dob = personalDataResponse.dob;
      });
  }

  /**
   * Get image from store
   */
  getImageFromStore(): void {
    this.storeSub = this.store
      .pipe(select(ImageSelector.selectImageStringState))
      .subscribe((imageString: string) => {
        console.log('imageString', imageString);
        this.imageForm?.controls['imageCtrl'].setValue(imageString);
        this.imageUrl = imageString;
      });
  }

  /**
   * Upload image to preview
   * @param file File
   */
  handleFileInput(file: any) {
    const file1= file.target?.files;
    this.fileToUpload = file1.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.imageForm?.controls['imageCtrl'].setValue(this.imageUrl);
    }
    reader.readAsDataURL(this.fileToUpload);
    // this.updateImageInStore();
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

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
