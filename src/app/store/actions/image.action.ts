import { createAction, props } from '@ngrx/store';

export enum ImageActionTypes {
  SET_IMAGE = '[image] set image',
  RESET_IMAGE = '[image] reset image',
}

export const SetImageAction = createAction(
    ImageActionTypes.SET_IMAGE,
  props<{ payload: string }>()
);

export const ResetImageAction = createAction(
  ImageActionTypes.RESET_IMAGE
);
