import React from 'react'
import {Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import FilmHome from '../Components/FilmHome'
import { ScrollView } from 'react-native-gesture-handler'

class PageHome extends React.Component {

    static navigationOptions = {
        title: 'Accueil        Les films populaires',
        headerStyle:{
            backgroundColor: '#303030',
        },                                          
        headerTintColor: '#DCDCDC',
        headerTitleStyle:{
            fontWeight: 'bold' ,           
        }
    }

    constructor(props){
        super(props)
        this.state = {
          films:[],
         
          isLoading: false
          }
          this._loadFilms()   
      }

      _loadFilms(){
        this.props.servMovies.getFimsFromApiWithPopulFilm().then(data => {
            this.setState({
              films: data.results,
            })          
        })        
      }

      displayDetailForFilm = (idFilm) => {
        console.log("Display film " + idFilm)
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
      }


    render(){

        if(this.state.films.length > 0){

            console.log(this.state.films[0].title);

            return (
            <View style={{flex: 1, backgroundColor: '#383838'}}>
                <ScrollView style={styles.container}>
     
                    <View style={styles.film_groupe}>            
                         <View style={styles.film_groupe_header}>
                             <Text style={styles.text1} >Films d'aventure</Text>
                             <Text style={styles.text2}>Voir plus</Text>
                         </View> 
                         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.film_groupe_body}>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[0].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[0].poster_path)}
                                    title = {this.state.films[0].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[1].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[1].poster_path)}
                                    title = {this.state.films[1].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[2].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[2].poster_path)}
                                    title = {this.state.films[2].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[11].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[11].poster_path)}
                                    title = {this.state.films[11].title}
                                />
                            </TouchableOpacity>
                         </ScrollView>
                    </View>

                    <View style={styles.film_groupe}>            
                         <View style={styles.film_groupe_header}>
                             <Text style={styles.text1} >Films d'action</Text>
                             <Text style={styles.text2}>Voir plus</Text>
                         </View> 
                         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.film_groupe_body}>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[3].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[3].poster_path)}
                                    title = {this.state.films[3].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[4].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[4].poster_path)}
                                    title = {this.state.films[4].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[5].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[5].poster_path)}
                                    title = {this.state.films[5].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[10].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[10].poster_path)}
                                    title = {this.state.films[10].title}
                                />
                            </TouchableOpacity>
                         </ScrollView>
                    </View>

                    <View style={styles.film_groupe}>            
                         <View style={styles.film_groupe_header}>
                             <Text style={styles.text1} >Films drole</Text>
                             <Text style={styles.text2}>Voir plus</Text>
                         </View> 
                         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.film_groupe_body}>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[6].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[6].poster_path)}
                                    title = {this.state.films[6].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[7].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[7].poster_path)}
                                    title = {this.state.films[7].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[8].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[8].poster_path)}
                                    title = {this.state.films[8].title}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[9].id)}}>
                                <FilmHome 
                                    image = {this.props.servMovies.getImageFromApi(this.state.films[9].poster_path)}
                                    title = {this.state.films[9].title}
                                />
                            </TouchableOpacity>
                         </ScrollView>
                    </View>
     
                    
     
                </ScrollView>
                </View>
             )

        }else{
            return(<View></View>)
        }
         
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    film_groupe:{
        flex: 1,
        marginTop: 5,
        
    },
    film_groupe_header:{
        marginBottom: 5,
        flexDirection: 'row',
        flex: 1,
        
    },
    film_groupe_body:{
        flex: 15
    },
    text1:{
        color: '#fff',
        marginLeft: 5,
        flex:4,
        
    },
    text2:{
        color: '#fff',
        flex: 1,
    }
    
})

//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) => {
    return ({ servMovies: stateStore.theMovieDBReducer.servMovies })
};


export default connect(mapStateToProps)(PageHome) 