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


import ShareAnimated from '../Animations/ShareAnimated'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props),
      this.state = {
        film: undefined,
        isLoading: false,
        filmID: "",
        note: 0,
        isFavorite: false,
        comment: ""
      }
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

  refresh() {
    let i = 0;
    for (let oneFilm of this.props.favoritesFilm) {

      if (oneFilm.includes(this.state.filmID)) {
        this.setState({
          isFavorite: true,
          note: oneFilm[1],
          comment: oneFilm[2],
        })
      }
      else if (i == this.props.favoritesFilm.length) {
        this.setState({
          isFavorite: false
        })
      }
      i++;
    }
  }

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
  }

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

    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true })
    this.props.servMovies.getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false,
        filmID: data.id,
      })

      for (let oneFilm of this.props.favoritesFilm) {
        if (oneFilm.includes(this.state.filmID)) {
          console.log("CE FILM EST FAVORIS")
          this.setState({
            isFavorite: true
          })
        }
      }
    })
  }

  rateFilmFavorite(note) {
    this.props.actions.rateFilmFavorite(this.state.filmID, note);
    this.setState({
      note: note
    })
  }

  _getRatingColor(numeroEtoile) {

    if (this.state.note >= numeroEtoile) {

      return "#e2e61c"//jaune
    }
    else {
      return "#fff"
    }
  }

  _displayRateFilm() {

    return (
      (this.state.isFavorite) ? (
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


  _toggleFavorite() {
    console.log("TOGGLE ", this.state.filmID);

    if (this.state.isFavorite) {
      console.log("calling remove from reducer");
      this.props.actions.deleteFilmFavorite(this.state.filmID);
      this.setState({
        isFavorite: false
      })
    }
    else {
      console.log("calling add from reducer");
      this.props.actions.addFilmFavorite(this.state.filmID);
      this.setState({
        isFavorite: true
      })
      this.rateFilmFavorite(this.state.note)
      this.props.actions.commentFilmFavorite(this.state.filmID, this.state.comment);
    }
  }

  _displayFavoriteImage() {
    // console.log("props film details",this.props.favoritesFilm, " state filmID", this.state.filmID)

    console.log("props favorite film : ", this.props.favoritesFilm)

    sourceImage = require('../assets/NonFavoris.png');

    if (this.state.isFavorite) {
      sourceImage = require('../assets/Favoris.png');
    }
    return (
      <Image
        source={sourceImage}
        style={styles.favorite_image}
      />
    )
  }


  _displayCommentaire() {

    if (this.state.isFavorite) {
      return (
        <View>
          <Text style={[styles.default_text,{ marginTop: 30 }]}>Mon commentaire : </Text>
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

  _displayFilm() {
    const film = this.state.film
    if (film != undefined) {
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
    }
  }

  //il ya un soucis avec le displayloading qui ne fonctionne pas
  render() {
    console.log("is this film favorite ? : ", this.state.isFavorite)
    return (
      <KeyboardAvoidingView  behavior="padding" style={styles.main_container} keyboardVerticalOffset={100} enabled>
        <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayFilm()}
          {this._displayFloatingActionButton()}
        </View>
      </KeyboardAvoidingView>

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
    color: '#666666',
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
