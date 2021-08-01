import { mapModels } from './modules/map/models';
import { positionsModels } from './modules/positions/models';
import { appModel } from './modules/app/models';

export interface AppState {
    app: appModel.State,
    map: mapModels.State,
    positions: positionsModels.State
}
