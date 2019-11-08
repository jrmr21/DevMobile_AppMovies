import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import FadeIn from '../Animations/FadeIn'
import Icon from 'react-native-vector-icons/Ionicons';


class FilmItem extends React.Component {


  constructor(props) {
    super(props),
      this.state = {
        filmInfo: null,
      }
    this.getFilmInfo();
  }

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../assets/Favoris.png')}
        />
      )
    }
  }

  _displayRating() {
    if (this.props.isFilmFavorite) {

      let rating = 0;
      console.log("props film ID",this.props.filmID)
      //on refarde si le film est un film favoris et on récupère son index dans le tableau favoriteFilm pour pouvoir lier les composants directement au store
      for (let i = 0; i < this.props.favoritesFilm.length; i++) {
        if (this.props.favoritesFilm[i].includes(this.props.filmID[1])) {
          rating = this.props.favoritesFilm[i][1]
        }
      }

      return (
        <View style = {{flexDirection:"row"}}> 
          <Icon size={15} style={styles.icon} color="#e2e61c" name={'ios-star'} />
          <Text style = {{color : "#fff",marginLeft:10}}>{rating}</Text>

        </View>

      )
    }
  }

  componentDidMount() {

  }

  getFilmInfo() {
    // console.log("getting info for film ID : ",this.props.filmID);
    this.props.servMovies.getFilmWithID(this.props.filmID).then(data => {

      // console.log('data resp item',data)
      this.setState({
        filmInfo: data,
      })
    });
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film details " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
  }

  render() {
    // const { film, displayDetailForFilm } = this.props



    return (
      (this.state.filmInfo != null) ? (
        <FadeIn>
          <TouchableOpacity onPress={() => { this._displayDetailForFilm(this.props.filmID) }} style={styles.main_container}>
            <Image
              style={styles.image}
              source={{ uri: this.props.servMovies.getImageFromApi(this.state.filmInfo.poster_path) }}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                {this._displayFavoriteImage()}
                <Text style={styles.title_text}> {this.state.filmInfo.title} </Text>
                <Text style={styles.vote_text}>{this.state.filmInfo.vote_average}</Text>
              </View>
              {this._displayRating()}
              <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={6}> {this.state.filmInfo.overview} </Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>Sorti le {this.state.filmInfo.release_date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </FadeIn>


      ) : (
          <View>
            {/* <Text>
              WAIT
          </Text> */}
          </View>
        )


    )
  }
}

//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) => {
  return ({
    favoritesFilm: stateStore.toggleFavorite.favoritesFilm,
    servMovies: stateStore.theMovieDBReducer.servMovies })
};

export default connect(mapStateToProps)(FilmItem);


const styles = StyleSheet.create({

  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  favorite_image: {
    width: 20,
    height: 20,
    marginTop: 3
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 2.5,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: '#fff'
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fff'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#c2c2c2'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
    color: '#fff'
  },
  icon: {
    marginTop: 0,
    marginLeft: 0,
  }
})