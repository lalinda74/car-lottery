import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from '../reducers/contact.reducer';

export const selectContactState =
  createFeatureSelector<ContactState>('Contact');

export const selectEmailState = createSelector(
  selectContactState,
  (state: ContactState) => {
    return state?.email;
  }
);

export const selectEmailFormFilled = createSelector(
  selectContactState,
  (state: ContactState) => {
    if (state?.email === '' || state?.email === null || state?.email === undefined) {
      return false
    }
    return true;
  }
);

export const ContactSelector = {
  selectEmailState,
  selectEmailFormFilled
};
