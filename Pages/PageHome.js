import React from 'react'
import {Text,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'

class PageHome extends React.Component {

    static navigationOptions = {
        title: 'Accueil',
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
            
           ''

        )
    }
}

const styles = StyleSheet.create ({

})


const mapStateToProps = state => {
    return {
    //   favoritesFilm: state.favoritesFilm
    }
  }

export default connect(mapStateToProps) (PageHome) 