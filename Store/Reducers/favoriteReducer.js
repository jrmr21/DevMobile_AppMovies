import { FILMS_INIT } from "../Actions/FilmsAction";

const initialState = {favoritesFilm:[]}

export default (state = initialState, action) => {
   
    switch (action.type) {
        case FILMS_INIT:
            // console.log("FILMS INIT",action)
            return { favoritesFilm: action.payload };
    }
    return state;


    // let nextState

    // switch (action.type) {

    //     case 'TOGGLE_FAVORITE': 
    //         const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
    //         if (favoriteFilmIndex !== -1){
    //             //suppression
    //             nextState = {
    //                 ...state,
    //                 favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
    //             }
    //         }else{
    //             nextState ={
    //                 ...state, // on récupère l'ancien state
    //                 favoritesFilm: [...state.favoritesFilm, action.value]//on con
    //             }
    //         }
    //         return nextState || state//si le nextstate est undefined on 
    
    //     default:

    //         return state
    // }
}

