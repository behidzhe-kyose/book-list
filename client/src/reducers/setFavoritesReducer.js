import _ from 'lodash';
import { DELETE_FAVORITES, FETCH_FAVORITES, ADD_FAVORITES } from "../actions/types"

export const setFavoritesReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_FAVORITES:
            return [...state, action.payload]
        case DELETE_FAVORITES:
            console.log((state, action.payload))
            return _.omit(state, action.payload)
        case FETCH_FAVORITES:
            return action.payload
        default:
            return state;
    }
}