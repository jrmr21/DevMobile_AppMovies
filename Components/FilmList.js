import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
   
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
  }

  render() {
    


    return (

      <FlatList
        style={styles.list}
        data={this.props.films}//affiche les données la première fois
        extraData={this.props.favoritesFilm}//lie les datas au reducer pour qu'elles puissent être mises à jour
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}//cherche si le film fait partie des films favoris et on affiche un petit coeur si oui
            displayDetailForFilm={this._displayDetailForFilm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!this.props.faviriteList && this.props.page < this.props.totalPages) {
            // On appelle la méthode loadFilm du component Search pour charger plus de films
            this.props.loadFilms()
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) => {
  return ({ favoritesFilm: stateStore.toggleFavorite.favoritesFilm })
};

export default connect(mapStateToProps)(FilmList);