import { AppState } from "./model";
import * as map from "./modules/map";
import * as positions from "./modules/positions";
import * as app from "./modules/app";
import { mapReducer } from "./modules/map";
import { routerReducer } from '@ngrx/router-store';
import { appReducer } from "./modules/app";
import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./hydration.reducer";

const initialState: AppState = {
  app: app.initialState,
  map: map.initialState,
  positions: positions.initialState
};

const reducers = {
  app: appReducer,
  map: mapReducer,
  positions: positions.positionsReducer,
  router: routerReducer,
};

const metaReducers: MetaReducer[] = [hydrationMetaReducer];

export { initialState, reducers, AppState, metaReducers };