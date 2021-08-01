declare namespace positionsModels {
    export interface Position {
        id?: number;
        name: string;
        longitude: number;
        latitude: number;
        timestamp: number;
        selected: boolean;
    }

    export interface State {
        saved: Position[],
        filtered: Position[],
        selected: Position | null,
        searchTerm: string,
    }
}

const initialState: positionsModels.State = {
    saved: [],
    filtered: [],
    selected: null,
    searchTerm: ''
}

export { initialState, positionsModels };