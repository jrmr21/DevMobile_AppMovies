import React from 'react'
import {Text,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'

<<<<<<< HEAD:Pages/PageFavorites.js
class Favorites extends React.Component {
=======
class PagesFavorites extends React.Component {
>>>>>>> 1cb3c1406158d58db9744c99f15314f4f32a0e2b:Pages/PageFavorites.js

    static navigationOptions = {
        title: 'Mes favoris',
        headerStyle:{
            backgroundColor: '#A2273C',
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            fontWeight: 'bold' ,           
        }
    }

    render(){

        return (
            
            <FilmList 
                films = {this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={true}
            />

        )
    }
}

const styles = StyleSheet.create ({

})


const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }

<<<<<<< HEAD:Pages/PageFavorites.js
export default connect(mapStateToProps) (Favorites) 
=======
export default connect(mapStateToProps) (PagesFavorites) 
>>>>>>> 1cb3c1406158d58db9744c99f15314f4f32a0e2b:Pages/PageFavorites.js
