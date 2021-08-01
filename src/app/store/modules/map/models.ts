declare namespace mapModels {
    export interface IssResponse {
        timestamp: number;
        message: string;
        iss_position: Position;
    }

    export interface Position {
        longitude: number;
        latitude: number;
    }

    export interface State {
        issResponse: IssResponse;
    }
}

const initialState: mapModels.State = {
    issResponse: {
        timestamp: 0,
        message: '',
        iss_position: {
            latitude: 0,
            longitude: 0
        }
    },
}

export { mapModels, initialState };