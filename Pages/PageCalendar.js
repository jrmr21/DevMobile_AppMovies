import React from 'react'
import {StyleSheet,View} from 'react-native'
import { connect } from 'react-redux'
import { Calendar } from 'react-native-calendars';
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

        this.state = {
            movieEvent : "404",
        }
    }


    async componentDidMount ()
    {
        await this.setState( 
            {
                movieEvent : this.props.navigation.getParam('film_name', '404')
            }
        );
    }
    

    render(){
        return (
            <View>
                <Calendar
                                        // minimal date to create Event
                     minDate        = { Date.now() }
                     onDayPress     = {day => {
                        this.calendarObject._SaveEvents(this.state.movieEvent , day.dateString);
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