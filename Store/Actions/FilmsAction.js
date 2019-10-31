import { AsyncStorage } from 'react-native';

export const FILMS_INIT = "FILMS_INIT";
export const FILMS_ADD = "FILMS_ADD";
export const FILMS_SUPPR = "FILMS_SUPPR";

//le payload agit sur le state
export const init = () => ({
    type : FILMS_INIT,
    payload
});

export const initAsync = () => {
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            console.log("LISTE DES FILMS STOCKES : ",JSON.parse(data))
            return dispatch({ type: FILMS_INIT, payload: JSON.parse(data) });
        });
    };
}

export const addAsync = (filmID) => {
    console.log("state add async",filmID)
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }
            tab.push(filmID);
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(tab))
                .then(() => {
                    console.log("FILM AJOUTE : ",filmID);
                    return dispatch({ type: FILMS_INIT, payload: tab });
                });
        }).catch(
            console.log("CATCH ADD ASYNC"),
            
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(filmID))
                .then(() => {
                    console.log("FILM AJOUTE : ",filmID);
                    return dispatch({ type: FILMS_INIT, payload: tab });
                })
        );
    }
}
export const deleteAsync = (filmName) => {
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            const tab = JSON.parse(data);
            tab.splice(tab.findIndex(e => e === filmName), 1);
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: FILMS_INIT, payload: JSON.parse(data) });
                });
        });
    };
}