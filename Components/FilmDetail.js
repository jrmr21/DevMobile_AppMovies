import React from 'react'
import { View, Text,Share, StyleSheet, ActivityIndicator,Animated, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addAsync } from '../Store/Actions/FilmsAction';
import ShareAnimated from '../Animations/ShareAnimated'
 
class FilmDetail extends React.Component {

  constructor(props) {
    super(props),
      this.state = {
        film: undefined,
        isLoading: false,
        filmID : "to be set",
      }
  }

  static navigationOptions = {

    title: 'Detail du film',
    headerStyle:{
        backgroundColor: '#383838',
    },
    headerTintColor: '#DCDCDC',
    headerTitleStyle:{
        fontWeight: 'bold' ,           
    } 
    
  }

  _shareFilm(){
    const {film} = this.state
    Share.share({title: film.title, message: film.overview})
  }

  _displayFloatingActionButton(){
    const {film} = this.state
    if (film != undefined){
      return(
        <ShareAnimated>
        <TouchableOpacity style={styles.share_touchable} onPress={()=>this._shareFilm()} >
          <Image 
            style={styles.share_image}
            source={require('../assets/share.png')}
          />
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
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex],
        
      })
      return
    }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true })
    this.props.servMovies.getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false,
        filmID : data.id,
      })
    })
  }

  _toggleFavorite() {
    console.log("ToogleFavorite",this.state.filmID);
    this.props.actions.addFilmFavorite(this.state.filmID);
  }

  _displayFavoriteImage() {
    let sourceImage = require('../assets/NonFavoris.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
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
        {this._displayFloatingActionButton()} 
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
    addFilmFavorite: bindActionCreators(addAsync, payload)
  }
})

export default connect(mapStateToProps, mapStateToActions)(FilmDetail);

 const styles = StyleSheet.create( {

     main_container: {
         flex: 1,
         backgroundColor: '#383838'
       },
       favorite_container:{
         alignItems: 'center'
       },
       favorite_image:{
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
       description_text: {
         fontStyle: 'italic',
         color: '#666666',
         margin: 5,
         marginBottom: 15
       },
       default_text: {
         marginLeft: 5,
         marginRight: 5,
         marginTop: 5,
         color: '#DCDCDC'
       },
       share_touchable:{
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
       share_image:{
         width:30,
         height:30
       }
 });
