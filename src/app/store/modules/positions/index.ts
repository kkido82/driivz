import { createReducer, on } from "@ngrx/store";
import { filterPosition, removeCurrentPosition, saveCurrentPosition, selectPosition } from "./actions";
import { initialState } from "./models";
import * as models from "./models";

export const positionsReducer = createReducer(
    initialState,
    on(saveCurrentPosition, (state, action) => {
        const found = state.saved.some(p =>
            p.latitude === action.position.latitude && p.longitude === action.position.longitude
        );

        if (!found) {
            return {
                ...state,
                saved: [...state.saved, action.position].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp),
                filtered: [...state.saved, action.position].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp),
            };
        }

        return { ...state };
    }),
    on(removeCurrentPosition, (state, action) => {
        const posArr = state.saved
            .filter(p => p.latitude !== action.position.latitude && p.longitude !== action.position.longitude);
            
        const filterdArr = state.filtered
            .filter(p => p.latitude !== action.position.latitude && p.longitude !== action.position.longitude);
            
        return {
            ...state,
            saved: [...posArr].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp),
            filtered: [...filterdArr].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp)
        };
    }),
    on(filterPosition, (state, action) => {
        const filtered = state.saved
            .filter(position => position.name.toLowerCase().includes(action.name));

        return {
            ...state,
            filtered: [...filtered].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp),
            searchTerm: action.name
        };
    }),
    on(selectPosition, (state, action) => {
        const posArr = state.saved
            .filter(p => p.name !== action.position.name)
            .map(pos => { return { ...pos }; })
            .map(pos => {
                if (pos.selected) {
                    pos.selected = false;
                }

                return pos;
            });

        const filteredArr = state.saved
            .filter(p => p.name !== action.position.name)
            .map(pos => { return { ...pos }; })
            .map(pos => {
                if (pos.selected) {
                    pos.selected = false;
                }

                return pos;
            });
            
        const selected = action.position.selected ? { ...action.position } : null;

        return { 
            ...state,
            saved: [...posArr, action.position].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp),
            filtered: [...filteredArr, action.position].sort((pos1, pos2) => pos1.timestamp - pos2.timestamp),
            selected
        };
    })
);

export { initialState, models };
