import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonalDataState } from '../reducers/personal.reducer';

export const selectPersonalState =
  createFeatureSelector<PersonalDataState>('PersonalData');

export const selectPersonalInfoState = createSelector(
    selectPersonalState,
  (state: PersonalDataState) => {
      return state;
  }
);

export const selectPersonalDataFilled = createSelector(
  selectPersonalState,
  (state: PersonalDataState) => {
    if (state?.firstName === '' || state?.middleName === null || state?.dob === undefined) {
      return false
    }
    return true;
  }
);

export const PersonalDataSelector = {
    selectPersonalInfoState,
    selectPersonalDataFilled
};
