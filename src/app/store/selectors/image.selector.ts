import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImageState } from '../reducers/image.reducer';

export const selectImageState =
  createFeatureSelector<ImageState>('Image');

export const selectImageStringState = createSelector(
  selectImageState,
  (state: ImageState) => {
    return state.imageString;
  }
);

export const selectImageIsSet= createSelector(
  selectImageState,
  (state: ImageState) => {
    if (state!.imageString === '') {
      return false;
    }
    return true;
  }
);

export const ImageSelector = {
  selectImageStringState,
  selectImageIsSet
};
