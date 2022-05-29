import { createReducer, on } from '@ngrx/store';
import * as ImageActions from '../actions/image.action';

export interface ImageState {
    imageString: string
}

export const initialState: ImageState = {
    imageString: ''
}

export const ImageReducer = createReducer(
    initialState,
    on(ImageActions.SetImageAction, (state, { payload }) => {
        return {
            ...state,
            imageString: payload
        };
    }),
    on(ImageActions.ResetImageAction, (state) => {
        return {
            ...state,
            imageString: ''
        };
    })
);