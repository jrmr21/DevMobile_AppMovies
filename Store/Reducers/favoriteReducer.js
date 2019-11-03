import { FILMS_INIT } from "../Actions/FilmsAction";

const initialState = { favoritesFilm: [] }

export default (state = initialState, action) => {


    console.log("FAVORITE REDUCER ACTION", action)
    return { favoritesFilm: action.payload };



}

