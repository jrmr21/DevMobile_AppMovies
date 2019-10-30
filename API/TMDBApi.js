
const API_TOKEN = "a088267e5d6a92b211a0cfaf33c3cc9b";

//fonction qui renvoie un film en fonction d'un text
 export function getFimsFromApiWithSearchedText (text,page) {

    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + '&language=fr&query='+ text +'&page='+ page
    return fetch(url)
      .then((response)=>response.json()).catch((error)=>console.log(error))
    
}             

//fonction pour recuperer image du fim
export function getImageFromApi (name){
    return 'https://image.tmdb.org/t/p/w300'+ name 
  }

//fonction pour retourner le detail d'un film
export function getFilmDetailFromApi(id){
  const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+ API_TOKEN + '&language=fr'
  return fetch(url)
  .then((response)=>response.json()).catch((error)=>console.log(error)) 
}
