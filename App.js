import React from 'react';
import Navigation from './Navigation/Navigation';
import Initialization from './Components/Initialization';
import {Provider} from 'react-redux'
import {store} from './Store/configureStore'
import { connect } from 'react-redux'

class App extends React.Component{
  

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


