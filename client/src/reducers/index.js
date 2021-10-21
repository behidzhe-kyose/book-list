import { combineReducers } from "redux";
import googleReducer  from "./googleReducer";
import booksReducer from "./booksReducer";
import searchTermReducer from "./searchTermReducer";
import { setFavoritesReducer } from "./setFavoritesReducer";

export default combineReducers({
    auth: googleReducer,
    books: booksReducer,
    term: searchTermReducer,
    favorites: setFavoritesReducer
})