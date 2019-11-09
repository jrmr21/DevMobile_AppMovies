import React from 'react';
import Navigation from './Navigation/Navigation';
import Initialization from './Components/Initialization';
import {Provider} from 'react-redux'
import {store} from './Store/configureStore'
import { connect } from 'react-redux'

import Calendar_coponent from './Components/Calendar_coponent'

class App extends React.Component{
  
  test = new Calendar_coponent;

  componentDidMount()
  {
    this.test._requestCalendarPermissions();
  }

  render(){

    return (
      <Provider store = {store}>
          <Initialization />
          <Navigation/> 
      </Provider>
      
    );
  } 
}



export default App;


