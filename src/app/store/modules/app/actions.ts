import { createAction, props } from "@ngrx/store";

export const SELECT_TAB = '[App Component] SelectTab';

export const selectTab = createAction(SELECT_TAB, props<{tab: 'map' | 'report' | string}>());