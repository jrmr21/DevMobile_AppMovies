import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'
import styles from '../UI/Styles'

class PageHome extends React.Component {

    static navigationOptions = {
        title: 'Accueil',
        headerStyle: {
            backgroundColor: '#383838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    render() {

        return (

            <Text>HOME</Text>

        )
    }
}


//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) => {
    return ({ servMovies: stateStore.theMovieDBReducer.servMovies })
};


export default connect(mapStateToProps)(PageHome) 