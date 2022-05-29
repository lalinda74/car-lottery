import { ActionReducerMap, MetaReducer } from "@ngrx/store";
// import { ContactEffect } from "./effects/contact.effect";
import { ContactReducer, ContactState } from "./reducers/contact.reducer";
import { PersonalDataReducer, PersonalDataState } from "./reducers/personal.reducer";
import { ImageReducer, ImageState } from "./reducers/image.reducer";
import { stateMetaReducer } from "./state-refresh.reducer";

export interface RootState {
    Contact: ContactState,
    PersonalData: PersonalDataState,
    Image: ImageState
}

export const appReducers: ActionReducerMap<RootState> = {
    Contact: ContactReducer,
    PersonalData: PersonalDataReducer,
    Image: ImageReducer
}

export const metaReducers: MetaReducer[] = [
    stateMetaReducer
];

export const effects = [
    // ContactEffect
]