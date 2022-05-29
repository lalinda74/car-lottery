import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import * as ImageActions from '../../../store/actions/image.action';
import { ImageSelector } from '../../../store/selectors/image.selector';
import { ContactSelector } from '../../../store/selectors/contact.selector';
import { PersonalDataSelector } from '../../../store/selectors/personal.selector';

@Component({
  selector: 'cl-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.scss'],
})
export class ProfileImageUploadComponent implements OnInit, OnDestroy {

  imageForm: FormGroup;

  WIDTH = 400;
  HEIGHT = 400;

  @ViewChild('video') public video!: ElementRef;

  @ViewChild('canvas') public canvas!: ElementRef;

  stream: any;
  captures: string = '';
  error: any;
  isCaptured!: boolean;

  requestPayload = {
    email: '',
    firstName: '',
    middleName: '',
    dob: '',
    image: ''
  };

  storeSub!: Subscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router) {
    this.imageForm = this.formBuilder.group({
      imageCtrl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getEmail();
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video?.nativeElement);
    this.captures = this.canvas.nativeElement.toDataURL('image/png');
    this.imageForm.controls['imageCtrl'].setValue(this.captures);
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto() {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures;
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  /**
   * Submit image to store
   * @returns 
   */
  submitImage(): void {
    if (this.imageForm.status === 'INVALID') {
      return;
    }
    this.store.dispatch(
      ImageActions.SetImageAction({
        payload: this.captures,
      })
    );
    this.getContactState();
    this.getPersonalDataState();
    this.requestPayload.image = this.captures;
    this.contactService.submitLotteryData(this.requestPayload).subscribe(
      (data: any) => {
        this.router.navigate(['success']);
      },
      (error: any) => {
        console.log('an error occurred');
      }
    );
  }

  /**
   * Listen to image from store
   */
  getEmail(): void {
    this.storeSub = this.store
      .pipe(select(ImageSelector.selectImageStringState))
      .subscribe((response: string) => {
        this.captures = response;
        this.capture();
        this.setPhoto();
        this.imageForm?.controls['imageCtrl'].setValue(response);
        this.isCaptured = true;
      });
  }

  getContactState(): void {
    this.storeSub = this.store
      .pipe(select(ContactSelector.selectEmailState))
      .subscribe((email: string) => {
        this.requestPayload.email = email;
      });
  }

  getPersonalDataState(): void {
    this.storeSub = this.store
      .pipe(select(PersonalDataSelector.selectPersonalInfoState))
      .subscribe((personalDataResponse: any) => {
        this.requestPayload.firstName = personalDataResponse.firstName;
        this.requestPayload.middleName = personalDataResponse.middleName;
        this.requestPayload.dob = personalDataResponse.dob;
      });
  }

  ngOnDestroy(): void {
    this.stream.getTracks().forEach(function(track: any) {
      if (track.readyState == 'live') {
          track.stop();
      }
    });
  }
}
