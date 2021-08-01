export interface IssResponse {
    timeStamp: number;
    message: string;
    iss_position: Position;
}

export interface Position {
    longitude: string;
    latitude: string;
}