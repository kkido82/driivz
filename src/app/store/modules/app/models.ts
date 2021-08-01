declare namespace appModel {
    export interface State {
        selectedTab: string | 'map' | 'report';
    }
}

const initialState: appModel.State = {
    selectedTab: 'map'
}

const storageKey = '__app__storage';

export { initialState, appModel, storageKey };