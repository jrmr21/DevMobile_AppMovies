import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Image,TouchableOpacity}  from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'



import Calendar_Component from "../Components/Calendar_Component"



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
        const calendar = (<Calendar/>);

                

                
            return (
                <View>
                    <Text>EXAMPLE</Text>
                    < Calendar_Component />
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

  /*
<Text>EXAMPLE</Text>
                < Calendar_Component />
  */

export default connect(mapStateToProps) (PageCalendar) 