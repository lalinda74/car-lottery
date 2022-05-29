import { createReducer, on } from '@ngrx/store';
import * as ContactActions from '../actions/contact.action';

export interface ContactState {
  email: string;
}

export const initialState: ContactState = {
  email: '',
};

export const ContactReducer = createReducer(
  initialState,
  on(ContactActions.SetContactAction, (state, { payload }) => {
    return {
      ...state,
      email: payload,
    };
  }),
  on(ContactActions.ResetContactAction, (state) => {
    return {
      ...state,
      email: '',
    };
  })
);
