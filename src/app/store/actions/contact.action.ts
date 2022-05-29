import { createAction, props } from '@ngrx/store';

export enum ContactActionTypes {
  REQUEST_CONTACT = '[contact] set contact',
  RESET_CONTACT = '[contact] reset contact',
}

export const SetContactAction = createAction(
  ContactActionTypes.REQUEST_CONTACT,
  props<{ payload: string }>()
);

export const ResetContactAction = createAction(
  ContactActionTypes.RESET_CONTACT
);