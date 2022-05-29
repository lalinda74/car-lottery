import { createAction, props } from '@ngrx/store';

export enum ResetActionTypes {
  RESET_STATE = '[state] reset root state',
}

export const SetImageAction = createAction(
  ResetActionTypes.RESET_STATE,
  props<{ payload: string }>()
);
