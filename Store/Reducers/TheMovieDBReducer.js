import TheMovieDBService from "../../API/TMDBApi"

//état initial du weather service
const initialState = {
    servMovies: new TheMovieDBService(console.log("new TheMovieDBService  ")),
};


//création du réducer, on lui donne son état initial
export default (state = initialState, action) => {

    //on retourne l'état du réducer qui contient le service
    return state;
};
