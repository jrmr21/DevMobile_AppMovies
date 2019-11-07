import {createStore, combineReducers, applyMiddleware} from 'redux'
import ToggleFavorite from './Reducers/favoriteReducer'
import TheMovieDBReducer from './Reducers/TheMovieDBReducer'
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    toggleFavorite : ToggleFavorite,
    theMovieDBReducer : TheMovieDBReducer
})

//la création du store
export const store = createStore(rootReducer,applyMiddleware(thunk));
