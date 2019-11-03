import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'
import { getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addAsync } from '../Store/Actions/FilmsAction';
import { deleteAsync } from '../Store/Actions/FilmsAction';

class FilmDetail extends React.Component {

  constructor(props) {
    super(props),
      this.state = {
        film: undefined,
        isLoading: false,
        filmID : "",
      }
  }

  static navigationOptions = {
    title: 'Detail du film ',
    headerStyle: {
      backgroundColor: '#A2273C',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  //afficher le cercle de chargement temps que les film sont entrain de charger
  _displayLoading() {
    if (this.state.isLoading) {
      <View style={styles.loading_container}>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    }
  }


  componentDidMount() {
    
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true })
    this.props.servMovies.getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false,
        filmID : data.id,
      })
      console.log("details data",data.id)
      this._displayFavoriteImage();
    })
  }

  _toggleFavorite() {
    if (this.props.favoritesFilm.includes(this.state.filmID) == true) {
      this.props.actions.deleteFilmFavorite(this.state.filmID);
      this.setState({
        filmID : 0
      })
    }else{
      this.props.actions.addFilmFavorite(this.state.filmID);
    }
    this._displayFavoriteImage()
  }

  _displayFavoriteImage() {
    console.log("props film details",this.props.favoritesFilm, " state filmID", this.state.filmID)

    let sourceImage = require('../assets/NonFavoris.png')
    if (this.props.favoritesFilm.includes(this.state.filmID)) {
      sourceImage = require('../assets/Favoris.png')

    }
    return (
      <Image
        source={sourceImage}
        style={styles.favorite_image}
      />
    )
  }

  _displayFilm() {
    const film = this.state.film
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>

          <Image
            style={styles.image}
            source={{ uri: this.props.servMovies.getImageFromApi(film.poster_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity style={styles.favorite_container} title="Favoris" onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note: {film.vote_average}</Text>
          <Text style={styles.default_text}>Nombre de vote: {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget: {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s): : {film.genres.map(function (genre) {
            return genre.name;
          }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s): {film.production_companies.map(function (company) {
            return company.name;
          }).join(" / ")}
          </Text>

        </ScrollView>
      )
    }
  }

  //il ya un soucis avec le displayloading qui ne fonctionne pas
  render() {
    //  Console.log(this.props) 
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    );
  }
}


const mapStateToProps = (stateStore) => {
  return {
    favoritesFilm: stateStore.toggleFavorite.favoritesFilm,
    servMovies: stateStore.theMovieDBReducer.servMovies
  }
}

const mapStateToActions = (payload) => ({
  actions: {
    addFilmFavorite: bindActionCreators(addAsync, payload),
    deleteFilmFavorite : bindActionCreators(deleteAsync,payload)
  }
})

export default connect(mapStateToProps, mapStateToActions)(FilmDetail);

const styles = StyleSheet.create({

  main_container: {
    flex: 1,

  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    width: 40,
    height: 40
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
    marginBottom: 10,
  },
  image: {
    height: 200,
    marginVertical: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 3,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
});
