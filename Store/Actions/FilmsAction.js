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
            if(data != null){
                return dispatch({ type: FILMS_INIT, payload: JSON.parse(data) });                
            }
        });
    };
}

export const rateFilmAsync = (filmID, note) => {
    console.log("ajout d'une note : ",note," pour le film ",filmID);
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }

            let i = 0
            for(let oneFilm of tab){
                console.log("one film [0] ",oneFilm[0])
                if(oneFilm[0] == filmID){
                    // oneFilm.push([note]);
                    tab[i][1] = note;
                }
                i ++;
            }
            
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(tab))
                .then(() => {
                    console.log("NOTE AJOUTE : ",note);
                    return dispatch({ type: FILMS_INIT, payload: tab });
                });
        }).catch(
            console.log("CATCH ADD NOTE"), 
        );
    }   
}

export const addCommentaireAsync = (filmID, commentaire) => {
    console.log("ajout d'un commentaire : ",commentaire," pour le film ",filmID);
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }
            let i = 0
            for(let oneFilm of tab){
                console.log("one film [0] ",oneFilm[0])
                if(oneFilm[0] == filmID){
                    // oneFilm.push([note]);
                    console.log('pushing into arrays')
                    tab[i][2] = commentaire
                }
                i ++;
            }
            
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(tab))
                .then(() => {
                    console.log("COMMENTAIRE AJOUTE : ",commentaire);
                    return dispatch({ type: FILMS_INIT, payload: tab });
                });
        }).catch(
            console.log("CATCH ADD COMMENTAIRE"), 
        );
    }   
}

export const addAsync = (filmID) => {
    console.log("state add async",filmID)
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }
            tab.push([filmID]);
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(tab))
                .then(() => {
                    console.log("FILM AJOUTE : ",filmID);
                    return dispatch({ type: FILMS_INIT, payload: tab });
                });
        }).catch(
            console.log("CATCH ADD ASYNC"),
        );
    }
}
export const deleteAsync = (filmID) => {
    return dispatch => {
        AsyncStorage.getItem('favoritesFilms').then(data => {
            const tab = JSON.parse(data);
            let i = 0;
            for(let oneFilm of tab){
                if(oneFilm.includes(filmID)){
                    tab.splice(i,1)
                }
                i++;
            }
            // tab.splice(tab.findIndex(e => e === filmID), 1);
            console.log("REMOVING FILM ID : ",filmID);
            AsyncStorage.setItem('favoritesFilms', JSON.stringify(tab))
                .then(() => {
                    // console.log("returning film action");
                    return dispatch({ type: FILMS_INIT, payload: tab });
                });
        });
    };
}