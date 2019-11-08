import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import FadeIn from '../Animations/FadeIn'

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

  componentDidMount() {

  }

  getFilmInfo() {
    // console.log("getting info for film ID : ",this.props.filmID);
    if (this.props.choix==0){
      this.props.servMovies.getFilmWithID(this.props.filmID).then(data => {
        this.setState({
          filmInfo: data,
        })
      });
    }else{
      this.props.servMovies.getSerieWithID(this.props.filmID).then(data => {
        this.setState({
          filmInfo: data,
        })
        console.log(this.state.filmInfo)
      });
    }
   
  }

  _displayDetailForFilm = (idFilm) => {
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm, choix: this.props.choix })
  }

  render() {
    // const { film, displayDetailForFilm } = this.props

    if(this.props.choix == 0){

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

    }else{

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
                  <Text style={styles.title_text}> {this.state.filmInfo.name} </Text>
                  <Text style={styles.vote_text}>{this.state.filmInfo.vote_average}</Text>
                </View>
                <View style={styles.description_container}>
                  <Text style={styles.description_text} numberOfLines={6}> {this.state.filmInfo.overview} </Text>
                </View>
                <View style={styles.date_container}>
                  <Text style={styles.date_text}>Sorti le {this.state.filmInfo.first_air_date}</Text> 
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
}

//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) => {
  return ({ servMovies: stateStore.theMovieDBReducer.servMovies })
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
    flex: 3,
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
  }

})