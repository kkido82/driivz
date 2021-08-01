import { createAction, props } from "@ngrx/store";
import { mapModels } from "./models";

export const GET_LOCATION = '[Map Component] GetCurrentLocation';
export const LOCATION_LOADED = '[Map Component] LocationLoaded';
export const LOCATION_LOAD_FAILED = '[Map Component] LocationLoadedFailed';

export const getLocation = createAction(GET_LOCATION);
export const locationLoadedSuccess = createAction(LOCATION_LOADED, props<{issResponse: mapModels.IssResponse}>());
export const locationLoadedFailed = createAction(LOCATION_LOAD_FAILED);
