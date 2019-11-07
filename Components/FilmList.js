import React from 'react'
import { StyleSheet, FlatList,View,Text } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
   
  }

  static propTypes = {
    films: PropTypes.array.isRequired
  };

  render() {

    return (

      <FlatList
        style={styles.list}
        data={this.props.films}//affiche les données la première fois
        extraData={this.props.favoritesFilm}//lie les datas au reducer pour qu'elles puissent être mises à jour
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem
            key = {item.item}
            filmID={item.id}
            isFilmFavorite={(this.props.favoritesFilm.includes(item.id)) ? true : false}//cherche si le film fait partie des films favoris et on affiche un petit coeur si oui
            navigation={this.props.navigation}
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