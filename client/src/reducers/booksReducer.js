import _ from 'lodash';
import { FETCH_BOOKS } from "../actions/types";


const booksReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_BOOKS:
            return {..._.mapKeys(action.payload, 'id')}
        default:
            return state
    }
}

export default booksReducer;