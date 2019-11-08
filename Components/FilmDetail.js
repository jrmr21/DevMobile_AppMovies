import React from 'react'
import { View, Text, Share, StyleSheet, ActivityIndicator, Animated, Image, TouchableOpacity, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addAsync } from '../Store/Actions/FilmsAction';
import { deleteAsync } from '../Store/Actions/FilmsAction';
import { initAsync } from '../Store/Actions/FilmsAction';
import { rateFilmAsync } from '../Store/Actions/FilmsAction';
import { addCommentaireAsync } from '../Store/Actions/FilmsAction';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';


import ShareAnimated from '../Animations/ShareAnimated'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props),
      this.state = {
        film: undefined,
        isLoading: false,
        filmID: "",
        note: 0,
        comment: "",
        indexInFavoriteArray: null,
      }
    this._keyboardDidHide = this._keyboardDidHide.bind(this) // on bind cette contion appelée via un listener pour qu'elle puisse récupérer le state
  }

  static navigationOptions = {

    title: 'Detail du film',
    headerStyle: {
      backgroundColor: '#383838',
    },
    headerTintColor: '#DCDCDC',
    headerTitleStyle: {
      fontWeight: 'bold',
    }

  }

  //parcour le tableau favoriteFilm récupéré depuis le storage et cherche si un de ses élément contient l'ID du film actuel
  //permet d'être directement lié au réducer du store et que tous les endroits où s'affichent le film soient syncronisés avec les mêmes données
  isThisFilmStoredInFavortie() {
    if (this.props.favoritesFilm != null && this.props.favoritesFilm.length != 0) {
      for (let i = 0; i < this.props.favoritesFilm.length; i++) {
        if (this.props.favoritesFilm[i][0] == this.state.filmID) {
          console.log("THIS FILM IS STORED")
          return true
        }
      }
    }
    return false
  }

  //fonction appelée lors du OnDidFocus(), permet de récupérer le commentaire du film s'il a été saisi dans une autre fenêtre détail du même film
  refresh() {
    if (this.isThisFilmStoredInFavortie()) {
      console.log("REFRESHIG... this film is favorite")
      console.log("REFRESHIG... comment : ",this.props.favoritesFilm[this.state.indexInFavoriteArray][3])
      this.setState({
        comment: this.props.favoritesFilm[this.state.indexInFavoriteArray][3]
      })
    }
  }

  //fonction appelée lorsqu'on appuie sur le bouton pour partager le film
  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
  }

  //affiche le bouton de partage
  _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ShareAnimated>
          <TouchableOpacity style={styles.share_touchable} onPress={() => this._shareFilm()} >
            <Icon size={30} color="#FFF" name={'ios-share-alt'} />
          </TouchableOpacity>
        </ShareAnimated>
      )
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

    this.setState({ isLoading: true })

    // On appelle l'API pour récupérer les détails du film
    if (this.props.navigation.state.params.choix == 0) {

      this.props.servMovies.getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false,
          filmID: data.id,
        })


      })
    } else {

      this.props.servMovies.getSerieDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false,
          filmID: data.id,
        })


      })
    }

    if (this.props.favoritesFilm != null) {
      //on refarde si le film est un film favoris et on récupère son index dans le tableau favoriteFilm pour pouvoir lier les composants directement au store
      for (let i = 0; i < this.props.favoritesFilm.length; i++) {
        if (this.props.favoritesFilm[i][0] == this.props.navigation.state.params.idFilm) {
          this.setState({
            indexInFavoriteArray: i,
          })
        }
      }
    }



    //on écoute si le keyboard est caché pour envoyer le commentaire du film saisi
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  //le render du composant
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.main_container} keyboardVerticalOffset={100} enabled>
        <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayFilm()}
          {this._displayFloatingActionButton()}
        </View>
      </KeyboardAvoidingView>
    );
  }

  //fonction appelée lorsqu'on clique sur une étoile, appelle un réducer avec la note choisie
  rateFilmFavorite(note) {
    this.props.actions.rateFilmFavorite(this.state.filmID, note);
    this.setState({
      note: note
    })
  }

  //retourne la couleur jaune ou blanche en fonction de la note du film
  _getRatingColor(numeroEtoile) {
    console.log("GET RATING COLOR, index Favorite : ", this.state.indexInFavoriteArray)
    if (this.state.indexInFavoriteArray != null) {
      console.log("get color : ", this.props.favoritesFilm[this.state.indexInFavoriteArray][2]);
      if (this.props.favoritesFilm[this.state.indexInFavoriteArray][2] >= numeroEtoile) {

        return "#e2e61c"//jaune
      }
      else {
        return "#fff"
      }
    }
  }

  //affiche les étoiles pour noter le film s'il est stocké en favoris
  _displayRateFilm() {
    return (
      (this.isThisFilmStoredInFavortie()) ? (
        <View style={{ flexDirection: "row", marginTop: 15, alignContent: "center", justifyContent: "center", marginBottom: 15 }}>
          <TouchableOpacity title="Note" onPress={() => this.rateFilmFavorite(1)}>
            <Icon size={30} style={styles.icon} color={this._getRatingColor(1)} name={'ios-star'} />
          </TouchableOpacity>
          <TouchableOpacity title="Note" onPress={() => this.rateFilmFavorite(2)}>
            <Icon size={30} style={styles.icon} color={this._getRatingColor(2)} name={'ios-star'} />
          </TouchableOpacity>
          <TouchableOpacity title="Note" onPress={() => this.rateFilmFavorite(3)}>
            <Icon size={30} style={styles.icon} color={this._getRatingColor(3)} name={'ios-star'} />
          </TouchableOpacity>
          <TouchableOpacity title="Note" onPress={() => this.rateFilmFavorite(4)}>
            <Icon size={30} style={styles.icon} color={this._getRatingColor(4)} name={'ios-star'} />
          </TouchableOpacity>
          <TouchableOpacity title="Note" onPress={() => this.rateFilmFavorite(5)}>
            <Icon size={30} style={styles.icon} color={this._getRatingColor(5)} name={'ios-star'} />
          </TouchableOpacity>
        </View>
      ) : (
          <View></View>
        )
    )
  }

  //ajoute ou supprime ce film des favoris
  _toggleFavorite() {
    console.log("TOGGLE ", this.state.filmID);

    if (this.isThisFilmStoredInFavortie()) {
      console.log("calling remove from reducer");
      this.props.actions.deleteFilmFavorite(this.state.filmID);
    }
    else {
      console.log("calling add from reducer");
      this.props.actions.addFilmFavorite(this.state.filmID, this.props.navigation.state.params.choix);
      if (this.props.favoritesFilm != null) {
        this.setState({
          indexInFavoriteArray: this.props.favoritesFilm.length
        })
      }
      else {
        this.setState({
          indexInFavoriteArray: 0
        })
      }

    }
  }

  //affiche un coeur rempli ou pas pour le favoris
  _displayFavoriteImage() {
    sourceImage = require('../assets/NonFavoris.png');

    if (this.isThisFilmStoredInFavortie()) {
      sourceImage = require('../assets/Favoris.png');
    }
    return (
      <Image
        source={sourceImage}
        style={styles.favorite_image}
      />
    )
  }

  //retourne une zone pour saisir un commentaire du film
  _displayCommentaire() {

    if (this.isThisFilmStoredInFavortie()) {
      return (
        <View>
          <Text style={[styles.default_text, { marginTop: 30 }]}>Mon commentaire : </Text>
          <TextInput multiline onSubmitEditing={() => this.props.actions.commentFilmFavorite(this.state.filmID, this.state.comment)} onChangeText={(text) => this._commentTextInputChanged(text)} value={this.state.comment} style={styles.textinput} />
        </View>
      )
    }
  }



  // sauvegarde le text dans la variable searchedText a chaque modification du text de recherche
  _commentTextInputChanged(text) {
    this.setState({
      comment: text
    })
    this.props.actions.commentFilmFavorite(this.state.filmID, this.state.comment);
  }

  //si le clavier se cache, on envoie la dernière valeur du state dans le storage (afin de ne pas perdre la dernière lettre)
  _keyboardDidHide() {
    // console.log("sate keyboard : ",this.state.comment);
    this._commentTextInputChanged(this.state.comment);
  }

  //affiche les infos du détail du film
  _displayFilm() {
    const film = this.state.film
    if (film != undefined) {

      if (this.props.navigation.state.params.choix == 0) {

        return (

          <ScrollView style={styles.scrollview_container}>
            <NavigationEvents onDidFocus={() => this.refresh()} />
            <Image
              style={styles.image}
              source={{ uri: this.props.servMovies.getImageFromApi(film.poster_path) }}
            />

            <Text style={styles.title_text}>{film.title}</Text>
            <TouchableOpacity style={styles.favorite_container} title="Favoris" onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            {this._displayRateFilm()}
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
            {this._displayCommentaire()}
          </ScrollView>
        )

      } else {

        return (

          <ScrollView style={styles.scrollview_container}>
            <NavigationEvents onDidFocus={() => this.refresh()} />
            <Image
              style={styles.image}
              source={{ uri: this.props.servMovies.getImageFromApi(film.poster_path) }}
            />

            <Text style={styles.title_text}>{film.name}</Text>
            <TouchableOpacity style={styles.favorite_container} title="Favoris" onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            {this._displayRateFilm()}
            <Text style={styles.description_text}>{film.overview}</Text>
            <Text style={styles.default_text}>Sorti le {moment(new Date(film.first_air_date)).format('DD/MM/YYYY')}</Text>
            <Text style={styles.default_text}>Note: {film.vote_average}</Text>
            <Text style={styles.default_text}>Nombre de vote: {film.vote_count}</Text>
            <Text style={styles.default_text}>Nombre de saison(s): {film.number_of_seasons}</Text>
            <Text style={styles.default_text}>Nombre d'episode(s): {film.number_of_episodes}</Text>
            <Text style={styles.default_text}>Genre(s): : {film.genres.map(function (genre) {
              return genre.name;
            }).join(" / ")}
            </Text>
            <Text style={styles.default_text}>Companie(s): {film.production_companies.map(function (company) {
              return company.name;
            }).join(" / ")}
            </Text>
            {this._displayCommentaire()}
          </ScrollView>
        )

      }

    }
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
    deleteFilmFavorite: bindActionCreators(deleteAsync, payload),
    initFilmsFavorite: bindActionCreators(initAsync, payload),
    rateFilmFavorite: bindActionCreators(rateFilmAsync, payload),
    commentFilmFavorite: bindActionCreators(addCommentaireAsync, payload),
  }
})

export default connect(mapStateToProps, mapStateToActions)(FilmDetail);

const styles = StyleSheet.create({

  main_container: {
    flex: 1,
    backgroundColor: '#383838'
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
    backgroundColor: '#383838'
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
    color: '#DCDCDC',
    textAlign: 'center'
  },
  textinput: {
    flex: 4,
    marginRight: 3,
    paddingLeft: 5,
    color: '#fff',
    backgroundColor: "#303030",
    flexWrap: "wrap",
    maxHeight: 80,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#c2c2c2',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    color: '#DCDCDC'
  },
  share_touchable: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 100,
    borderRadius: 30,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },

  icon: {
    marginRight: 15,
    marginLeft: 15,
  }
});
