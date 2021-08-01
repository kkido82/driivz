import { createAction, props } from "@ngrx/store";
import { positionsModels } from "./models";

export const SAVE_POSITION = '[Positions Component] SaveCurrentPosition';
export const REMOVE_POSITION = '[Positions Component] RemovePosition';
export const FILTER_POSITIONS = '[Positions Component] FilterPositions';
export const SELECT_POSITION = '[Positions Component] SelectPositions';

export const saveCurrentPosition = createAction(SAVE_POSITION, props<{ position: positionsModels.Position }>());
export const removeCurrentPosition = createAction(REMOVE_POSITION, props<{ position: positionsModels.Position }>());
export const filterPosition = createAction(FILTER_POSITIONS, props<{ name: string }>());
export const selectPosition = createAction(SELECT_POSITION, props<{ position: positionsModels.Position }>());