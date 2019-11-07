import React from 'react'
import {Text,StyleSheet,View} from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'

class PageCalendar extends React.Component {

    static navigationOptions = {
        title: 'Calendrier',
        headerStyle:{
            backgroundColor: '#383838',
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            fontWeight: 'bold' ,           
        }
    }

    render(){

        return (
            <View style={styles.container}>
                <Text>Calendrier</Text>
            </View> 
            
        )
    }
}

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        backgroundColor: '#383838'
    }
})


const mapStateToProps = state => {
    return {
    //   favoritesFilm: state.favoritesFilm
    }
  }

export default connect(mapStateToProps) (PageCalendar) 