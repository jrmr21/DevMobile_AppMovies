import React from 'react'
import {View,Image,TextInput,Button,StyleSheet,FlatList,Text,ActivityIndicator,TouchableOpacity} from 'react-native'
import FilmList from '../Components/FilmList'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';



class PageSearch extends React.Component {

  //on redefinis le constructeur de Search
  constructor(props){
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      films:[],
      isLoading: false
      }
      this.searchedText = ""   
      this._loadFilms = this._loadFilms.bind(this) // ou _loadFilm () => {}
  }

  
  _loadFilms () {
    //on execute la fonct de rech sur api et on modifie le state avec le resultat de la recherche
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      this.props.servMovies.getFimsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
          
      })
    } 
  }

  //pour une nouvelle recherche on reinitialise avant de charger
  _searchFilm(){
    this.page = 0
    this.totalPages = 0
    this.setState ({
      films:[]
      }, ()=>{this._loadFilms()}) //on se rassure que le chargement se fait apres le setState(il est asynchrone)

  }

  //afficher le cercle de chargement temps que les film sont entrain de charger
  _displayLoading(){
    if(this.state.isLoading){
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    }
  }

  // sauvegarde le text dans la variable searchedText a chaque modification du text de recherche
  _searchTextInputChanged(text){
    this.searchedText = text
  }


  static navigationOptions = {
    title: 'Rechercher',
    headerStyle:{
        backgroundColor: '#303030',
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
        fontWeight: 'bold' ,           
    }
}

  //onSubmitEditing cest pour lancer la recherche des que on tappe ok sur le clavier
  //la fonction _displayLoading est charger a la fin de l'afficharge pour etre sur quil sera par dessus tous
    render (){
        return (
            <View style={styles.main_container}>
                <View style={styles.header}>
                  <TextInput onSubmitEditing = {()=>this._searchFilm()} onChangeText={(text)=>this._searchTextInputChanged(text)} placeholder='Titre du film' style={styles.textinput}/>
                  <TouchableOpacity onPress={()=> this._searchFilm()} >
                      <Icon size={50} style={styles.icon} color={styles.icon.color} name={'ios-search'} />
                  </TouchableOpacity>
                </View>
               
                <FilmList

                  films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                  navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                  loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                  page={this.page}
                  totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                  favoriteList={false} 
                />

                {this._displayLoading()}
               
            </View>
        );
    }
}

//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) =>{
  return({ servMovies : stateStore.theMovieDBReducer.servMovies})
};

export default connect (mapStateToProps)(PageSearch);


const styles = StyleSheet.create( {

    main_container:{
        flex:1,
        backgroundColor: '#383838'
    },
    header:{
        flexDirection: 'row' ,
        backgroundColor: '#252525'
    },

    textinput:{
      flex: 10,
        marginRight:3, 
        height:50, 
        paddingLeft:5,
        color: '#fff',
    },

    loading_container:{
      position: 'absolute',
      left: 0,
      right:0,
      top: 100,
      bottom: 0,
      alignItems:'center',
      justifyContent: 'center'

    },

    icon : {
      color : "#fff",
      marginRight : 15,
      marginLeft : 15,
  }
});

