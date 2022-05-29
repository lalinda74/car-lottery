import { createAction, props } from '@ngrx/store';

export enum PersonalDataActionTypes {
  SET_PERSONAL_DATA = '[personal-data] set personal data',
  RESET_PERSONAL_DATA = '[personal-data] reset personal data'
}

export const SetPersonalDataAction = createAction(
  PersonalDataActionTypes.SET_PERSONAL_DATA,
  props<{ firstName: string; middleName: string; dob: string }>()
);

export const ResetPersonalDataAction = createAction(
  PersonalDataActionTypes.RESET_PERSONAL_DATA
);
