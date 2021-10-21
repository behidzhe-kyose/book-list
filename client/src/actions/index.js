import { 
    SIGN_IN, 
    SIGN_OUT, 
    SET_TERM,
    FETCH_BOOKS, 
    FETCH_FAVORITES, 
    ADD_FAVORITES, 
    DELETE_FAVORITES
} from "./types";
import googleBooks from '../apis/googleBooks';
import books from '../apis/books';


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const setTerm = (term) => {
    return {
        type: SET_TERM,
        payload: term
    }
}

export const fetchBooks = (term) => async dispatch => {
    if(term) {
        const response = await googleBooks.get(`?q=${term}&filter=free-ebooks`);
        dispatch({ type: FETCH_BOOKS, payload: response.data.items })
    }
}

export const addFavorites = (book) => async dispatch => {
    console.log('post')
    const response = await books.post(`/books`, {...book});
    dispatch({type: ADD_FAVORITES, payload: response.data})
}

export const deleteFavorites = (id) => async dispatch => {
    console.log('delete')
    await books.delete(`/books/${id}`);
    dispatch({ type: DELETE_FAVORITES, payload: id})
}

export const fetchFavorites = () => async dispatch => {
    const response =  await books.get('/books');
    dispatch({type: FETCH_FAVORITES, payload: response.data})
}