const initialState = {favoritesFilm:[]}

export default (state = initialState, action) => {
   
    let nextState

    switch (action.type) {

        case 'TOGGLE_FAVORITE': 
        console.log("JE PASSE ICI")
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1){
                //suppression
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            }else{
                nextState ={
                    ...state, // on récupère l'ancien state
                    favoritesFilm: [...state.favoritesFilm, action.value]//on con
                }
            }
            return nextState || state//si le nextstate est undefined on 
    
        default:

            return state
    }
}

