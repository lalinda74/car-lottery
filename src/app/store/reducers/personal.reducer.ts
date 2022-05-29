import { createReducer, on } from '@ngrx/store';
import * as PersonalDataActions from '../actions/personal-info.action';

export interface PersonalDataState {
  firstName: string;
  middleName: string;
  dob: string;
}

export const initialState: PersonalDataState = {
  firstName: '',
  middleName: '',
  dob: '',
};

export const PersonalDataReducer = createReducer(
  initialState,
  on(
    PersonalDataActions.SetPersonalDataAction,
    (state, { firstName, middleName, dob }) => {
      return {
        ...state,
        firstName: firstName,
        middleName: middleName,
        dob: dob,
      };
    }
  ),
  on(PersonalDataActions.ResetPersonalDataAction, (state) => {
    return {
      ...state,
      firstName: '',
      middleName: '',
      dob: '',
    };
  })
);
