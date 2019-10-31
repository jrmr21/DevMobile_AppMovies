import React from 'react'
import {Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import {getFimsFromApiWithPopulFilm} from '../API/TMDBApi' 
import {getImageFromApi} from '../API/TMDBApi'

class PageHome extends React.Component {

    static navigationOptions = {
        title: 'Accueil        Les films populaires',
        headerStyle:{
            backgroundColor: '#383838',
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
        
        getFimsFromApiWithPopulFilm().then(data => {
            this.setState({
              films: data.results,
            })
           
        })
       
      }

      displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
      }


    render(){

        if(this.state.films.length > 0){

            console.log(this.state.films[0].title);

            return (
            
                <View style={styles.container}>
     
                    <View style={styles.film_groupe}>
                         <View style={styles.film_groupe_header}>
                             <Text style={styles.text1} >Films d'aventure</Text>
                             <Text style={styles.text2}>Voir plus</Text>
                         </View>
                         <View style={styles.film_groupe_body}>
                             <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[2].id)}}  style={styles.film}>
                                 <Image
                                     style={styles.image}
                                     source={{uri:getImageFromApi(this.state.films[0].poster_path)}} 
                                   />
                                 <Text style={styles.text_title}>{this.state.films[0].title}</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[1].id)}}  style={styles.film}>
                                <Image
                                    style={styles.image}
                                    source={{uri:getImageFromApi(this.state.films[1].poster_path)}} 
                                />
                                <Text style={styles.text_title}>{this.state.films[1].title}</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[2].id)}}  style={styles.film}>
                                <Image
                                    style={styles.image}
                                    source={{uri:getImageFromApi(this.state.films[2].poster_path)}} 
                                />
                                 <Text style={styles.text_title}>{this.state.films[2].title}</Text>
                             </TouchableOpacity>
                         </View>
                    </View>
     
                    <View style={styles.film_groupe}>
     
                         <View style={styles.film_groupe_header}>
                             <Text style={styles.text1} >Films d'action</Text>
                             <Text style={styles.text2}>Voir plus</Text>
                         </View>
                         <View style={styles.film_groupe_body}>
                            <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[3].id)}} style={styles.film}>
                                <Image
                                    style={styles.image}
                                    source={{uri:getImageFromApi(this.state.films[3].poster_path)}} 
                                />
                                <Text style={styles.text_title}>{this.state.films[3].title}</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[4].id)}} style={styles.film}>
                                <Image
                                    style={styles.image}
                                    source={{uri:getImageFromApi(this.state.films[4].poster_path)}} 
                                />
                                <Text style={styles.text_title}>{this.state.films[4].title}</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={()=>{this.displayDetailForFilm(this.state.films[5].id)}} style={styles.film}>
                                <Image
                                    style={styles.image}
                                    source={{uri:getImageFromApi(this.state.films[5].poster_path)}} 
                                />
                                <Text style={styles.text_title}>{this.state.films[5].title}</Text>
                             </TouchableOpacity>
                         </View>
                     </View>
     
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
        flexDirection: 'column',
        backgroundColor: '#383838'
    },
    film_groupe:{
        flex: 1,
        flexDirection: 'column',
    },
    film_groupe_header:{
        flex: 1,
        flexDirection: 'row',
        margin: 3
    },
    film_groupe_body:{
        flex:10,
        flexDirection: 'row',
    },
    text1:{
        flex: 3,
        marginLeft: 3,
        paddingTop: 2,
        color: '#DCDCDC'
    },
    text2:{
        flex: 1,
        paddingTop: 2,
        textAlign: 'right',
        paddingRight: 5,
        color: '#DCDCDC'
    },
    film:{
        flex: 1,
        margin: 2
    },
    text_title:{
        flex:1,
        fontSize: 10,
        textAlign: 'center',
        color: '#DCDCDC'
    },
    image:{
        flex:10,
    }
    
})

const mapStateToProps = state => {
    return {
       favoritesFilm: state.favoritesFilm
    }
  }

export default connect(mapStateToProps) (PageHome) 