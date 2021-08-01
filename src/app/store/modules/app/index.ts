import { createReducer, on } from "@ngrx/store";
import { selectTab } from "./actions";
import { appModel, initialState } from "./models";

export const appReducer = createReducer(
    initialState,
    on(selectTab, (state, action) => {
        return {
            ...state,
            selectedTab: action.tab
        };
    })
);

export { initialState, appModel };