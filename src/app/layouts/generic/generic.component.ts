import { Component } from '@angular/core';

@Component({
  selector: 'cl-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss'],
})
export class GenericComponent {
  isStepOneCompleted = false;
  isStepTwoCompleted = false;
  isStepThreeCompleted = false;

  constructor() {}
}
