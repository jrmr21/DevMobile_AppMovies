import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Image,TouchableOpacity}  from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'

class PageCalendar extends React.Component {

    static navigationOptions = {
        title: 'Calendrier',
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
            
            <View>
                <Text>EXAMPLE</Text>
            </View>
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

export default connect(mapStateToProps) (PageCalendar) 