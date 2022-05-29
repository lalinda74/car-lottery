import { ActionReducer, INIT } from "@ngrx/store";
import { RootState } from ".";

export const stateMetaReducer = (
    reducer: ActionReducer<RootState>
): ActionReducer<RootState> => {
    return (state, action) => {
        if (action.type === INIT) {
            const storageValue = localStorage.getItem('state');
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem('access_token');
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem('state', JSON.stringify(nextState));
        return nextState;
    }
}