import React from 'react'
import {Text,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'

class PagesFavorites extends React.Component {

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

export default connect(mapStateToProps) (PagesFavorites) 
