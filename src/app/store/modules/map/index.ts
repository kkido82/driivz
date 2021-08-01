import { createReducer, on } from "@ngrx/store";
import { locationLoadedSuccess } from "./actions";
import { initialState } from "./models";
import * as models from "./models";

export const mapReducer = createReducer(
    initialState,
    on(locationLoadedSuccess, (state, action) => {
        return { ...state, issResponse: { ...action.issResponse } }
    }),

);

export { initialState, models }
