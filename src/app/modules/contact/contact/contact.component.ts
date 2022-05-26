import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'cl-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {
      this.contactForm = this.formBuilder.group({
        emailCtrl: ['', [Validators.required, Validators.pattern(this.emailRegex)]]
      })
    }

  ngOnInit(): void {
  }

  /**
   * Submit contact data via API
   */
  submitContactData(): void {
    if (this.contactForm.status === 'INVALID') {
      return;
    }
    console.log('de', this.contactForm);
    this.contactService.submitContactData().subscribe(
      (response: any) => {
        console.log('res', response);
      },
      (error: any) => {
        console.log('error', error);
      }
    )
  }

}
