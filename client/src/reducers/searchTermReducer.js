const searchTermReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_TERM':
            return action.payload
        default:
            return state
    }
}

export default searchTermReducer;