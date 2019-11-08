import RNCalendarEvents from "react-native-calendar-events";
    //  source : https://github.com/chakrihacker/react-native-calendar-events-demo/blob/master/Components/Calendar.js


import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";

import Calendar from 'rc-calendar';
//import 'rc-calendar/assets/index.css';


export default class Calendar_Component extends Component 
{

    state = 
    {
        date_to_save :  null,  // start date, end date
        date         : new Date(),
    }

    constructor(props) 
    {
      super(props);
    }

  _getCalendarStatus = async () => {
    try {
      let calendarAuthStatus = await RNCalendarEvents.authorizationStatus();
      Alert.alert("Calendar Status", calendarAuthStatus, ["OK"]);
    } catch (error) {
      Alert.alert("Failed to get Calendar Status");
    }
  };

  _requestCalendarPermissions = async () => {
    try {
      let requestCalendarPermission = await RNCalendarEvents.authorizeEventStore();
      Alert.alert("Calendar Permission", requestCalendarPermission, ["OK"]);
    } catch (error) {
      Alert.alert("Failed to ask permission");
    }
  };

  _getCalendars = async () => {
    try {
      let availableCalendars = await RNCalendarEvents.findCalendars();
      Alert.alert("Available Calendars", JSON.stringify(availableCalendars), [
        "OK"
      ]);
    } catch (error) {
      Alert.alert("Failed to ask permission");
    }
  };

  _fetchAllEvents = async () => {
    try {
      let allEvents = await RNCalendarEvents.fetchAllEvents(
        "2019-11-19T19:26:00.000Z",
        "2019-20-19T19:26:00.000Z"
      );
      console.log(allEvents);
      Alert.alert("Available Events", JSON.stringify(allEvents));
    } catch (error) {
      Alert.alert("Failed to get events");
    }
  };

  _SaveEvents = async () => {

    this.setState({ date_to_save : JSON.parse("startday:",'2019-15-11T19:26:00.000Z', "endday:", '2019-16-11T20:26:00.000Z')});

    try 
    {
      let allEvents = await RNCalendarEvents.saveEvent('JRMR save', {
        startDate: this.state.date_to_save.startday,
        endDate: this.state.date_to_save.endday,
      }) 
      console.log(allEvents);
      Alert.alert("Succes save", JSON.stringify(allEvents));
    } catch (error) {
      Alert.alert("Failed to save events");
    }
  };
  
 
  onChange = date => {
    
    this.setState({ date });
    console.log("change date " + this.state.date);
  }

  render() 
  {
    return (
      <View>
        
          

      </View>
    );
  }
}

/* <Calendar
          onChange={this.onChange}
          value={this.state.date}



          <Button
          title={"Get Calendar Status"}
          onPress={this._getCalendarStatus}
        />

        <Button
          title={"Request Calendar Permission"}
          onPress={this._requestCalendarPermissions}
        />

        <Button
          title={"Get Available Calendars"}
          onPress={this._getCalendars}
        />

        <Button
          title={"SAVE date"}
          onPress={this._SaveEvents }
        />

        <Button title={"Fetch All Events"} onPress={this._fetchAllEvents} />
        />*/