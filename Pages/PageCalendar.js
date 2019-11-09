import React, {Component} from 'react'
import {Text,StyleSheet,View} from 'react-native'
import { connect } from 'react-redux'
import FilmList from '../Components/FilmList'

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Calendar_component from '../Components/Calendar_coponent'


class PageCalendar extends React.Component {

    calendarObject = new Calendar_component();

    static navigationOptions = {
        title: 'Calendrier',
        headerStyle:{
            backgroundColor: '#303030',
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            fontWeight: 'bold' ,           
        }
    }

    constructor(props) 
    {
        super(props);
    }

    onDayPress(day)
     {
        this.setState
        (
            {
                selected: day.dateString
            }
        );
        alert (this.selected);
    }

    render(){

        return (
            <View>
                <Calendar
                     //onDayLongPress = {this.onDayPress(day)}
                     minDate        = {Date.now()}
                     onDayLongPress = {day => {
                        //alert('selected day', day.dateString );
                        //console.log(day.dateString);
                        this.calendarObject._SaveEvents("jrmr first", day.dateString);
                      }}
                
                />
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