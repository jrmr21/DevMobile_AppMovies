
import RNCalendarEvents from "react-native-calendar-events";
//  source : https://github.com/chakrihacker/react-native-calendar-events-demo/blob/master/Components/Calendar.js


import React, { Component } from "react";
import { Alert } from "react-native";



export default class Calendar_Component extends Component 
{

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
  //Alert.alert("Calendar Permission", requestCalendarPermission, ["OK"]);
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

/*_fetchAllEvents = async () => {
try {
  let allEvents = await RNCalendarEvents.fetchAllEvents(
    
    "2019-20-19T19:26:00.000Z"
  );
  console.log(allEvents);
  Alert.alert("Available Events", JSON.stringify(allEvents));
} catch (error) {
  Alert.alert("Failed to get events");
}
};*/


_SaveEvents = async (name_event , date_to_save) => {

try 
{
  let allEvents = await RNCalendarEvents.saveEvent(name_event, {
    startDate: date_to_save + "T08:00:00.000Z",
    endDate: date_to_save + "T08:10:00.000Z",
  }) 
    //console.log(allEvents);"2019-11-19T19:26:00.000Z",
  Alert.alert("Succes save \n" + name_event + " the " + date_to_save);
} catch (error) {
  Alert.alert("Failed to save events..");
}
};


}